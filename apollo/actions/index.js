import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
    GET_PORTFOLIOS,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    CREATE_PORTFOLIO,
    SIGN_IN,
    GET_USER,
    SIGN_OUT,
    GET_USER_PORTFOLIOS,
    GET_PORTFOLIO,
    FORUM_CATEGORIES,
    TOPICS_BY_CATEGORY
} from "../queries";

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetPortfolio = options => useQuery(GET_PORTFOLIO, options);
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () =>
    useMutation(DELETE_PORTFOLIO, {
        update(cache, { data: { deletePortfolio } }) {
            const { userPortfolios } = cache.readQuery({
                query: GET_USER_PORTFOLIOS
            });
            const newPortfolios = userPortfolios.filter(
                p => p._id !== deletePortfolio
            );
            cache.writeQuery({
                query: GET_USER_PORTFOLIOS,
                data: { userPortfolios: newPortfolios }
            });
        }
    });
export const useCreatePortfolio = () =>
    useMutation(CREATE_PORTFOLIO, {
        update(cache, { data: { createPortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] }
            }); //화면이 로드되고 새로운 항목을 만들었을 때, 이때 만들어진 항목은 캐싱되지 않고 다른 페이지로 넘어갔다가 다시 돌아왔을 때 없어져있음. 이를 방지하기 위해서, 항목을 새로 만들었을 때 아예 캐시를 업데이트하게 해서 다른 페이지갔다가 다시 와도 변동이 없게 처리하는 것임
        }
    });

// Auth Actions Start ------

export const useSignIn = () =>
    useMutation(SIGN_IN, {
        update(cache, { data: { signIn: signedInUser } }) {
            cache.writeQuery({
                query: GET_USER,
                data: { user: signedInUser }
            });
        }
    });

export const useSignOut = () => useMutation(SIGN_OUT);

export const useLazyGetUser = () => useLazyQuery(GET_USER);

// useGetUser는 withAuth 때문에 만든거
export const useGetUser = () => useQuery(GET_USER);
// Auth Actions End ------

//Forum Actions Start ----------

export const useGetForumCategories = () => useQuery(FORUM_CATEGORIES);
export const useGetTopicsByCategory = options =>
    useQuery(TOPICS_BY_CATEGORY, options);

//Forum Actions End ----------

//query문 중 options가 들어가는 건 search 기준점 (예: id 같은거)를 넣기 위해서임.
