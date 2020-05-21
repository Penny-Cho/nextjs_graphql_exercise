import { useState } from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import {
    useGetTopicsByCategory,
    useGetUser,
    useCreateTopic
} from "@/apollo/actions";
import { useRouter } from "next/router";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import Replier from "../../../components/shared/Replier";

const useInitialData = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { data: dataT } = useGetTopicsByCategory({
        variables: { category: slug }
    });
    // url에 적힌 slug를 기반으로 가져오기 때문에 query문에서 slug를 추출해서 options에 slug를 넣어줌
    const { data: dataU } = useGetUser();
    const topicsByCategory = (dataT && dataT.topicsByCategory) || [];
    const user = (dataU && dataU.user) || null;

    return { topicsByCategory, user, slug, router };
};

const Topics = () => {
    const [isReplierOpen, setReplierOpen] = useState(false);
    const { topicsByCategory, user, slug, router } = useInitialData();
    const [createTopic] = useCreateTopic();

    const handleCreateTopic = (topicData, done) => {
        topicData.forumCategory = slug;
        createTopic({ variables: topicData }).then(() => {
            setReplierOpen(false);
            done();
        });
    };

    const goToTopic = slug =>
        router.push("/forum/topics/[slug]", `/forum/topics/${slug}`);

    return (
        <BaseLayout>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>주제를 골라보세요</h1>
                        {/* {user && (
                            <button
                                onClick={() => setReplierOpen(true)}
                                className="btn btn-primary"
                            >
                                주제 만들기
                            </button>
                        )} 로그인했을때만 버튼 보이게 하게*/}
                        <button
                            onClick={() => setReplierOpen(true)}
                            disabled={!user}
                            className="btn btn-primary"
                        >
                            주제 만들기
                        </button>
                        {!user && (
                            <div className="mt-2" style={{ fontSize: "11px" }}>
                                로그인을 해야 토픽을 생성할 수 있어요
                            </div>
                        )}
                        {/* 유저가 아닐 땐 disabled 처리하기 */}
                    </div>
                </div>
            </section>
            <section className="fj-topic-list">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Topic</th>
                            <th scope="col">Category</th>
                            <th scope="col">Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topicsByCategory.map(topic => (
                            <tr
                                key={topic._id}
                                onClick={() => goToTopic(topic.slug)}
                            >
                                <th>{topic.title}</th>
                                <td className="category">
                                    {topic.forumCategory.title}
                                </td>
                                <td>{topic.user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <Replier
                isOpen={isReplierOpen}
                onSubmit={handleCreateTopic}
                closeBtn={() => (
                    <a
                        className="btn py-2 ttu gray-10"
                        onClick={() => setReplierOpen(false)}
                    >
                        Cancel
                    </a>
                )}
            />
            {/* 원래 받아올 컴포넌트에서 필요한 부분을 추출해서 사용하는 방법. 원래 파일인 replier.js에는 대신 CloseBtn이라는 component를 새로 만들어서 안에다 심어줘서 상호참조하게 만든다. */}
        </BaseLayout>
    );
};

export default withApollo(Topics, { getDataFromTree });
