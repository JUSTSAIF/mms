import { lazy } from 'react';
import CheckLogin from "../functions/checkLogin";
import './main.css';

const Nav = lazy(() => import("../inc/MemberNav/MemberNav"));

var users = () => {
    return(
    <>
        <CheckLogin page="profile"/>
        <Nav />
        <h1>users</h1>
    </>
    )
}

export default users;
