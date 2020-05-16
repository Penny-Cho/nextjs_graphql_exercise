import {
    GET_PORTFOLIOS,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    CREATE_PORTFOLIO
} from "@/apollo/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () =>
    useMutation(DELETE_PORTFOLIO, {
        update(cache, { data: { deletePortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            const newPortfolios = portfolios.filter(
                p => p._id !== deletePortfolio
            );
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: newPortfolios }
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
