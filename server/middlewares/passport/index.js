const GraphqlStrategy = require("./strategies");

const User = require("../../database/models/user");

exports.init = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });

    passport.use(
        "graphql",
        new GraphqlStrategy(({ email, password }, done) => {
            // console.log("calling verify function of strategy");
            //1. Find user in DB and if user exists, verify user password
            // If user is verified, call "done"
            User.findOne({ email }, (error, user) => {
                if (error) {
                    return done(error);
                }
                if (!user) {
                    return done(null, false);
                }
                //Todo: Check user password if its matching password from options
                // return done(null, user);
                user.validatePassword(password, (error, isMatching) => {
                    if (error) {
                        return done(error);
                    }
                    if (!isMatching) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            });
        })
    );
};

// passport.use 안에 적은 "graphql"은 사용할 passport의 이름임. 만약 여러 종류의 Passport가 있다면 다른 이름들을 써서 더 늘릴 수 있음. 예를 들어 passport-facebook같은 거, 만들면 됨.
