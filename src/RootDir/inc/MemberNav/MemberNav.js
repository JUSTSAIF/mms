import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink,Link } from 'react-router-dom';
import Logout from '../../functions/logout'
import { Nav, Navbar} from 'react-bootstrap';
import './mn.css'
const nav = () => {
    return (
        <div className="container-flud" >
            <div className="main-desk d-none d-sm-block">
                <nav className="navbar navbar-expand-sm  bg-dark">
                    <NavLink className="navbar-brand" to={'/'}>KEN 剣</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <NavLink className="nav-link" exact to="/">Home<span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/settings">Settings</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="justify-content-end logout_button" id="navbarNav">
                        <button className="btn btn-secondary" onClick={Logout.bind(this)}><i className="fa fa-sign-out"></i> <span>Logout</span></button>
                    </div>
                </nav>
            </div>
            <div className="main-m-nav d-block d-sm-none">
                <Navbar collapseOnSelect className="m-nav" expand="lg">
                    <Navbar.Toggle className="tog-btn"/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto d-block">
                            <Nav.Item><Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="2" as={Link} to="/profile">Profile</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="2" as={Link} to="/settings">Settings</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link eventKey="2" onClick={Logout.bind(this)}>Logout</Nav.Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
        
    )
}


export default nav;