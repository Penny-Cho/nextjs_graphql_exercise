import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.scss";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Footer from "../components/shared/Footer";

const MyApp = ({ Component, pageProps }) => {
    const isHomepage = Component.name === "Home";

    return (
        <div className="portfolio-app">
            <Navbar />
            {/* {pageProps.appData} */}
            {isHomepage && <Hero />}
            <div className="container">
                <Component {...pageProps} />
            </div>
            {isHomepage && <Footer />}
        </div>
    );
};

// MyApp.getInitialProps = async context => {
//     console.log("GET INITIAL PROPS _APP");
//     const initialProps =
//         App.getInitialProps && (await App.getInitialProps(context));

//     return {
//         pageProps: {
//             appData: "Hello _App Component",
//             ...initialProps.pageProps
//         }
//     };
// };

export default MyApp;

// 이 페이지가 모든 페이지의 entry point가 됨. 어떤 페이지를 가든 이 파일이 먼저 실행됨.
