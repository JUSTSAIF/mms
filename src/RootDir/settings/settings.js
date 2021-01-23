import React, { Component, lazy } from 'react';
import CheckLogin from "../functions/checkLogin";
// import classNames from 'classnames';
// import Loader from '../inc/loader/loader';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {
    indexGET,
    Pic,
    Contact,
    Username,
    Name,
    Reset_Password
} from "../../API";
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Helmet } from 'react-helmet'
const Nav = lazy(() => import("../inc/MemberNav/MemberNav"));
const Footer = lazy(() => import("../inc/footer/footer"));
const headers = { 'Content-Type': 'application/json' }

class Settings extends Component {
    state = {
        newContactType: null,
        CreateTime: null,
        ExpireTime: null,
        IP: null,
        LastActive: null,
        Name: null,
        Username: null,
        profileHover: false,
        profilePicArr: null,
        profileImgRef: null,
        isProfilePicChanged: false,
        GetProfilePic: null,
        fb: null,
        ig: null,
        email: null,
        NewFB: null,
        NewIG: null,
        NewEmail: null,
        NewName: null,
        NewPassword:null,
        OldPassword:null,
        err_reset_pass:null,
        loading:true
    }
    componentDidMount() {
        axios.get(indexGET + "?token=" + encodeURIComponent(localStorage.getItem('token')), { headers: headers }).then((response) => {
            try {
                this.setState({
                    ExpireTime: response.data.ExpireTime,
                    LastActive: response.data.LastActive,
                    Username: response.data.Username,
                    Name: response.data.Name,
                    IP: response.data.IP,
                    GetProfilePic: response.data.ProfilePic,
                    CreateTime: response.data.CreateTime,
                    NewUsername: response.data.Username,
                    NewFB: response.data.Contact.facebook,
                    NewIG: response.data.Contact.instagram,
                    NewEmail: response.data.Contact.email,
                    fb: response.data.Contact.facebook,
                    ig: response.data.Contact.instagram,
                    email: response.data.Contact.email,
                    NewName: response.data.Name,
                    loading:false
                });    
            } catch (error) {console.log("Update State Err !!");}
        })
    }

    profilePicSelectedHandler = event => {
        var prifilepicArr = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(prifilepicArr);
        this.setState({ profilePicArr: prifilepicArr, isProfilePicChanged: true });
        reader.onloadend = function (e) {
            this.setState({
                profileImgRef: [reader.result]
            })
        }.bind(this);
    }
    
