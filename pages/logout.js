import withApollo from "@/hoc/withApollo";
import { useSignOut } from "../apollo/actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BaseLayout from "../layouts/BaseLayout";

const Logout = ({ apollo }) => {
    const [signOut] = useSignOut();
    const router = useRouter();

    useEffect(() => {
        signOut().then(() => {
            apollo.resetStore().then(() => router.push("/login"));
        });
    }, []);

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Logout</h1>
                        <p>Signing out...</p>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default withApollo(Logout);
