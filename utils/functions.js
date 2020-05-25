import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export const formatDate = date => {
    return moment.unix(date / 1000).format("YYYY/MM/DD");
};

export const fromNow = date => moment.unix(date / 1000).fromNow();

export const shortify = (text, maxLength = 50) => {
    if (!text) {
        return "";
    }
    if (text.length <= maxLength) {
        return text;
    }

    return text.substr(0, maxLength) + "...";
};
