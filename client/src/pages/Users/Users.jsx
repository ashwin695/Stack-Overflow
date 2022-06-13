import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import UsersList from "./UsersList";
import "../../App.css"
import { useLocation } from "react-router-dom";

function Users() {

    const location = useLocation()

    return(
        <div className="home-container-1">
            <LeftSidebar />
            <div className="home-container-2" style={{marginTop: 30}}>
                <h1 style={{fontWeight: 400}}>Users</h1>
                <UsersList />
            </div>
        </div>
    )
}

export default Users