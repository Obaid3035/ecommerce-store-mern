import React from 'react';
import { customerSideBarItems } from "./routes";
import Sidebar from "../../../Component/Sidebar/Sidebar";
import Header from "../../Pages/Header/Header";

const NavBar = () => {
    return <Sidebar role={"customer"} sideBarItems={customerSideBarItems} />
};
export default NavBar;
