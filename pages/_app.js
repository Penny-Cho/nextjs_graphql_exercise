import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;

// 이 페이지가 모든 페이지의 entry point가 됨. 어떤 페이지를 가든 이 파일이 먼저 실행됨.
