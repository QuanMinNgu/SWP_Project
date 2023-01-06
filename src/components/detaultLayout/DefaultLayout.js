import React from "react";
import "./style.scss";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
const DefaultLayout = ({ children }) => {
    return (
        <div>
            <div className="header_wrap">
                <Header />
            </div>
            {children}
            <div className="footer_wrap">
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
