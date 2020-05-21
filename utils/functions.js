import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export const formatDate = date => {
    return moment.unix(date / 1000).format("YYYY/MM/DD");
};

export const fromNow = date => moment.unix(date / 1000).fromNow();
