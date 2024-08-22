import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Layout() {
    return(
        <div className="layout">
            <Navbar/>
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
        );
}

export default Layout