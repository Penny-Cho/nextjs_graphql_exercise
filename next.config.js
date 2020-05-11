const path = require("path");

module.exports = {
    //import할 때 상대경로를 @을 넣어서 절대경로로 바꿔주는 코드
    webpack: config => {
        config.resolve.alias["@"] = path.resolve(__dirname);

        return config;
    }
};
