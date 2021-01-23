import React, { lazy, Component } from 'react';
import CheckLoginAdmin from '../../functions/checkLoginAdmin';
import './Edit_User.css'
import Select from 'react-select';
import { UsersGet, Admin } from "../../../API";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet'
const Nav = lazy(() => import("../../inc/AdminNav/AdminNav"));
var token = "";

class Edit_User extends Component {
    state = {
        selectedUser: null,
        users: [],
        SubscribeExpire: null,
        Permissions: null
    }

    toastViewer = msg => {
        toast.dark(String(msg), {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    componentDidMount() {
        <CheckLoginAdmin page="/ad-edit-user" />
        if (localStorage.getItem("admin_token")) {
            token = encodeURIComponent(localStorage.getItem("admin_token"));
        } else if (sessionStorage.getItem("admin_token")) {
            token = encodeURIComponent(sessionStorage.getItem("admin_token"));
        }
        if (token !== "null") {
            axios.get(UsersGet + "?token=" + token).then((response) => {
                this.setState({ users: response.data });
            });
        }
    }

    Subscription_Renewal = () => {
        const user = this.state.selectedUser;
        const SE = this.state.SubscribeExpire;
        if (user !== null & SE !== null) {
            let data = new FormData();
            data.append('token', decodeURIComponent(token));
            data.append('tl', SE);
            data.append('uid', user);
            axios.post(Admin, data).then((response) => {
                if (response.data.msg === "done") {
                    this.toastViewer("Changed Successfully 😁")
                } else {
                    this.toastViewer("Failed :: Check Your Data 🥱")
                }
            });
        } else {
            this.toastViewer("Set Options First To Be Changed 🥴")
        }
    }

    Change_UserPermissions = () => {
        const user = this.state.selectedUser;
        const UP = this.state.Permissions;
        if (user !== null & UP !== null) {
            let data = new FormData();
            data.append('token', decodeURIComponent(token));
            data.append('role', UP);
            data.append('uid', user);
            axios.post(Admin, data).then((response) => {
                if (response.data.msg === "done") {
                    this.toastViewer("Changed Successfully 😁")
                } else {
                    this.toastViewer("Failed :: Check Your Data 🥱")
                }
            });
        } else {
            this.toastViewer("Set Options First To Be Changed 🥴")
        }
    }

    render() {
        return (
            <>
                <CheckLoginAdmin page="/ad-edit-user" />
                <Nav />
                <Helmet><title>Edit User</title></Helmet>
                <div className="container">
                    <div className="select-user-to-edit defu-row">
                        <p className="row noselect title">Select User</p>
                        <div className="row body">
                            <Select
                                onChange={(e) => { this.setState({ selectedUser: e.value }) }}
                                value={this.value}
                                options={this.state.users}
                                className="col-12 username-selector noselect"
                            />
                        </div>
                        <hr />
                        <div className="row body">
                            <div className="col-lg-6">
                                <p className="noselect titles">Subscription Renewal</p>
                                <div className="col-lg-12 btn-group marg_top" role="group">
                                    <button id="expDate-select" type="button" className="btn btn-secondary dropdown-toggle noselect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Subscribe Expire</button>
                                    <div className="dropdown-menu" aria-labelledby="expDate-select">
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "1h" }) }}>1 Hour</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "12h" }) }}>12 Hour</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "1d" }) }}>1 Day</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "1w" }) }}>1 Week</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "2w" }) }}>2 Week</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "1m" }) }}>1 Month</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "3m" }) }}>3 Month</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "1y" }) }}>1 Year</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "3y" }) }}>3 Years</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "5y" }) }}>5 Year</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ SubscribeExpire: "lifetime" }) }}>Lifetime</button>
                                    </div>
                                </div>
                                <div className="col-lg-12 btn-group marg_top" role="group">
                                    <button type="button" className="btn btn-success" onClick={this.Subscription_Renewal}>Change</button>
                                </div>
                            </div>
                            <hr className="col-8 d-sm-none" />
                            <div className="col-lg-6">
                                <p className="noselect titles">Change User Permissions</p>
                                <div className="col-lg-12 btn-group marg_top" role="group">
                                    <button id="expDate-select" type="button" className="btn btn-secondary dropdown-toggle noselect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Permissions</button>
                                    <div className="dropdown-menu" aria-labelledby="expDate-select">
                                        <button className="dropdown-item" onClick={() => { this.setState({ Permissions: 2 }) }}>Admin</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ Permissions: 3 }) }}>User</button>
                                        <button className="dropdown-item" onClick={() => { this.setState({ Permissions: 4 }) }}>None</button>
                                    </div>
                                </div>
                                <div className="col-lg-12 btn-group marg_top" role="group">
                                    <button type="button" className="btn btn-success" onClick={this.Change_UserPermissions}>Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default Edit_User;