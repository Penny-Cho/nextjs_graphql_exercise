import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import PortfolioForm from "@/components/forms/PortfolioForm";
import BaseLayout from "@/layouts/BaseLayout";
import { useRouter } from "next/router";
import { useGetPortfolio, useUpdatePortfolio } from "@/apollo/actions";
import { toast } from "react-toastify";

const PortfolioEdit = () => {
    const router = useRouter();
    const [updatePortfolio, { error }] = useUpdatePortfolio();
    const { id } = router.query;
    const { data } = useGetPortfolio({ variables: { id } });
    const errorMessage = error => {
        return (
            (error.graphQLErrors && error.graphQLErrors[0].message) ||
            "아이고 뭔가 잘못됐어요"
        );
    };

    const handlePortfolioUpdate = async data => {
        await updatePortfolio({
            variables: { id, ...data }
        });
        toast.success("포트폴리오가 업데이트되었어요!", {
            autoClose: 2000,
            position: "bottom-center"
        });
    };

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Edit Portfolio </h1>
                        {data && (
                            <PortfolioForm
                                initialData={data.portfolio}
                                onSubmit={handlePortfolioUpdate}
                            />
                        )}
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

export default withApollo(withAuth(PortfolioEdit, ["admin", "instructor"]));
// export default withApollo(PortfolioNew);
