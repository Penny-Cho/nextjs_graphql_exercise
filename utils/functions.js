import moment from "moment";

export const formatDate = date => {
    return moment.unix(date / 1000).format("YYYY/MM/DD");
};
