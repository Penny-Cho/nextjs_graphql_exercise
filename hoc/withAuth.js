import { useGetUser } from "../apollo/actions";
import Redirect from "@/components/shared/Redirect";
import SpinningLoader from "../components/shared/Loader";

//특정 레벨만 들어갈 수 있는 페이지 만들기

export default (WrappedComponent, role, options = { ssr: false }) => {
    function WithAuth(props) {
        const { data: { user } = {}, loading, error } = useGetUser({
            fetchPoliy: "network-only"
        });

        if (!loading && (!user || error) && typeof window !== "undefined") {
            return (
                <Redirect
                    to="/login"
                    query={{ message: "NOT_AUTHENTICATED" }}
                />
            );
        }

        //check for role
        if (user) {
            if (role && !role.includes(user.role)) {
                return (
                    <Redirect
                        to="/login"
                        query={{ message: "NOT_AUTHORIZED" }}
                    />
                );
            }
            return <WrappedComponent {...props} />;
        }

        return (
            <div className="spinner-container">
                <SpinningLoader variant="large" />
            </div>
        );
    }
    //서버사이드에서 redirect할 수 있게 만들기 만든 후 개별 페이지에서 ssr 관련 내용을 넣어줘야 함. dashboard 마지막 줄 role array 뒤쪽 참조
    if (options.ssr) {
        const serverRedirect = (res, to) => {
            res.redirect(to);
            res.end();
            return {};
        };

        WithAuth.getInitialProps = async context => {
            const { req, res } = context;
            if (req) {
                const { user } = req;

                if (!user) {
                    serverRedirect(res, "/login?message=NOT_AUTHENTICATED");
                }

                if (role && !role.includes(user.role)) {
                    serverRedirect(res, "/login?message=NOT_AUTHORIZED");
                }
            }

            const pageProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(context));
            return { ...pageProps };
        };
    }

    return WithAuth;
};
