exports.portfolioQueries = {
    portfolio: (root, { id }, ctx) => {
        return ctx.models.Portfolio.getById(id);
    },
    portfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAll();
    },
    userPortfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAllByUser();
    }
};

exports.portfolioMutations = {
    createPortfolio: async (root, { input }, ctx) => {
        const createdPortfolio = await ctx.models.Portfolio.create(input);
        return createdPortfolio;
    },
    updatePortfolio: async (root, { id, input }, ctx) => {
        const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
            id,
            input
        );
        return updatedPortfolio;
    },
    deletePortfolio: async (root, { id }, ctx) => {
        const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
        return deletedPortfolio._id;
    }
};

exports.userQueries = {
    user: (root, args, ctx) => {
        return ctx.models.User.getAuthUser(ctx);
    }
};

exports.userMutations = {
    signUp: async (root, { input }, ctx) => {
        const registeredUser = await ctx.models.User.signUp(input);
        return registeredUser._id;
    },
    signIn: (root, { input }, ctx) => {
        return ctx.models.User.signIn(input, ctx);
    },
    signOut: (root, args, ctx) => {
        return ctx.models.User.signOut(ctx);
    }
};

exports.forumQueries = {
    forumCategories: (root, args, ctx) => {
        return ctx.models.ForumCategory.getAll();
    },
    topicsByCategory: async (root, { category }, ctx) => {
        const forumCategory = await ctx.models.ForumCategory.getBySlug(
            category
        );
        if (!forumCategory) {
            return null;
        }
        return ctx.models.Topic.getAllByCategory(forumCategory._id);
    },
    topicBySlug: (root, { slug }, ctx) => {
        return ctx.models.Topic.getBySlug(slug);
    },
    postsByTopic: async (root, { slug, ...pagination }, ctx) => {
        const topic = await ctx.models.Topic.getBySlug(slug);
        return ctx.models.Post.getAllByTopic({ topic, ...pagination });
    }
};

// 개별 항목 내 args에 들어가는 내용은 graphql 내에서 기준점으로 삼는 것이 무엇인지를 넣게 됨. 예를 들어 user에 따른 결과를 출력하려면 user가 안에 들어가고, input값에 따르면 input을 넣음.
//모든 실행함수는 mongoose 용어

// topicsByCategory같은 경우, category를 args 자리에 destructuring하여 넣게 되면 찾는 기준점이 category의 id가 됨. 이 기준을 slug로 하고 싶어서 우선 적으로 slug를 기반으로 찾는 코드를 적기 위해, getBySlug을 models에서 생성해 줌. graphql에서 catgory: "" 안에는 slug를 넣으면 찾아짐

exports.forumMutations = {
    createTopic: async (root, { input }, ctx) => {
        const category = await ctx.models.ForumCategory.getBySlug(
            input.forumCategory
        );
        input.forumCategory = category._id;
        const topic = await ctx.models.Topic.create(input);
        return topic;
    },
    createPost: async (root, { input }, ctx) => {
        const post = await ctx.models.Post.create(input);
        return post;
    }
};
