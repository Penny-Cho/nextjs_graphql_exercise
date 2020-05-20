import { useGetUser } from "../apollo/actions";
import Redirect from "@/components/shared/Redirect";

//특정 레벨만 들어갈 수 있는 페이지 만들기

export default (WrappedComponent, role) => props => {
    const { data: { user } = {}, loading, error } = useGetUser({
        fetchPoliy: "network-only"
    });

    if (!loading && (!user || error) && typeof window !== "undefined") {
        return <Redirect to="/login" />;
    }

    //check for role
    if (user) {
        if (role && !role.includes(user.role)) {
            return <Redirect to="/login" />;
        }
        return <WrappedComponent {...props} />;
    }

    return <p>"Authenticating..."</p>;
};
