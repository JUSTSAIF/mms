import React, { lazy, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import CheckLoginAdmin from '../../functions/checkLoginAdmin';
import {
    buySectionEdit,
    buySectionHide,
    siteInfoEdit,
    General,
    WebSettingsEdit
} from "../../../API";
import axios from 'axios'
import { Helmet } from 'react-helmet'
import './wd.css'
import classNames from 'classnames'
const Nav = lazy(() => import("../../inc/AdminNav/AdminNav"));
const headers = { 'Content-Type': 'application/json' }
var token = "";
if (localStorage.getItem("admin_token")) {
    token = encodeURIComponent(localStorage.getItem("admin_token"));
} else if (sessionStorage.getItem("admin_token")) {
    token = encodeURIComponent(sessionStorage.getItem("admin_token"));
}

class website_design extends Component {
    state = {
        CardId: 0,
        CC_clicked: 1,
        crossOff_1: false,
        crossOff_2: false,
        crossOff_3: false,
        crossOff_4: false,
        crossOff_5: false,
        crossOff_6: false,
        hide: 0,
        head: "",
        currencyType: "",
        price: "",
        SubscriptionTime: "",
        productInfo_1: "",
        productInfo_2: "",
        productInfo_3: "",
        productInfo_4: "",
        productInfo_5: "",
        productInfo_6: "",
        buttonText: "",
        redirect_link: "",
        buySection: [],
        HappyClients: 0,
        SoldProgram: 0,
        ProgramsCreated: 0,
        UsersAvatarDir: "",
        WebImgDir: "",
        NotFoundAvatar: "",
        desktop_bg: 1,
        mobile_bg: 1,
        org_ng_mob: "",
        org_ng_des: "",
    }
    componentDidMount() {
        <CheckLoginAdmin page="/ad-web-design" />
        if (token !== "null") {
            axios.get(General + "?token=" + token, { headers: headers }).then((response) => {
                this.setState({
                    buySection: response.data['buy_sec'],
                    HappyClients: response.data['count_sec'].hc, SoldProgram: response.data['count_sec'].sp, ProgramsCreated: response.data['count_sec'].pc,
                    UsersAvatarDir: response.data['design_settings']['profile_pic_dir'],
                    WebImgDir: response.data['design_settings']['design_img_dir'],
                    NotFoundAvatar: response.data['design_settings']['not_found_pic'],
                    desktop_bg: response.data['design_settings']['desktop_bg'],
                    mobile_bg: response.data['design_settings']['mobile_bg'],
                    org_ng_des: response.data['design_settings']['design_img_dir'] + "background_images/desktop/" + response.data['design_settings']['desktop_bg'] + ".jpg",
                    org_ng_mob: response.data['design_settings']['design_img_dir'] + "background_images/mobile/" + response.data['design_settings']['mobile_bg'] + ".png"
                });
            });
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
    save_web_settings = () => {
        let data = new FormData();
        data.append("token", decodeURIComponent(token));
        data.append("NFAU", this.state.NotFoundAvatar);
        data.append("UADU", this.state.UsersAvatarDir);
        data.append("WID", this.state.WebImgDir);
        axios.post(WebSettingsEdit, data, { headers: headers }).then((response) => {
            var res = response.data.msg;
            if (res === "changed Successfully") {
                this.toastViewer(res + " ✅");
            } else {
                this.toastViewer(res + " 😤");
            }
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        });
        // 404 Avatar Not Valid
    }

    addCrossOff = (e) => {
        var checked = e.target.checked;
        var value = parseInt(e.target.value);
        if (value === 1) {
            this.setState({ crossOff_1: checked });
        } else if (value === 2) {
            this.setState({ crossOff_2: checked });
        } else if (value === 3) {
            this.setState({ crossOff_3: checked });
        } else if (value === 4) {
            this.setState({ crossOff_4: checked });
        } else if (value === 5) {
            this.setState({ crossOff_5: checked });
        } else if (value === 6) {
            this.setState({ crossOff_6: checked });
        }
    }

    hideCard = () => {
        let data = new FormData();
        data.append("token", decodeURIComponent(token));
        data.append("cid", this.state.CardId);
        data.append("hide", this.state.hide);
        axios.post(buySectionHide, data, { headers: headers }).then((response) => {
            var res = response.data.res;
            if (res === "Card " + this.state.CardId + " Hide Successfully") {
                this.toastViewer(res + " ✅");
            } else {
                this.toastViewer(res + " 😤");
            }
        }).catch(error => {
            console.log(error)
        })
    }

    CountChange = () => {
        let data = new FormData();
        data.append("token", decodeURIComponent(token));
        data.append("sp", this.state.SoldProgram);
        data.append("pc", this.state.ProgramsCreated);
        axios.post(siteInfoEdit, data, { headers: headers }).then((response) => {
            var res = response.data.res;
            if (res === "Changed Successfully") {
                this.toastViewer(res + " ✅");
            } else {
                this.toastViewer(res + " 😤");
            }
        }).catch(error => {
            console.log(error)
        })
    }
    SaveChangesCard = () => {
        let data = new FormData();
        data.append("token", decodeURIComponent(token));
        data.append("cid", this.state.CardId);
        data.append("head", this.state.head);
        data.append("price", this.state.price);
        data.append("SubscriptionTime", this.state.SubscriptionTime);
        data.append("currencyType", this.state.currencyType);
        data.append("productInfo_1", "{" + this.state.productInfo_1.substring(0, 22) + "} 2{" + Number(this.state.crossOff_1) + "}");
        data.append("productInfo_2", "{" + this.state.productInfo_2.substring(0, 22) + "} 2{" + Number(this.state.crossOff_2) + "}");
        data.append("productInfo_3", "{" + this.state.productInfo_3.substring(0, 22) + "} 2{" + Number(this.state.crossOff_3) + "}");
        data.append("productInfo_4", "{" + this.state.productInfo_4.substring(0, 22) + "} 2{" + Number(this.state.crossOff_4) + "}");
        data.append("productInfo_5", "{" + this.state.productInfo_5.substring(0, 22) + "} 2{" + Number(this.state.crossOff_5) + "}");
        data.append("productInfo_6", "{" + this.state.productInfo_6.substring(0, 22) + "} 2{" + Number(this.state.crossOff_6) + "}");
        data.append("buttonText", this.state.buttonText);
        data.append("redirect_link", this.state.redirect_link);
        axios.post(buySectionEdit, data, { headers: headers }).then((response) => {
            var res = response.data.res;
            if (res === "Card " + this.state.CardId + " Changed Successfully") {
                this.toastViewer(res + " ✅");
            } else {
                this.toastViewer(res + " 😤");
            }
        }).catch(error => {
            console.log(error)
        })
    }

    onCardIdChangeHandle = (e) => {
        const productInfo = this.state.buySection[e.target.value].productInfo;
        this.setState({
            head: this.state.buySection[e.target.value]['head'],
            price: this.state.buySection[e.target.value]['price'],
            SubscriptionTime: this.state.buySection[e.target.value]['SubscriptionTime'],
            currencyType: this.state.buySection[e.target.value]['currencyType'],
            buttonText: this.state.buySection[e.target.value]['buttonText'],
            redirect_link: this.state.buySection[e.target.value]['redirect_link'],
            hide: this.state.buySection[e.target.value]['hide'],
            productInfo_1: productInfo['1']['string'],
            productInfo_2: productInfo['2']['string'],
            productInfo_3: productInfo['3']['string'],
            productInfo_4: productInfo['4']['string'],
            productInfo_5: productInfo['5']['string'],
            productInfo_6: productInfo['6']['string'],
        })
    }

    componentWillUnmount() {
        const initialState = {};
        this.setState(initialState);
    }

    show_background_image = ($bg_num, $type) => {
        var $org = this.state.WebImgDir + "background_images/" + $type + "/" + $bg_num;
        if ($type === "mobile") {
            this.setState({ org_ng_mob: $org + ".png" });
        } else {
            this.setState({ org_ng_des: $org + ".jpg" });
        }
    }

    change_backgrounds = () => {
        let data = new FormData();
        data.append("token", decodeURIComponent(token));
        data.append("desktop", this.state.desktop_bg);
        data.append("mobile", this.state.mobile_bg);
        axios.post(WebSettingsEdit, data, { headers: headers }).then((response) => {
            var res = response.data.msg;
            if (res === "changed Successfully") {
                this.toastViewer(res + " ✅");
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
                <CheckLoginAdmin page="/ad-web-design" />
                <Nav />
                <Helmet><title>Website Design</title></Helmet>
                <div className="container">
                    <div className="our_row">
                        <p className="row noselect title">Buy Section</p>
                        <div className="row">
                            <div className="col">
                                <button className="col-md-3 col-xs-12 center btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" >Select Card</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <button className="dropdown-item" value="0" onClick={(e) => { this.setState({ CardId: 1, CC_clicked: 0 }); this.onCardIdChangeHandle(e) }}>1</button>
                                    <button className="dropdown-item" value="1" onClick={(e) => { this.setState({ CardId: 2, CC_clicked: 0 }); this.onCardIdChangeHandle(e) }}>2</button>
                                    <button className="dropdown-item" value="2" onClick={(e) => { this.setState({ CardId: 3, CC_clicked: 0 }); this.onCardIdChangeHandle(e) }}>3</button>
                                </div>
                            </div>
                        </div>
                        {this.state.buySection.length === 3 & this.state.CC_clicked === 0 ?
                            <div className={classNames({ "d-none": this.state.CC_clicked })}>
                                <div className="row">
                                    <section className="col-12 shop-items">
                                        <center>
                                            <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="100">
                                                <div className="box">
                                                    <h3><input className="input_fd form-control" type="text" placeholder="Heading" onChange={(e) => { this.setState({ head: e.target.value }) }} value={this.state.head} maxLength="12" /></h3>
                                                    <h4>
                                                        <div className="col">
                                                            <input className="input_fd input_fd_cy form-control" onChange={(e) => { this.setState({ currencyType: e.target.value }) }} type="text" placeholder="$" maxLength="4" value={this.state.currencyType} />
                                                            <input className="input_fd input_fd_cy form-control" onChange={(e) => { this.setState({ price: e.target.value }) }} type="number" placeholder="5" style={{ marginLeft: "5px" }} maxLength="4" value={this.state.price === "" ? this.state.buySection[this.state.CardId]['price'] : this.state.price} /><span>/</span>
                                                            <input className="input_fd input_fd_cy form-control" onChange={(e) => { this.setState({ SubscriptionTime: e.target.value }) }} type="text" placeholder="Year" maxLength="6" value={this.state.SubscriptionTime === "" ? this.state.buySection[this.state.CardId]['SubscriptionTime'] : this.state.SubscriptionTime} />
                                                        </div>
                                                    </h4>
                                                    <br />
                                                    <ul>
                                                        <div id="MyVpCheckBox" className="noselect"><label htmlFor="chkbxcf1">Cross Off </label><input value="1" onClick={(e) => { this.addCrossOff(e) }} type="checkbox" id="chkbxcf1" /></div>
                                                        <li><input className={classNames("input_fd form-control text-center", { 'cross-off': this.state.crossOff_1 })} type="text" placeholder="1 ) Features ...." maxLength="22" onChange={(e) => { this.setState({ productInfo_1: e.target.value }) }} value={this.state.productInfo_1} /></li>
                                                        <div id="MyVpCheckBox" className="noselect"><label htmlFor="chkbxcf2">Cross Off </label><input value="2" onClick={(e) => { this.addCrossOff(e) }} type="checkbox" id="chkbxcf2" /></div>
                                                        <li><input className={classNames("input_fd form-control text-center", { 'cross-off': this.state.crossOff_2 })} type="text" placeholder="2 ) Features ...." maxLength="22" onChange={(e) => { this.setState({ productInfo_2: e.target.value }) }} value={this.state.productInfo_2} /></li>
                                                        <div id="MyVpCheckBox" className="noselect"><label htmlFor="chkbxcf3">Cross Off </label><input value="3" onClick={(e) => { this.addCrossOff(e) }} type="checkbox" id="chkbxcf3" /></div>
                                                        <li><input className={classNames("input_fd form-control text-center", { 'cross-off': this.state.crossOff_3 })} type="text" placeholder="3 ) Features ...." maxLength="22" onChange={(e) => { this.setState({ productInfo_3: e.target.value }) }} value={this.state.productInfo_3} /></li>
                                                        <div id="MyVpCheckBox" className="noselect"><label htmlFor="chkbxcf4">Cross Off </label><input value="4" onClick={(e) => { this.addCrossOff(e) }} type="checkbox" id="chkbxcf4" /></div>
                                                        <li><input className={classNames("input_fd form-control text-center", { 'cross-off': this.state.crossOff_4 })} type="text" placeholder="4 ) Features ...." maxLength="22" onChange={(e) => { this.setState({ productInfo_4: e.target.value }) }} value={this.state.productInfo_4} /></li>
                                                        <div id="MyVpCheckBox" className="noselect"><label htmlFor="chkbxcf5">Cross Off </label><input value="5" onClick={(e) => { this.addCrossOff(e) }} type="checkbox" id="chkbxcf5" /></div>
                                                        <li><input className={classNames("input_fd form-control text-center", { 'cross-off': this.state.crossOff_5 })} type="text" placeholder="5 ) Features ...." maxLength="22" onChange={(e) => { this.setState({ productInfo_5: e.target.value }) }} value={this.state.productInfo_5} /></li>
                                                        <div id="MyVpCheckBox" className="noselect"><label htmlFor="chkbxcf6">Cross Off </label><input value="6" onClick={(e) => { this.addCrossOff(e) }} type="checkbox" id="chkbxcf6" /></div>
                                                        <li><input className={classNames("input_fd form-control text-center", { 'cross-off': this.state.crossOff_6 })} type="text" placeholder="6 ) Features ...." maxLength="22" onChange={(e) => { this.setState({ productInfo_6: e.target.value }) }} value={this.state.productInfo_6} /></li>
                                                    </ul>
                                                    <div className="btn-wrap">
                                                        <section className="btn-buy">
                                                            <input className="input_fd form-control text-center" onChange={(e) => { this.setState({ buttonText: e.target.value }) }} type="text" placeholder="Button Text" maxLength="22" value={this.state.buttonText} />
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>

                                        </center>
                                    </section>
                                </div>
                                <div className="row wd_last_bu">
                                    <div className="btn-group col-md-6" role="group">
                                        <input className="input_fd form-control" onChange={(e) => { this.setState({ redirect_link: e.target.value }) }} type="text" aria-describedby="CardURLRedirect" placeholder="Card URL Redirect" maxLength="100" value={this.state.redirect_link} />
                                    </div>
                                </div>
                                <div className="row wd_last_bu">
                                    <div className="btn-group col-md-6" role="group">
                                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#HideCard">Hide Card</button>
                                    </div>
                                    <div className="btn-group col-md-6" role="group">
                                        <button type="button" className="btn btn-success" onClick={this.SaveChangesCard}>Save Changes <small style={{ color: "red" }}>unhide</small></button>
                                    </div>
                                </div>

                            </div>
                            : null}
                    </div>
                    <div className="our_row">
                        <p className="row noselect title">Count Section</p>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12 form-group">
                                <small htmlFor="hc">Happy Clients</small>
                                <div className="mt-mob-si"><input id="hc" type="number" value={this.state.HappyClients} className="form-control HappyClientsPO" placeholder="Happy Clients" disabled /></div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12 form-group">
                                <small htmlFor="sp">Sold Program</small>
                                <div className="mt-mob-si"><input id="sp" type="number" onChange={(e) => { this.setState({ SoldProgram: e.target.value }) }} value={this.state.SoldProgram} className="form-control" placeholder="Sold Program" /></div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12 form-group">
                                <small htmlFor="pc">Programs Created</small>
                                <div className="mt-mob-si"><input id="pc" type="number" onChange={(e) => { this.setState({ ProgramsCreated: e.target.value }) }} value={this.state.ProgramsCreated} className="form-control" placeholder="Programs Created" /></div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12 form-group mt-mob-s-bu">
                                <button className="form-control btn btn-success mt-mob-si" onClick={this.CountChange} >Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="our_row">
                        <p className="row noselect title">Website Settings</p>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12 form-group">
                                <small htmlFor="uadu">Users Avatar Directory URL</small>
                                <div className="mt-mob-si"><input id="uadu" type="text" value={this.state.UsersAvatarDir} onChange={(e) => { this.setState({ UsersAvatarDir: e.target.value }) }} className="form-control" placeholder="URL Path" /></div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12 form-group">
                                <small htmlFor="wid">Website Images Directory</small>
                                <div className="mt-mob-si"><input id="wid" type="text" value={this.state.WebImgDir} onChange={(e) => { this.setState({ WebImgDir: e.target.value }) }} className="form-control" placeholder="URL Path" /></div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12 form-group">
                                <small htmlFor="nfau">NotFound Avatar URL</small>
                                <div className="mt-mob-si"><input id="nfau" type="text" value={this.state.NotFoundAvatar} onChange={(e) => { this.setState({ NotFoundAvatar: e.target.value }) }} className="form-control" placeholder="Image URL" /></div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12 form-group mt-mob-s-bu">
                                <button className="form-control btn btn-success mt-mob-si" onClick={() => { this.save_web_settings() }}>Save</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-12 form-group">
                                <small htmlFor="deskbg-select">Background Image For Desktop Screen</small>
                                <div className="mt-mob-si"><button id="deskbg-select" type="text" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="form-control btn-secondary dropdown-toggle noselect">Choose Image</button>
                                    <div className="col-lg-12 btn-group marg_top" role="group">
                                        <div className="dropdown-menu" aria-labelledby="deskbg-select">
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "1" }); this.show_background_image("1", "desktop") }}>1</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "2" }); this.show_background_image("2", "desktop") }}>2</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "3" }); this.show_background_image("3", "desktop") }}>3</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "4" }); this.show_background_image("4", "desktop") }}>4</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "5" }); this.show_background_image("5", "desktop") }}>5</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "6" }); this.show_background_image("6", "desktop") }}>6</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "7" }); this.show_background_image("7", "desktop") }}>7</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "8" }); this.show_background_image("8", "desktop") }}>8</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "9" }); this.show_background_image("9", "desktop") }}>9</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "10" }); this.show_background_image("10", "desktop") }}>10</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "11" }); this.show_background_image("11", "desktop") }}>11</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "12" }); this.show_background_image("12", "desktop") }}>12</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ desktop_bg: "13" }); this.show_background_image("13", "desktop") }}>13</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12 form-group">
                                <small htmlFor="mob_bg">Background Image For Mobile Screen</small>
                                <div className="mt-mob-si"><button id="deskbg-select" type="text" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="form-control btn-secondary dropdown-toggle noselect">Choose Image</button>
                                    <div className="col-lg-12 btn-group marg_top" role="group">
                                        <div className="dropdown-menu" aria-labelledby="deskbg-select">
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "1" }); this.show_background_image("1", "mobile") }}>1</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "2" }); this.show_background_image("2", "mobile") }}>2</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "3" }); this.show_background_image("3", "mobile") }}>3</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "4" }); this.show_background_image("4", "mobile") }}>4</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "5" }); this.show_background_image("5", "mobile") }}>5</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "6" }); this.show_background_image("6", "mobile") }}>6</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "7" }); this.show_background_image("7", "mobile") }}>7</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "8" }); this.show_background_image("8", "mobile") }}>8</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "9" }); this.show_background_image("9", "mobile") }}>9</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "10" }); this.show_background_image("10", "mobile") }}>10</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "11" }); this.show_background_image("11", "mobile") }}>11</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "12" }); this.show_background_image("12", "mobile") }}>12</button>
                                            <button className="dropdown-item" onClick={() => { this.setState({ mobile_bg: "13" }); this.show_background_image("13", "mobile") }}>13</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-12 form-group mt-mob-s-bu2">
                                <button className="form-control btn btn-success mt-mob-si" onClick={() => { this.change_backgrounds() }}>Save</button>
                            </div>
                        </div>
                        <div className="row">
                            <center>
                                <div className="col-6 col-sm-12 sbi_paren">
                                    {this.state.org_ng_des !== "" ?
                                        <img className="show_bg_image" src={this.state.org_ng_des} width="40%" alt="bg_showing" />
                                        : null
                                    }
                                </div>
                                <div className="col-6 col-sm-12">
                                    {this.state.org_ng_mob !== "" ?
                                        <img className="show_bg_image" src={this.state.org_ng_mob} width="20%" alt="bg_showing" />
                                        : null
                                    }
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                {/* =============== Hide Card =============== */}
                <div className="modal fade" id="HideCard" tabIndex="-1" role="dialog" aria-labelledby="HideCard" aria-hidden="true">
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="HideCard">Hide Card</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <center>
                                    Are you sure to Hide this Card , Your Edit Will Loss ?<br /><br />
                                    <button type="button" className="btn btn-secondary" style={{ marginRight: "10px" }} data-dismiss="modal">Cancel</button>
                                    <button type="button" data-dismiss="modal" onClick={this.hideCard} className="btn btn-danger">Hide</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </>
        );
    }
}

export default website_design;