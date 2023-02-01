import React from "react";
import Header from "../../header/Header";
import "./style.scss";
const PrivateLayout = ({ children }) => {
    return (
        <div>
            <div className="header_wrap">
                <Header />
            </div>
            {children}
        </div>
    );
};

export default PrivateLayout;
