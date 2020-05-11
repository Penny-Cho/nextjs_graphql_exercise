import Axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import { useState } from "react";

const graphDeletePortfolios = id => {
    const query = `
    mutation DeletePortfolio {
        deletePortfolio(id: "${id}")
    }
    `;
    return Axios.post("http://localhost:3000/graphql", { query })
        .then(({ data: graph }) => graph.data)
        .then(data => data.deletePortfolio); //여기에 Mutation typedef에서 만든 거를 넣어줌
};

const graphUpdatePortfolios = id => {
    const query = `
    mutation UpdatePortfolio {
        updatePortfolio(id: "${id}", input: {
          title: "updated job"
          company: "update company"
          companyWebsite: "naver.com"
          location: "update Jersey"
          jobTitle: "update job title"
          description: "update description"
          startDate: "12/12/2011"
          endDate: "12/12/2019"
        }) {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate,
        }
      }`;
    return Axios.post("http://localhost:3000/graphql", { query })
        .then(({ data: graph }) => graph.data)
        .then(data => data.updatePortfolio); //여기에 Mutation typedef에서 만든 거를 넣어줌
};

const graphCreatePortfolios = () => {
    const query = `
    mutation CreatePortfolio {
        createPortfolio(input: {
          title: "new job"
          company: "new company"
          companyWebsite: "naver.com"
          location: "new Jersey"
          jobTitle: "new job title"
          description: "new description"
          startDate: "12/12/2011"
          endDate: "12/12/2019"
        }) {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate,
        }
      }`;
    return Axios.post("http://localhost:3000/graphql", { query })
        .then(({ data: graph }) => graph.data)
        .then(data => data.createPortfolio); //여기에 Mutation typedef에서 만든 거를 넣어줌
};

const fetchPortfolios = () => {
    const query = `
    query Portfolios {
        portfolios {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate,
        }
    }`;
    return Axios.post("http://localhost:3000/graphql", { query })
        .then(({ data: graph }) => graph.data)
        .then(data => data.portfolios);
};

const Portfolios = ({ data }) => {
    const [portfolios, setPortfolios] = useState(data.portfolios);

    const createPortfolio = async () => {
        const newPortfolio = await graphCreatePortfolios();
        const newPortfolios = [...portfolios, newPortfolio];
        setPortfolios(newPortfolios);
    };

    const updatePortfolio = async id => {
        const updatedPortfolio = await graphUpdatePortfolios(id);
        const index = portfolios.findIndex(p => p._id === id);
        const newPortfolios = portfolios.slice();
        newPortfolios[index] = updatedPortfolio;
        setPortfolios(newPortfolios);
    };

    const deletePortfolio = async id => {
        const deletedId = await graphDeletePortfolios(id);
        const index = portfolios.findIndex(p => p._id === deletedId);
        const newPortfolios = portfolios.slice();
        newPortfolios.splice(index, 1);
        setPortfolios(newPortfolios);
    };

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
                                onClick={() => updatePortfolio(portfolio._id)}
                            >
                                update
                            </button>
                            <button
                                className="btn btn-danger mt-2 ml-2 p-1"
                                onClick={() => deletePortfolio(portfolio._id)}
                            >
                                delete
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <a href="" className="btn btn-main bg-blue ttu">
                See More Portfolios
            </a>
        </>
    );
};

Portfolios.getInitialProps = async () => {
    const portfolios = await fetchPortfolios();
    return { data: { portfolios } };
};

export default Portfolios;
