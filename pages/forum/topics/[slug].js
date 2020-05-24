import { useState, useRef } from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import {
    useGetTopicBySlug,
    useGetUser,
    useGetPostsByTopic,
    useCreatePost
} from "../../../apollo/actions";
import { useRouter } from "next/router";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import PostItem from "../../../components/forum/PostItem";
import Replier from "../../../components/shared/Replier";
import { toast } from "react-toastify";
import AppPagination from "@/components/shared/Pagination";

const useInitialData = (slug, pagination) => {
    const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
    const { data: dataP, fetchMore } = useGetPostsByTopic({
        variables: { slug, ...pagination }
        // pollInterval: 20000 //다른유저가 동시 접속했을 때 업데이트를 실시간으로 해주는 기능 너무 빈번하면 안좋으니까 이런건 socket으로 해결할 것
    });
    const { data: dataU } = useGetUser();
    const topic = (dataT && dataT.topicBySlug) || {};
    const postData = (dataP && dataP.postsByTopic) || { posts: [], count: 0 };
    const user = (dataU && dataU.user) || null;

    return { topic, ...postData, user, fetchMore };
};

//fetchMore 함수는 뭔가 기존에 주어진거 외에 더 받아오고 싶은게 있을 때 넣어줌, 여기서는 새롭게 데이터를 받았을 때 자동으로 화면 갱신을 해주기 위해 사용

const PostPage = () => {
    const router = useRouter();
    const { slug, pageNum = 1, pageSize = 5 } = router.query;
    const [pagination, setPagination] = useState({
        pageNum: parseInt(pageNum, 10),
        pageSize: parseInt(pageSize, 10)
    });

    const { topic, posts, ...rest } = useInitialData(slug, pagination);

    return (
        <BaseLayout>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>{topic.title}</h1>
                    </div>
                </div>
            </section>
            <Posts
                posts={posts}
                topic={topic}
                {...rest}
                {...pagination}
                onPageChange={(pageNum, pageSize) => {
                    router.push(
                        "/forum/topics/[slug]",
                        `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
                        { shallow: true }
                    ); //shallow false시 url을 통해 데이터를 패칭해오는데 그건 원하지 않아서 true처리
                    setPagination({ pageNum, pageSize });
                }}
            />
        </BaseLayout>
    );
};

const Posts = ({ posts, topic, user, fetchMore, ...pagination }) => {
    const pageEnd = useRef();
    const [createPost, { error }] = useCreatePost();
    const [isReplierOpen, setReplierOpen] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const { pageSize, count, pageNum } = pagination;

    const handleCreatePost = async (reply, resetReplier) => {
        if (replyTo) {
            reply.parent = replyTo._id;
        }
        reply.topic = topic._id;
        setReplierOpen(false); //버튼에 로더같은거 달아주는게 좋을거같음
        toast.success("답글이 잘 등록되었어요!", { autoClose: 3000 });
        await createPost({ variables: reply });
        let lastPage = Math.ceil(count / pageSize);
        if (count === 0) {
            lastPage = 1;
        }
        lastPage === pageNum &&
            (await fetchMore({
                variables: { pageSize, pageNum: lastPage },
                updateQuery: (previousResults, { fetchMoreResult }) => {
                    return Object.assign({}, previousResults, {
                        postsByTopic: { ...fetchMoreResult.postsByTopic }
                    });
                }
            }));
        resetReplier();
        cleanup();
    };

    const cleanup = () => {
        scrollToBottom();
    };

    const scrollToBottom = () =>
        pageEnd.current.scrollIntoView({ behavior: "smooth" });

    return (
        <section className="mb-4">
            <div className="fj-post-list">
                {topic._id && pagination.pageNum === 1 && (
                    <PostItem post={topic} className="topic-post-lead" />
                )}
                {posts.map(post => (
                    <div key={post._id} className="row">
                        <div className="col-md-9">
                            <PostItem
                                post={post}
                                canCreate={user !== null}
                                onReply={reply => {
                                    setReplyTo(reply);
                                    setReplierOpen(true);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="row mt-4 mx-0">
                <div className="col-md-9">
                    <div className="posts-bottom">
                        {user && (
                            <div className="pt-2 pb-2">
                                <button
                                    onClick={() => {
                                        setReplyTo(null);
                                        setReplierOpen(true);
                                    }}
                                    className="btn btn-lg btn-outline-primary"
                                >
                                    새로운 글쓰기
                                </button>
                            </div>
                        )}
                        <div className="pagination-container ml-auto">
                            <AppPagination
                                onChange={pagination.onPageChange}
                                {...pagination} // 여기에는 count={count}, pageNum={pageNum}...등이 들어가 있기 때문에 묶어서 destruct할 수 있었는데, onChange만 이름이 onPageChange이라서 구조분해 안하고 냅둔 것임
                                // 없애고 싶으면 onChange를 onPageChange로 바꾸면 됨
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div ref={pageEnd}></div>
            <Replier
                isOpen={isReplierOpen}
                replyTo={(replyTo && replyTo.user.username) || topic.title}
                hasTitle={false}
                onSubmit={handleCreatePost}
                closeBtn={() => (
                    <a
                        className="btn py-2 ttu gray-10"
                        onClick={() => setReplierOpen(false)}
                    >
                        Cancel
                    </a>
                )}
            />
        </section>
    );
};

export default withApollo(PostPage, { getDataFromTree });
