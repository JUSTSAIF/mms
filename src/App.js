import React, { Component, Suspense } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from './RootDir/history'
import Home from './RootDir/home/home'
import Login from './RootDir/login/login'
import Profile from './RootDir/profile/profile'
import Settings from './RootDir/settings/settings'
import Users from './RootDir/users/users'
import AdminLogin from './RootDir/admin/admin-login/admin-login'
import AdminHome from './RootDir/admin/home/home'
import AddUser from './RootDir/admin/add-user/add-user'
import WebDes from './RootDir/admin/website-design/website-design'
import EditUser from './RootDir/admin/Edit_User/Edit_User'
import ApiInto from './RootDir/admin/API/api_info'
import axios from 'axios'
import { IP, LastActive, GeneralNull } from "./API";
import './Css/App.css'
const headers = { 'Content-Type': 'application/json' };
var token = "";
if (localStorage.getItem("token")) {
  token = localStorage.getItem("admin_token");
} else if (localStorage.getItem("admin_token")) {
  token = localStorage.getItem("admin_token");
} else if (sessionStorage.getItem("admin_token")) {
  token = sessionStorage.getItem("admin_token");
}

class App extends Component {
  state = {
    ip: null,
    bg_desk: "",
    bg_mobile: "",
    design_img_dir: ""
  };

  updateDimensions() {
    var isMobile = false;
    if (window.innerWidth <= 767) { isMobile = true }
    document.body.style.backgroundImage = isMobile ? "url("+this.state.design_img_dir+"background_images/mobile/"+this.state.bg_mobile+".png)" : "url("+this.state.design_img_dir+"background_images/desktop/"+this.state.bg_desk+".jpg)";
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    if (token !== "") {
      let data = new FormData();
      data.append("token", localStorage.getItem('token'));
      axios.get("https://api.ipify.org?format=json").then(response => { axios.post(IP + "?ip=" + response.data.ip, data, { headers: headers }); });
      axios.post(LastActive, data, { headers: headers });
    }
    
    axios.get(GeneralNull,{ headers: headers }).then((response) => {
      this.setState({
        bg_desk: response.data['design_settings']['desktop_bg'],
        bg_mobile: response.data['design_settings']['mobile_bg'],
        design_img_dir: response.data['design_settings']['design_img_dir']
      })
    });

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    const initialState = {};
    this.setState(initialState);
  }

  render() {
    this.updateDimensions()
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Suspense fallback="ff">
              <Route exact path="/">                <Home />            </Route>
              <Route exact path="/login">           <Login />           </Route>
              <Route exact path="/profile">         <Profile />         </Route>
              <Route exact path="/settings">        <Settings />        </Route>
              <Route exact path="/users">           <Users />           </Route>
              <Route exact path="/admin-login">     <AdminLogin />      </Route>
              <Route exact path="/ad-home">         <AdminHome />       </Route>
              <Route exact path="/add-user">        <AddUser />         </Route>
              <Route exact path="/ad-edit-user">    <EditUser />        </Route>
              <Route exact path="/ad-web-design">   <WebDes />          </Route>
              <Route exact path="/api-intro">       <ApiInto />          </Route>
            </Suspense>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;