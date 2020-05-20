import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export default withApollo(
    ({ initialState, headers }) => {
        return new ApolloClient({
            request: operation => {
                operation.setContext({
                    fetchOptions: {
                        credentials: "include"
                    },
                    headers
                });
            },
            uri: "http://localhost:3001/graphql",
            cache: new InMemoryCache().restore(initialState || {})
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);

//아폴로를 통해 서버 사이드 렌더링을 하기 위해서 HOC 즉, High Order Component를 만들어서 사용할 것임.
// 이를 위한 패키지로 next-with-apollo라는 것을 설치를 함.
// 목적은 SSR을 하는 것 + apolloProvider가 필요한 페이지에만 아폴로 프로바이더를 쓰고 필요없는 페이지는 없애는 것

//8번 줄의 request 에서 setContext를 하는 이뉴는 getDataFromTree를 했을 때, withAuth.js 에서 정의했던 getUser와 안맞아서 user를 undefined로(쿠키를 저장안했음) 보내기 때문에 그것을 고치기 위해서 넣은 것.
