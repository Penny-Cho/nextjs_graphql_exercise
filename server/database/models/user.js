const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatar: String,
    email: {
        type: String,
        required: "Email is required!",
        lowercase: true,
        index: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    name: {
        type: String,
        minlength: [2, "Minimum name length is 2 characters!"]
    },
    username: {
        type: String,
        required: true,
        minlength: [2, "Minimum username length is 2 characters!"]
    },
    password: {
        type: String,
        minlength: [6, "Minimum pw length is 6 characters!"],
        maxlength: [32, "Minimum pw length is 32 characters!"],
        required: true
    },
    role: {
        enum: ["guest", "admin", "instructor"],
        type: String,
        required: true,
        default: "guest"
    },
    info: String,
    createdAt: { type: Date, default: Date.now }
});

//이거 쓸 때 function 옛날식으로 유지할 것  DB 작업 수행하기 직전에 수행할 내용을 적음 여기서는 hashing 실시
//param next는 mongo에서 쓰는 파람으로 다음으로 넘어가게 해주는 것
userSchema.pre("save", function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.validatePassword = function(candidatePassword, done) {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, function(
        error,
        isSuccess
    ) {
        if (error) {
            return done(error);
        }
        return done(null, isSuccess);
    });
};

module.exports = mongoose.model("User", userSchema);
