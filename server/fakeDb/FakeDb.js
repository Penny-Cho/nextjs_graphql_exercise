const { portfolios, users, forumCategories, topics, posts } = require("./data");

const Portfolio = require("../database/models/portfolio");
const User = require("../database/models/user");
const ForumCategory = require("../database/models/forumCategory");
const Topic = require("../database/models/topic");
const Post = require("../database/models/post");

class FakeDb {
    // 디비에 남은 기존 자료들 다 날리는 코드
    async clean() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await ForumCategory.deleteMany({});
        await Topic.deleteMany({});
        await Post.deleteMany({});
    }
    // data.js 에 담긴 내용들 넣어주기
    async addData() {
        await User.create(users);
        await Portfolio.create(portfolios);
        await ForumCategory.create(forumCategories);
        await Topic.create(topics);
        await Post.create(posts);
    }
    async populate() {
        await this.clean();
        await this.addData();
    }
}

module.exports = new FakeDb();
