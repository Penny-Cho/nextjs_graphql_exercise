const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {
    portfolioQueries,
    portfolioMutations,
    userMutations,
    userQueries
} = require("./resolvers");

const { portfolioTypes, userTypes } = require("./types");
const { buildAuthContext } = require("./context");
const Portfolio = require("./models/Portfolio");
const User = require("./models/User");

exports.createApolloServer = () => {
    // Construct a schema using Graphql schema language
    const typeDefs = gql`
        ${portfolioTypes}
        ${userTypes}

        type Query {
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
            userPortfolios: [Portfolio]

            user: User
        }

        type Mutation {
            createPortfolio(input: PortfolioInput): Portfolio
            updatePortfolio(id: ID, input: PortfolioInput): Portfolio
            deletePortfolio(id: ID): ID

            signUp(input: SignUpInput): String
            signIn(input: SignInInput): User
            signOut: Boolean
        }
    `;

    // The root provides a resolver for each API endpoint
    const resolvers = {
        Query: {
            ...portfolioQueries,
            ...userQueries
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations
        }
    };

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            ...buildAuthContext(req),
            models: {
                //req.user를 붙여줌으로써, user가 존재하지 않는 상황에서는 포트폴리오를 만들 수 없게 조치
                Portfolio: new Portfolio(mongoose.model("Portfolio"), req.user),
                User: new User(mongoose.model("User"))
            }
        })
    });

    return apolloServer;
};
