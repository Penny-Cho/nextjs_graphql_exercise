const passport = require("passport");

//options = email, password
const authenticateUser = options => {
    // console.log(`Authenticating user: ${email}`);
    console.log("Calling authenticateUser");

    const done = () => {
        //here we will get user if user is authenticated
        //if we will get user, here we can save session to DB
        console.log("Calling done of authenticateUser");
    };
    const authFn = passport.authenticate("graphql", options, done);
    authFn();

    return true;
};

exports.buildAuthContext = () => {
    const auth = {
        authenticate: options => authenticateUser(options)
    };

    return auth;
};
