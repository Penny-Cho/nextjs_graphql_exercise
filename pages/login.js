import LoginForm from "../components/forms/LoginForm";
import { useSignIn } from "@/apollo/actions";
import withApollo from "@/hoc/withApollo";
import Redirect from "../components/shared/Redirect";
import BaseLayout from "../layouts/BaseLayout";
import { useRouter } from "next/router";
import messages from "@/variables/messages";
import { useEffect, useRef } from "react";

const Login = () => {
    let disposeId = useRef(null);
    const [signIn, { data, loading, error }] = useSignIn();
    const router = useRouter();
    const { message } = router.query;
    const disposeMessage = () => {
        router.replace("/login", "/login", { shallow: true });
    };

    useEffect(() => {
        if (message) {
            disposeId.current = setTimeout(() => {
                disposeMessage();
            }, 3000);
        }

        return () => {
            clearTimeout(disposeId.current); // 로그인 창에서 다른 창으로 바로 전환했을 때에도 useeffect가 작용되는 것을 막기 위해 clearTimeout을 실시해서 날려줌.
        };
    }, [message]);

    const errorMessage = error => {
        return (
            (error.graphQLErrors && error.graphQLErrors[0].message) ||
            "아이고 뭔가 잘못됐어요"
        );
    };

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Login</h1>
                        {message && (
                            <div
                                className={`alert alert-${messages[message].status}`}
                            >
                                {messages[message].value}
                            </div>
                        )}
                        <LoginForm
                            loading={loading}
                            onSubmit={signInData =>
                                signIn({ variables: signInData })
                            }
                        />
                        {data && data.signIn && <Redirect to="/" />}
                        {error && (
                            <div className="alert alert-danger">
                                {errorMessage(error)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default withApollo(Login);
