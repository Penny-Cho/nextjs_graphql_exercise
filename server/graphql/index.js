const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {
    portfolioQueries,
    portfolioMutations,
    userMutations,
    userQueries,
    forumQueries,
    forumMutations
} = require("./resolvers");
const { portfolioTypes, userTypes, forumTypes } = require("./types");
const { buildAuthContext } = require("./context");

const Portfolio = require("./models/Portfolio");
const User = require("./models/User");
const ForumCategory = require("./models/ForumCategory");
const Topic = require("./models/Topic");
const Post = require("./models/Post");

exports.createApolloServer = () => {
    // Construct a schema using Graphql schema language
    // 대소문자 헤깔리지말자! type에서 정한 이름 그대로 들고 오는 것임 쿼리 제목은 camel로, type은 대문자로!
    const typeDefs = gql`
        ${portfolioTypes}
        ${userTypes}
        ${forumTypes}

        type Query {
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
            userPortfolios: [Portfolio]

            user: User

            forumCategories: [ForumCategory]

            topicsByCategory(category: String): [Topic]
            topicBySlug(slug: String): Topic

            postsByTopic(slug: String): [Post]
        }

        type Mutation {
            createPortfolio(input: PortfolioInput): Portfolio
            updatePortfolio(id: ID, input: PortfolioInput): Portfolio
            deletePortfolio(id: ID): ID

            createTopic(input: TopicInput): Topic

            createPost(input: PostInput): Post

            signUp(input: SignUpInput): String
            signIn(input: SignInInput): User
            signOut: Boolean
        }
    `;

    // The root provides a resolver for each API endpoint
    const resolvers = {
        Query: {
            ...portfolioQueries,
            ...userQueries,
            ...forumQueries
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations,
            ...forumMutations
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
                User: new User(mongoose.model("User")),
                ForumCategory: new ForumCategory(
                    mongoose.model("ForumCategory")
                ),
                Topic: new Topic(mongoose.model("Topic"), req.user),
                Post: new Post(mongoose.model("Post"), req.user)
            }
        })
    });

    return apolloServer;
};
