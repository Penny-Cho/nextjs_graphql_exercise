import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Footer from "../components/shared/Footer";

const BaseLayout = ({ children, page = "" }) => {
    const isHomepage = () => page === "Home";

    return (
        <div className="portfolio-app">
            <Navbar />
            {isHomepage() && <Hero />}
            <div className="container">{children}</div>
            {isHomepage() && <Footer />}
        </div>
    );
};

export default BaseLayout;
