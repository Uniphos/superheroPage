import React from "react";
import navBar from "./navBar";

const PageLayout = ({ children }) => {
    return (
        <div className="page-layout">
        <navBar />
        {children}
        </div>
    );
}

export default PageLayout;