import React, { lazy, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { createUser } from "../../../API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./add-user.css";import { Helmet } from 'react-helmet'
import CheckLoginAdmin from '../../functions/checkLoginAdmin';
const Nav = lazy(() => import("../../inc/AdminNav/AdminNav"));
const headers = { 'Content-Type': 'application/json' }
var token = "";

class AddUser extends Component {
    state = {
        randPassV: false,
        checkData: false,
        SubscribeExpire: "",
        Role: "",
        Pwd: "",
        Usr: "",
        Name: ""
    }

    componentDidMount(){
        if (localStorage.getItem("admin_token")) {
            token = localStorage.getItem("admin_token");
        } else if (sessionStorage.getItem("admin_token")) {
            token = sessionStorage.getItem("admin_token");
        }
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

    RandPass = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.setState({ Pwd: result });
    }
    CreateAccount = () => {
        let data = new FormData();
        data.append("sToken", token);
        data.append("role", this.state.Role);
        data.append("name", this.state.Name);
        data.append("username", this.state.Usr);
        data.append("password", this.state.Pwd);
        data.append("expire-date", this.state.SubscribeExpire);
        axios.post(createUser, data, { headers: headers }).then((response) => {
            var res = response.data.msg;
            if (res === "User Created successfully") {
                this.toastViewer("User Created successfully 😋");
            } else {
                this.toastViewer(res + " 😤");
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <>
                <CheckLoginAdmin page="/add-user" />
                <Nav />
                <Helmet><title>Add New User</title></Helmet>
                <div className="container add_user">
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label>Username</label>
                            <input type="text" onChange={(e) => { this.setState({ Usr: e.target.value }) }} className="form-control" aria-describedby="usernameHelp" placeholder="Enter Username" />
                            <small id="usernameHelp" className="form-text text-muted">Usernames can only  use this characters ( A–Z, 0–9, _ )</small>
                        </div>
                        <div className="col-md-6">
                            <label className="name-c-input">Client Name</label>
                            <input type="text" className="form-control" onChange={(e) => { this.setState({ Name: e.target.value }) }} placeholder="Enter Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <button className="RandPass" onClick={() => { this.RandPass() }}>Rand Pass</button>
                        <input type="text" className="form-control" placeholder="Enter Password" onChange={(e) => { this.setState({ Pwd: e.target.value }) }} value={this.state.Pwd} />
                    </div>
                    <hr />
                    <div className="row">
                        <div className="btn-group col-md-6" role="group">
                            <button id="role-select" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Role</button>
                            <div className="dropdown-menu" aria-labelledby="role-select">
                                <button className="dropdown-item" onClick={() => { this.setState({ Role: "an" }) }}>Admin</button>
                                <button className="dropdown-item" onClick={() => { this.setState({ Role: "ur" }) }}>User</button>
                                <button className="dropdown-item" onClick={() => { this.setState({ Role: "nl" }) }}>None</button>
                            </div>
                        </div>
                        <div className="btn-group col-md-6 name-c-input" role="group">
                            <button id="expDate-select" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Subscribe Expire</button>
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
                    </div>
                    <div className="row account_reg_done">
                        <div className="col-md-12">
                            <center>
                                <i className="last_button">
                                    {this.state.Usr !== "" & this.state.Name !== "" & this.state.Pwd !== "" & this.state.Role !== "" & this.state.SubscribeExpire !== "" ?
                                        <span className="text noselect" data-toggle="modal" data-target="#Create-Account-vif">C R E A T E</span> : 
                                        <span className="text noselect" onClick={() => this.toastViewer("Check Data Fields !")}>C R E A T E</span>
                                    }
                                </i>
                            </center>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                {/* =============================== Create Account Modal =============================== */}
                <div className="modal fade" id="Create-Account-vif" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><span>Notice*</span> : Check User Data Before Save it in Database Because You Will Can't Edit Some Values  When the account is delivered to the customer .</p>
                                <hr />
                                <h5>Username : <span className="badge">{this.state.Usr}</span> </h5>
                                <h5>Password : <span className="badge">{this.state.Pwd}</span> </h5>
                                <h5>Name : <span className="badge">{this.state.Name}</span> </h5>
                                <h5>Role : <span className="badge">{this.state.Role}</span> </h5>
                                <h5>Subscribe Expire : <span className="badge">{this.state.SubscribeExpire}</span> </h5>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" data-dismiss="modal" onClick={()=>this.CreateAccount()} className="btn btn-success">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AddUser;
