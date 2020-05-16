const GraphqlStrategy = require("./strategies");

exports.init = passport => {
    passport.use(
        "graphql",
        new GraphqlStrategy((options, done) => {
            console.log("calling verify function of strategy");
            //1. Find user in DB and if user exists, verify user password
            // If user is verified, call "done"

            if (true) {
                //first param of done is reserved for "error", second one for "user"
                done();
            }
        })
    );
};

// passport.use 안에 적은 "graphql"은 사용할 passport의 이름임. 만약 여러 종류의 Passport가 있다면 다른 이름들을 써서 더 늘릴 수 있음. 예를 들어 passport-facebook같은 거, 만들면 됨.
