import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "./login.css";
import axios from 'axios'
import LoginFormPic from "../../imgs/login/img-01.png";
import { Login_check, tokensGenerator } from "../../API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckLogin from "../functions/checkLogin";
import { Helmet } from 'react-helmet'
const Login = () =>{
    var username    = "";
    var password    = "";
    var checkLogin  = "";
    var token       = "";
    
    const login = (e) => {
        e.preventDefault();
        /// check user name and password 
        const headers = {'Content-Type': 'application/json'}
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);
        axios.post(Login_check, data, {
            headers: headers
        })
        .then((response) => {
            const Res = response.data.msg.res;
            checkLogin = Res;
            toast.dark(checkLogin, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            setTimeout(() => {
                if(Res === "login success"){
                    axios.post(tokensGenerator, data, {
                        headers: headers
                    })
                    .then((response) => {
                        const msg = response.data.msg;
                        if(msg === "token created successfully"){
                            token = response.data.token;
                            console.log(token)
                            localStorage.setItem('token', token);
                            window.location.reload(false);
                        }
                    })
                }
            }, 3000)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <>
        <Helmet><title>Member Login</title></Helmet>
        <CheckLogin page=""/>
            <div className="container">
                <div className="card">
                    <div className="row">
                        <div className="col-6 d-none d-md-block">
                            <img src={LoginFormPic} alt="" />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <h3 className="login-title">Member Login</h3>
                            <form onSubmit={login}>
                                <div className="in-form-div">
                                    <input className="input" type="text" name="email" placeholder="Username"  onChange={(e) => {username =  e.target.value }} />
                                    <span className="focus-in"></span>
                                    <span className="input-f-logo"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                </div>
                                <div className="in-form-div">
                                    <input className="input" type="password" name="pass" placeholder="Password"  onChange={(e) => {password =  e.target.value }}/>
                                    <span className="focus-in"></span>
                                    <span className="input-f-logo"><i className="fa fa-lock" aria-hidden="true"></i></span>
                                </div>
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

export default Login;
