import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import {
    useGetPortfolios,
    useCreatePortfolio,
    useDeletePortfolio,
    useUpdatePortfolio
} from "../../apollo/actions";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

const Portfolios = () => {
    const { data } = useGetPortfolios();
    const [updatePortfolio] = useUpdatePortfolio();
    const [deletePortfolio] = useDeletePortfolio();
    const [createPortfolio] = useCreatePortfolio();

    const portfolios = (data && data.portfolios) || [];

    return (
        <>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Portfolios</h1>
                    </div>
                </div>
            </section>
            <section className="pb-5">
                <button onClick={createPortfolio} className="btn btn-secondary">
                    Add New
                </button>
            </section>
            <section className="pb-5">
                <div className="row">
                    {portfolios.map(portfolio => (
                        <div className="col-md-4 pb-3" key={portfolio._id}>
                            <Link
                                href="/portfolios/[id]"
                                as={`/portfolios/${portfolio._id}`}
                            >
                                <a className="card-link">
                                    <PortfolioCard portfolio={portfolio} />
                                </a>
                            </Link>
                            <button
                                className="btn btn-warning mt-2 p-1"
                                onClick={() =>
                                    updatePortfolio({
                                        variables: { id: portfolio._id }
                                    })
                                }
                            >
                                update
                            </button>
                            <button
                                className="btn btn-danger mt-2 ml-2 p-1"
                                onClick={() =>
                                    deletePortfolio({
                                        variables: { id: portfolio._id }
                                    })
                                }
                            >
                                delete
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default withApollo(Portfolios, { getDataFromTree });

//getDataFromTree는 리액트에서 ssr을 지원하는 기능
