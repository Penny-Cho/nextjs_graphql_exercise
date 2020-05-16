import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
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
