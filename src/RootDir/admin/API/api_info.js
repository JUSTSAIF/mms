import React, { lazy, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import CheckLoginAdmin from '../../functions/checkLoginAdmin';
import { Helmet } from 'react-helmet'
import "./style.css";
const Nav = lazy(() => import("../../inc/AdminNav/AdminNav"));

class website_design extends Component {
    componentDidMount() {
        <CheckLoginAdmin page="/api-intro" />
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

    componentWillUnmount() {
        const initialState = {};
        this.setState(initialState);
    }

    render() {
        return (
            <>
                <CheckLoginAdmin page="/api-intro" />
                <Nav />
                <Helmet><title>API</title></Helmet>
                <div className="container api_intro">
                    <div className="myrow">
                        <p className="row noselect title">API</p>
                        <hr />
                        <div className="myBody">
                            <p>API URL : <span className="badge badge-info"> https://localhost/Api/v1/private/</span></p>
                            <h4>How To Use ?!</h4><br />
                            <p>USE : POST Requests <small>[form-data]</small></p>
                            <h4>PHP example :</h4>
                            <iframe src="https://pastebin.com/embed_iframe/ZeJmeDGv?theme=dark" className="embed_code" title="embed_code"></iframe>
                            <h4>Python example :</h4>
                            <iframe src="https://pastebin.com/embed_iframe/beTWm2Y4?theme=dark" className="embed_code" title="embed_code"></iframe>

                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default website_design;