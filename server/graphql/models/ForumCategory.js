class ForumCategory {
    constructor(model) {
        //this.Model === ForumCategory
        this.Model = model;
    }

    getAll() {
        return this.Model.find();
    }

    getBySlug(slug) {
        return this.Model.findOne({ slug }).populate("user");
    }
}

module.exports = ForumCategory;
