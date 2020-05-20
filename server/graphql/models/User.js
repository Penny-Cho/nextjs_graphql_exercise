class User {
    constructor(model) {
        this.Model = model;
    }

    getAuthUser(ctx) {
        if (ctx.isAuthenticated()) {
            return ctx.getUser();
        }

        return null;
    }

    async signUp(signUpData) {
        if (signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error(
                "비밀번호와 비밀번호 확인 시 입력한 내용은 반드시 같아야 합니다."
            );
        }
        try {
            return await this.Model.create(signUpData);
        } catch (e) {
            if (e.code && e.code === 11000) {
                throw new Error(
                    "이메일이 이미 존재합니다. 다른 이메일을 입력하시거나 로그인을 해주세요."
                );
            }

            throw e;
        }
    }

    async signIn(signInData, ctx) {
        try {
            const user = await ctx.authenticate(signInData);
            console.log(user);
            return user;
        } catch (error) {
            return error;
        }
    }

    signOut(ctx) {
        try {
            // console.log("BEFORE LOGOUT------");
            // console.log("is authenticated", ctx.isAuthenticated());
            // console.log("user", ctx.getUser());
            ctx.logout();
            // console.log("AFTER LOGOUT------");
            // console.log("is authenticated", ctx.isAuthenticated());
            // console.log("user", ctx.getUser());
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = User;
