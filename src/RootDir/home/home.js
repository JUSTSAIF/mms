import React, { Component, lazy } from 'react';
import CheckLogin from "../functions/checkLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { General } from "../../API";
import CountUp from 'react-countup';
import './home.css';
import classNames from 'classnames'
import { Helmet } from 'react-helmet'
const Nav = lazy(() => import("../inc/MemberNav/MemberNav"));
const Footer = lazy(() => import("../inc/footer/footer"));
var token = encodeURIComponent(localStorage.getItem("token"));

class Home extends Component {
  state = {
    HappyClients: 0,
    SoldProgram: 0,
    ProgramsCreated: 0,
    TotalVisitors: 0,
    buySection: [],
    HideNewItems: false
  }

  componentDidMount() {
    const headers = { 'Content-Type': 'application/json' }
    if (token !== "null") {
      axios.get(General + "?token=" + token, { headers: headers }).then((response) => {
        this.setState({
          buySection: response.data['buy_sec'],
          HappyClients: response.data['count_sec'].hc, SoldProgram: response.data['count_sec'].sp, ProgramsCreated: response.data['count_sec'].pc
        })
        if (response.data['buy_sec'][0].hide & response.data['buy_sec'][1].hide & response.data['buy_sec'][2].hide) { this.setState({ HideNewItems: true }) }
      });
    }
  }


  render() {
    return (
      <>
        <CheckLogin page="" />
        <Nav />
        <Helmet><title>H O M E</title></Helmet>
        <section className={classNames("shop-items", { 'just_top': this.state.HideNewItems })}>
          <div className="container" data-aos="fade-up">
            {this.state.buySection.length === 3 ?
              <>
                <h1 className={classNames("badge bg-danger text-center", { 'd-none': this.state.HideNewItems })}>New Items</h1>
                <div className="row">
                  {/* BS :: 1 */}
                  <div className={classNames("col-lg-4 col-md-6 mt-4 mt-lg-0", { 'd-none': this.state.buySection[0].hide })} data-aos="zoom-in" data-aos-delay="100">
                    <div className="box">
                      <h3>{this.state.buySection[0].head}</h3>
                      <h4><sup>{this.state.buySection[0].currencyType}</sup>{this.state.buySection[0].price}<span> / {this.state.buySection[0].SubscriptionTime}</span></h4>
                      <ul>
                        <li className={classNames({ "cross-off": this.state.buySection[0]['productInfo']['1']['crossOff'] })}>{this.state.buySection[0]['productInfo']['1']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[0]['productInfo']['2']['crossOff'] })}>{this.state.buySection[0]['productInfo']['2']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[0]['productInfo']['3']['crossOff'] })}>{this.state.buySection[0]['productInfo']['3']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[0]['productInfo']['4']['crossOff'] })}>{this.state.buySection[0]['productInfo']['4']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[0]['productInfo']['5']['crossOff'] })}>{this.state.buySection[0]['productInfo']['5']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[0]['productInfo']['6']['crossOff'] })}>{this.state.buySection[0]['productInfo']['6']['string']}</li>
                      </ul>
                      <div className="btn-wrap">
                        <a href={this.state.buySection[0].redirect_link} rel="noreferrer" target="_blank" className="btn-buy">{this.state.buySection[0].buttonText}</a>
                      </div>
                    </div>
                  </div>
                  {/* BS :: 2 */}
                  <div className={classNames("col-lg-4 col-md-6 mt-4 mt-lg-0", { 'd-none': this.state.buySection[1].hide })} data-aos="zoom-in" data-aos-delay="100">
                    <div className="box featured">
                      <h3>{this.state.buySection[1].head}</h3>
                      <h4><sup>{this.state.buySection[1].currencyType}</sup>{this.state.buySection[1].price}<span> / {this.state.buySection[1].SubscriptionTime}</span></h4>
                      <ul>
                        <li className={classNames({ "cross-off": this.state.buySection[1]['productInfo']['1']['crossOff'] })}>{this.state.buySection[1]['productInfo']['1']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[1]['productInfo']['2']['crossOff'] })}>{this.state.buySection[1]['productInfo']['2']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[1]['productInfo']['3']['crossOff'] })}>{this.state.buySection[1]['productInfo']['3']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[1]['productInfo']['4']['crossOff'] })}>{this.state.buySection[1]['productInfo']['4']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[1]['productInfo']['5']['crossOff'] })}>{this.state.buySection[1]['productInfo']['5']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[1]['productInfo']['6']['crossOff'] })}>{this.state.buySection[1]['productInfo']['6']['string']}</li>
                      </ul>
                      <div className="btn-wrap">
                        <a href={this.state.buySection[1].redirect_link} rel="noreferrer" target="_blank" className="btn-buy">{this.state.buySection[1].buttonText}</a>
                      </div>
                    </div>
                  </div>
                  {/* BS :: 3 */}
                  <div className={classNames("col-lg-4 col-md-6 mt-4 mt-lg-0", { 'd-none': this.state.buySection[2].hide })} data-aos="zoom-in" data-aos-delay="100">
                    <div className="box">
                      <h3>{this.state.buySection[2].head}</h3>
                      <h4><sup>{this.state.buySection[2].currencyType}</sup>{this.state.buySection[2].price}<span> / {this.state.buySection[2].SubscriptionTime}</span></h4>
                      <ul>
                        <li className={classNames({ "cross-off": this.state.buySection[2]['productInfo']['1']['crossOff'] })}>{this.state.buySection[2]['productInfo']['1']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[2]['productInfo']['2']['crossOff'] })}>{this.state.buySection[2]['productInfo']['2']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[2]['productInfo']['3']['crossOff'] })}>{this.state.buySection[2]['productInfo']['3']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[2]['productInfo']['4']['crossOff'] })}>{this.state.buySection[2]['productInfo']['4']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[2]['productInfo']['5']['crossOff'] })}>{this.state.buySection[2]['productInfo']['5']['string']}</li>
                        <li className={classNames({ "cross-off": this.state.buySection[2]['productInfo']['6']['crossOff'] })}>{this.state.buySection[2]['productInfo']['6']['string']}</li>
                      </ul>
                      <div className="btn-wrap">
                        <a href={this.state.buySection[2].redirect_link} rel="noreferrer" target="_blank" className="btn-buy">{this.state.buySection[2].buttonText}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              : null}
          </div>
        </section>
        {/*   ======= Counts Section =======   */}
        <br />
        <section id="counts" className="counts section-bg" >
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-lg-4 col-6 d-md-flex align-items-md-stretch">
                <div className="count-box">
                  <span data-toggle="counter-up" ><CountUp end={this.state.HappyClients} /></span>
                  <p>Happy Clients</p>
                </div>
              </div>
              <div className="col-lg-4 col-6 d-md-flex align-items-md-stretch">
                <div className="count-box">
                  <span data-toggle="counter-up"><CountUp end={this.state.SoldProgram} /></span>
                  <p>Sold Program</p>
                </div>
              </div>
              <div className="col-lg-4 col-6 d-md-flex align-items-md-stretch">
                <div className="count-box">
                  <span data-toggle="counter-up"><CountUp end={this.state.ProgramsCreated} /></span>
                  <p>Programs Created</p>
                </div>
              </div>
            </div>
          </div>
        </section><br /><br /><br />
        <div className={classNames({ 'just_bottom': this.state.HideNewItems })} ></div>
        <Footer />
      </>
    )
  }
}

export default Home;







// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShieldAlt, faCode, faUsersCog, faTasks, faExchangeAlt, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
// import { Tooltip, OverlayTrigger } from 'react-bootstrap';
