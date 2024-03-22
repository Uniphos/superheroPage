import React from "react";
import NavBar from "./navBar";

const PageLayout = ({ children }) => {
    return (
        <div className="page-layout">
        <NavBar />
        {children}
        </div>
    );
}

export default PageLayout;