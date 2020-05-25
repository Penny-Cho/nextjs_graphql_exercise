const uniqueSlug = require("unique-slug");
const moment = require("moment");
const BaseModel = require("./BaseModel");

class Post extends BaseModel {
    //pageSize: 한 페이지에 몇 개의 아이템 넣는지 정함
    async getAllByTopic({ topic, pageNum = 1, pageSize = 5 }) {
        const skips = pageSize * (pageNum - 1);

        const count = await this.Model.countDocuments({ topic });
        const posts = await this.Model.find({ topic })
            .sort("createdAt")
            .skip(skips)
            .limit(pageSize)
            .populate("topic")
            .populate("user")
            .populate({ path: "parent", populate: "user" });

        return { posts, count };
    }

    //sort시 createdAt을 하면 시간 순대로, fullSlug로 하면 대댓글이 parent 바로 아래에 오게 할 수 있음.

    async create(post) {
        if (!this.user) {
            throw new Error("권한이 없습니다. 로그인해주세욤");
        }
        post.user = this.user;

        const createdAt = moment().toISOString();
        const slugPart = uniqueSlug();
        const fullSlugPart = createdAt + ":" + slugPart;

        if (post.parent) {
            const parent = await this.Model.findById(post.parent);
            post.slug = parent.slug + "/" + slugPart;
            post.fullSlug = parent.fullSlug + "/" + fullSlugPart;
        } else {
            post.slug = slugPart;
            post.fullSlug = fullSlugPart;
        }

        const createdPost = await this.Model.create(post);

        return this.Model.findById(createdPost._id)
            .populate("topic")
            .populate("user")
            .populate({ path: "parent", populate: "user" });
    }
}

module.exports = Post;