    profilePicSaveHandler = () => {
        let data = new FormData();
        data.append("token", localStorage.getItem('token'));
        data.append("base64", this.state.profileImgRef);
        this.setState({loading:true});
        axios.post(Pic, data, {
            headers: headers
        }).then((response) => {
            var msg = response.data.msg;
            if (msg === "Done") {
                msg = "Profile Picture Changed Success 😀";
            } else {
                msg = "Changing Profile Picture Failed 😪";
            }
            toast.dark(msg, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            this.setState({loading:false});
        });
    }

    toastViewer = msg => {
        toast.dark(msg, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    saveChanges = () => {
        var msg = "";
        let data = new FormData();
        data.append("token", localStorage.getItem('token'));
        if (this.state.NewUsername !== this.state.Username) {
            data.append("newUSR", this.state.NewUsername);
            axios.post(Username, data, { headers: headers }).then((response) => {
                if (response.data.msg === "done") {
                    msg = "Username Changed Success 😀";
                } else {
                    msg = "Username Change Failed 😪";
                }
                this.toastViewer(msg);
            });
        }
        if (this.state.NewName !== this.state.Name) {
            data.append("newName", this.state.NewName);
            axios.post(Name, data, { headers: headers }).then((response) => {
                if (response.data.msg === "done") {
                    msg = "Name Changed Success 😀";
                } else {
                    msg = "Name Change Failed 😪";
                }
                this.toastViewer(msg);
            });
        }
        if (this.state.NewIG !== this.state.ig) {
            data.append("type", "ig");
            data.append("data", this.state.NewIG);
            axios.post(Contact, data, { headers: headers }).then((response) => {
                msg = "";
                if (response.data.msg === "done") {
                    msg = "Instagram User Changed Success 😀";
                } else {
                    msg = "Instagram User Change Failed 😪";
                }
                this.toastViewer(msg);
            });
        }
        if (this.state.NewFB !== this.state.fb) {
            data.append("type", "fb");
            data.append("data", this.state.NewFB);
            axios.post(Contact, data, { headers: headers }).then((response) => {
                if (response.data.msg === "done") {
                    msg = "Facebook User Changed Success 😀";
                } else {
                    msg = "Facebook User Change Failed 😪";
                }
                this.toastViewer(msg);
            });
        }
        if (this.state.NewEmail !== this.state.email) {
            data.append("type", "email");
            data.append("data", this.state.NewEmail);
            axios.post(Contact, data, { headers: headers }).then((response) => {
                if (response.data.msg === "done") {
                    msg = "E-mail Changed Success 😀";
                } else {
                    msg = "E-mail Change Failed 😪";
                }
                this.toastViewer(msg);
            });
        }
        this.componentDidMount();
    }

    Reset_Password_Handler = () => {
        let data = new FormData();
        data.append("token", localStorage.getItem('token'));
        data.append("oldPass", this.state.OldPassword);
        data.append("newPass", this.state.NewPassword);
        axios.post(Reset_Password, data, { headers: headers }).then((response) => {
            var msg = response.data.msg;
            if(msg === "done"){
                this.toastViewer("Password Changed Success 😀");
                this.setState({err_reset_pass:null});
            }else{
                this.setState({err_reset_pass:msg});
            }
        });
        this.componentDidMount();
    }

    render() {
        return (
            <div className="setting">
                <CheckLogin page="settings" />
                <Nav />
                <Helmet><title>Profile Settings</title></Helmet>
                {/* =========================================================================================== */}
                <div className="container">
                    <div className="card" >
                        <div className="profile-card__img">
                            <h5 data-toggle="modal" data-target="#change-profile-photo" className="show-img-edit noselect">Change</h5>
                            {this.state.GetProfilePic !== null ?
                                <img src={this.state.GetProfilePic} onMouseOver={() => { this.setState({ profileHover: true }) }} onMouseOut={() => { this.setState({ profileHover: false }) }} alt="" />
                                :
                                <img src="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif" alt="" />
                            }
                        </div>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-username" >Username</label>
                                        <input type="text" id="input-username" className="form-control" onChange={(e) => { this.setState({ NewUsername: e.target.value }) }} placeholder="Username" defaultValue={this.state.Username} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-email">Name</label>
                                        <input type="email" id="input-email" className="form-control" onChange={(e) => { this.setState({ NewName: e.target.value }) }} placeholder="Name" defaultValue={this.state.Name} />
                                    </div>
                                </div>
                            </div>
                            <hr className="set-hr" />
                            <label className="form-control-label" htmlFor="input-first-name">contact</label>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">@</span></div>
                                        <input type="text" className="form-control" placeholder="ex : someone@me.com" onChange={(e) => { this.setState({ NewEmail: e.target.value }) }} defaultValue={this.state.email !== null | this.state.email !== "" ? this.state.email : null} />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><i className="fa fa-instagram"></i></span></div>
                                        <input type="text" className="form-control" placeholder="Username ex : qq_iq" onChange={(e) => { this.setState({ NewIG: e.target.value }) }} defaultValue={this.state.ig !== null | this.state.ig !== "" ? this.state.ig : null} />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><i className="fa fa-facebook"></i></span></div>
                                        <input type="text" className="form-control" placeholder="Username ex : qq_iq" onChange={(e) => { this.setState({ NewFB: e.target.value }) }} defaultValue={this.state.fb !== null | this.state.fb !== "" ? this.state.fb : null} />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={() => { this.saveChanges() }}>Save Changes</button>
                            <hr className="set-hr" />
                            <label data-toggle="modal" data-target="#rest-password" className="rest-password-btn form-control-label">Reset Password</label>
                        </div>
                    </div>
                </div>
                {/* ================== Reset Password Modal ================== */}
                <div className="modal fade" id="rest-password" tabIndex="-1" role="dialog" aria-labelledby="rest-passwordLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="rest-passwordLabel">Reset Password</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">New Password:</label>
                                        <input type="text" className="form-control" onChange={(e) => { this.setState({ NewPassword: e.target.value }) }} placeholder="New Password" defaultValue="" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label"><span className="red-point">*</span>Password :</label>
                                        <input type="text" className="form-control" placeholder="Old Password" onChange={(e) => { this.setState({ OldPassword: e.target.value }) }} defaultValue="" required />
                                    </div>
                                </form>
                                {this.state.err_reset_pass !== null ? 
                                <p className="err_paragraph">{this.state.err_reset_pass}</p>
                                : null}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.Reset_Password_Handler}> Save </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================== Change Profile Photo Modal ================== */}
                <div className="modal fade" id="change-profile-photo" tabIndex="-1" role="dialog" aria-labelledby="change-profile-photoLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="change-profile-photoLabel">Change Profile Picture</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile" onChange={this.profilePicSelectedHandler} />
                                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                </form>
                                <br />
                                {this.state.isProfilePicChanged ? <img className="center show-profile-pic" src={this.state.profileImgRef} alt="" /> : null}
                                {/* <p>{this.state.profileImgRef}</p> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.profilePicSaveHandler}> Save </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                {/* =========================================================================================== */}
                <Footer />
            </div>
        )
    };
}

export default Settings;
