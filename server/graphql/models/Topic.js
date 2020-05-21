const slugify = require("slugify");
const uniqueSlug = require("unique-slug");

class Topic {
    constructor(model, user) {
        //this.Model === ForumCategory
        this.Model = model;
        this.user = user;
    }

    getBySlug(slug) {
        return this.Model.findOne({ slug })
            .populate("user")
            .populate("forumCategory");
    }

    getAllByCategory(forumCategory) {
        return this.Model.find({ forumCategory })
            .populate("user")
            .populate("forumCategory");
    }
    // 여기서 param인 forumCatogry는 database model의 forumCategory와 이름을 같게 한 것임.
    //.populate('user')는 몽고디비에서 user 안에 담긴 author 하위의 값인 avatar, username 이런 식으로 못가져오고 아이디만 ref할 수 있기 때문에 populate라는 것을 써서 graphql에서 nesting된 데이터들을 가져올 수 있게 처리함. 일종의 sql join문임.

    async _create(data) {
        const createdTopic = await this.Model.create(data);
        return this.Model.findById(createdTopic._id)
            .populate("user")
            .populate("forumCategory");
    }

    async create(topicData) {
        if (!this.user) {
            throw new Error("작성을 하시려면 자격이 필요합니다.");
        }
        topicData.user = this.user;
        //slug 만들기
        topicData.slug = slugify(topicData.title, {
            replacement: "-",
            remove: undefined,
            lower: true,
            strict: false
        });

        //여기 한글 안됨. 한글로 하면 slug가 empty가 됨. 주의

        let topic;
        try {
            topic = await this._create(topicData);
            return topic;
        } catch (e) {
            if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
                topicData.slug += `-${uniqueSlug()}`;
                const topic = await this._create(topicData);
                return topic;
            }

            return console.error(e);
        }
    }
}

module.exports = Topic;
