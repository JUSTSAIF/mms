import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import LoginFormPic from "../../../imgs/login/admin-logo-login4.png";
import { Login_check, tokensGenerator } from "../../../API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./admin-login.css";
import CheckLoginAdmin from '../../functions/checkLoginAdmin';

class AdminLogin extends Component {
    state = {
        username:"",
        password:"",
        token:"",
        autoLogin:false
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

    loginA = (e) => {
        e.preventDefault();
        /// check user name and password 
        const headers = { 'Content-Type': 'application/json' }
        let data = new FormData();
        data.append("username", this.state.username);
        data.append("password", this.state.password);
        axios.post(Login_check, data, {
            headers: headers
        })
            .then((response) => {
                var Res = response.data.msg.res;
                if(Res === undefined){Res = response.data.msg}
                const role = response.data.msg.roleID;
                if (Res === "login success" & (role === 1 | role === 2)) {
                    this.toastViewer(Res);
                    setTimeout(() => {
                        axios.post(tokensGenerator, data, {
                            headers: headers
                        }).then((response) => {
                            const msg = response.data.msg;
                            if (msg === "token created successfully") {
                                this.setState({token:response.data.token})
                                if(this.state.autoLogin === true){
                                    localStorage.setItem('admin_token', response.data.token);
                                }else{
                                    sessionStorage.setItem('admin_token', response.data.token);
                                }
                                window.location.reload(false);
                            }
                        })
                    }, 3000)
                } else {
                    if(Res !== "login success"){
                        this.toastViewer(Res);
                    }else{
                        this.toastViewer("u are not admin 🤕");
                    }
                }
            }).catch(error => {
                console.log(error)
            })
    }
    
    render(){
        return (
            <>
                <CheckLoginAdmin page="/ad-home" />
                <div className="container">
                    <div className="card">
                        <div className="row">
                            <div className="col-6 d-none d-md-block">
                                <img src={LoginFormPic} width="300px" alt="" style={{ paddingRight: "20px" }} />
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <h3 className="login-title">Admin Login</h3>
                                <form onSubmit={this.loginA}>
                                    <div className="in-form-div">
                                        <input className="input" type="text" name="email" placeholder="Username" onChange={(e)=>{this.setState({username:e.target.value})}} />
                                        <span className="focus-in"></span>
                                        <span className="input-f-logo"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                    </div>
                                    <div className="in-form-div">
                                        <input className="input" type="password" name="pass" placeholder="Password" onChange={(e) => { this.setState({password:e.target.value}) }} />
                                        <span className="focus-in"></span>
                                        <span className="input-f-logo"><i className="fa fa-lock" aria-hidden="true"></i></span>
                                    </div>
                                    <input className="form-check-input" type="checkbox" onChange={(e)=>{this.setState({autoLogin:e.target.checked})}} id="saveLogin"/>
                                    <label className="form-check-label" htmlFor="saveLogin">Auto Login</label>
                                    <div className="login-form-btn">
                                        <button className="login-f-btn" >Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );    
    }
}

export default AdminLogin;
