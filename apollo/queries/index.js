import { gql } from "apollo-boost";

export const GET_PORTFOLIO = gql`
    query Portfolio($id: ID) {
        portfolio(id: $id) {
            _id
            daysOfExperience @client
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

//서버에서 안가져오고 클라이언트에서 처리하는 field에는 @client를 붙여주면 됨 이러면 400 bad request가 뜨는데, 이걸 apollo client에서 핸들링을 좀 해줘야 함. hoc withApollo에서 resolvers로 처리

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

export const GET_USER_PORTFOLIOS = gql`
    query UserPortfolios {
        userPortfolios {
            _id
            title
            jobTitle
            startDate
            endDate
        }
    }
`;

export const CREATE_PORTFOLIO = gql`
    mutation CreatePortfolio(
        $title: String
        $company: String
        $companyWebsite: String
        $location: String
        $jobTitle: String
        $description: String
        $startDate: String
        $endDate: String
    ) {
        createPortfolio(
            input: {
                title: $title
                company: $company
                companyWebsite: $companyWebsite
                location: $location
                jobTitle: $jobTitle
                description: $description
                startDate: $startDate
                endDate: $endDate
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
    mutation UpdatePortfolio(
        $id: ID
        $title: String
        $company: String
        $companyWebsite: String
        $location: String
        $jobTitle: String
        $description: String
        $startDate: String
        $endDate: String
    ) {
        updatePortfolio(
            id: $id
            input: {
                title: $title
                company: $company
                companyWebsite: $companyWebsite
                location: $location
                jobTitle: $jobTitle
                description: $description
                startDate: $startDate
                endDate: $endDate
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

//AUTH QUERIES STARTS ==================================

export const SIGN_UP = gql`
    mutation SignUp(
        $avatar: String
        $username: String!
        $email: String!
        $password: String!
        $passwordConfirmation: String!
    ) {
        signUp(
            input: {
                avatar: $avatar
                username: $username
                email: $email
                password: $password
                passwordConfirmation: $passwordConfirmation
            }
        )
    }
`;

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
            _id
            username
            role
            avatar
        }
    }
`;

export const SIGN_OUT = gql`
    mutation SignOut {
        signOut
    }
`;

export const GET_USER = gql`
    query User {
        user {
            _id
            username
            role
        }
    }
`;

//AUTH QUERIES END ==================================

//FORUM QUERIES START ==================================

export const FORUM_CATEGORIES = gql`
    query ForumCategories {
        forumCategories {
            slug
            title
            subTitle
        }
    }
`;

export const TOPICS_BY_CATEGORY = gql`
    query TopicsByCategory($category: String) {
        topicsByCategory(category: $category) {
            _id
            slug
            title
            content
            user {
                username
                avatar
            }
            forumCategory {
                _id
                title
                slug
            }
        }
    }
`;

//FORUM QUERIES END ==================================
