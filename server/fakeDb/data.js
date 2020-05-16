const mongoose = require("mongoose");
const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const data = {
    users: [
        {
            _id: user1Id,
            avatar:
                "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png",
            email: "test@naver.com",
            name: "Penny Cho",
            username: "penn",
            info: "Hello I am Penny and I am a developer",
            password: "pennypenny",
            role: "admin"
        },
        {
            _id: user2Id,
            avatar:
                "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png",
            email: "test1@naver.com",
            name: "Test User",
            username: "testUser1",
            info: "Hello I am Penny and I am a test",
            password: "testtest"
        }
    ],
    portfolios: [
        {
            title: "Job in Netcentric",
            company: "Netcentric",
            companyWebsite: "www.google.com",
            location: "Spain, Barcelona",
            jobTitle: "Engineer",
            description: "Doing something, programing....",
            startDate: "01/01/2014",
            endDate: "01/01/2016",
            user: user1Id
        },
        {
            title: "Job in Siemens",
            company: "Siemens",
            companyWebsite: "www.google.com",
            location: "Slovakia, Kosice",
            jobTitle: "Software Engineer",
            description:
                "Responsoble for parsing framework for JSON medical data.",
            startDate: "01/01/2011",
            endDate: "01/01/2013",
            user: user1Id
        },
        {
            title: "Work in USA",
            company: "WhoKnows",
            companyWebsite: "www.google.com",
            location: "USA, Montana",
            jobTitle: "Housekeeping",
            description: "So much responsibility....Overloaaaaaad",
            startDate: "01/01/2010",
            endDate: "01/01/2011",
            user: user1Id
        }
    ]
};

module.exports = data;
