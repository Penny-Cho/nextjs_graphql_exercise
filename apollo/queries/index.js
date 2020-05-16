import { gql } from "apollo-boost";

export const GET_PORTFOLIO = gql`
    query Portfolio($id: ID) {
        portfolio(id: $id) {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

export const GET_PORTFOLIOS = gql`
    query Portfolios {
        portfolios {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

export const CREATE_PORTFOLIO = gql`
    mutation CreatePortfolio {
        createPortfolio(
            input: {
                title: "new job"
                company: "new company"
                companyWebsite: "naver.com"
                location: "new Jersey"
                jobTitle: "new job title"
                description: "new description"
                startDate: "2012-03-12T23:59Z"
                endDate: "2019-11-14T23:59Z"
            }
        ) {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

// 몽고에 보낼 기본 date 포맷은 iso 8601에 맞춰서 할 것

export const UPDATE_PORTFOLIO = gql`
    mutation UpdatePortfolio($id: ID) {
        updatePortfolio(
            id: $id
            input: {
                title: "updated job"
                company: "update company"
                companyWebsite: "naver.com"
                location: "update Jersey"
                jobTitle: "update job title"
                description: "update description"
                startDate: "2012-03-12T23:59Z"
                endDate: "2019-11-14T23:59Z"
            }
        ) {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

export const DELETE_PORTFOLIO = gql`
    mutation DeletePortfolio($id: ID) {
        deletePortfolio(id: $id)
    }
`;
