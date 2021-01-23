import React, { lazy, PureComponent } from 'react';
import CheckLoginAdmin from '../../functions/checkLoginAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios'
import './home.css';
import ReactPaginate from 'react-paginate';
import { AdminGet, DeleteUser, checkUsrPermissions } from '../../../API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet'
const Nav = lazy(() => import("../../inc/AdminNav/AdminNav"));
const headers = { 'Content-Type': 'application/json' }
var token = "";
function rand() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class AdminHome extends PureComponent {
    state = {
        usersCount: 0,
        users: [],
        perPage: 6,
        tableData: null,
        offset: null,
        currentPage: 1,
        page: 1,
        searchInput: "",
        Clicked_Item: null,
        MoreUserData: [],
        MoreUserContact: [],
        MoreUserDataSuccess: false,
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
        <CheckLoginAdmin page="/ad-home" />
        try {
            if (localStorage.getItem("admin_token")) {
                token = encodeURIComponent(localStorage.getItem("admin_token"));
            } else if (sessionStorage.getItem("admin_token")) {
                token = encodeURIComponent(sessionStorage.getItem("admin_token"));
            }
            if (token !== "null") {
                axios.get(checkUsrPermissions + "?token_check=" + token, { headers: headers }).then((response) => {
                    if (response.data.msg === "ar" | response.data.msg === "an") {
                        axios.get(AdminGet + "?token=" + token).then((response) => { //"http://192.168.100.34/gg.json
                            const usersCount = response.data.filter(usersDat => usersDat.id).length;
                            var slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage);
                            this.setState({
                                users: response.data,
                                usersCount: usersCount,
                                tableData: slice,
                                pageCount: Math.ceil(response.data.length / this.state.perPage),
                            });
                        });
                    }
                });
            }
        } catch (error) { }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset,
            page: selectedPage + (selectedPage === 0 ? 1 : selectedPage * 6)
        }, () => {
            this.loadMoreData()
        });
    };
    loadMoreData() {
        const data = this.state.users;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })
    }

    More_user_data = () => {
        if (this.state.Clicked_Item !== null) {
            axios.get(AdminGet + "?token=" + token + "&uid=" + this.state.Clicked_Item, { headers: headers }).then((response) => {
                if (response.data.ExpireTime === "") { response.data.ExpireTime = "Not Subscribed"; }
                if (response.data.Subscription_create_date === "") { response.data.Subscription_create_date = "Not Subscribed"; }
                try {
                    if (response.data.res !== "User Not Exist !" | response.data.res !== undefined) {
                        this.setState({ MoreUserDataSuccess: true, MoreUserData: response.data });
                        var { facebook, instagram, email } = response.data.Contact;
                        if (facebook === null) { facebook = "Not Found !" }
                        if (instagram === null) { instagram = "Not Found !" }
                        if (email === null) { email = "Not Found !" }
                        this.setState({ MoreUserContact: [email, instagram, facebook] })
                    }
                } catch (error) { console.log("Update State Err !!"); }
            })
        }
    }
    Delete_user = () => {
        let data = new FormData();
        data.append("token", decodeURIComponent(token));
        data.append("uid", this.state.Clicked_Item);
        axios.post(DeleteUser, data, { headers: headers }).then((response) => {
            var res = response.data.res;
            if (res === "Done") {
                this.toastViewer("User Deleted Successfully 😋");
            } else {
                this.toastViewer(res + " 😤");
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="ad-home">
                <Helmet><title>Admin Panel</title></Helmet>
                <CheckLoginAdmin page="/ad-home" />
                <Nav />
                <div className="container">
                    <input type="text" onChange={(e) => { this.setState({ searchInput: e.target.value }) }} className="table-search col-12" placeholder="Search.." />
                    <i className="fa fa-search table-search-icon"></i>
                    <table id="myTable" className="table table-striped table-bordered table-hover table-responsive-sm">
                        <thead>
                            <tr className="table-head">
                                <th>#</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>IP</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody className="table-res">
                            {this.state.tableData !== null ?
                                this.state.searchInput !== "" ?
                                    this.state.users.filter(val => {
                                        if (
                                            val.Name.toLowerCase().includes(this.state.searchInput.toLowerCase()) |
                                            val.IP.toLowerCase().includes(this.state.searchInput.toLowerCase()) |
                                            val.LastActive.toLowerCase().includes(this.state.searchInput.toLowerCase()) |
                                            val.ExpireTime.toLowerCase().includes(this.state.searchInput.toLowerCase()) |
                                            (val.role + "").toLowerCase().includes(this.state.searchInput.toLowerCase()) |
                                            val.Username.toLowerCase().includes(this.state.searchInput.toLowerCase())
                                        ) {
                                            return val
                                        }
                                        return null;
                                    }).map((user, i) => {
                                        return (
                                            <tr key={rand()}>
                                                <td>{this.state.page + i}</td>
                                                <td>{user.Username}</td>
                                                <td>{user.Name}</td>
                                                <td>{user.IP}</td>
                                                <td onMouseEnter={() => { this.setState({ Clicked_Item: user.id }) }} className="d-none d-lg-block">
                                                    <button data-toggle="modal" data-target="#deleteUser" className="btn btn-danger">Delete</button>
                                                    <button data-toggle="modal" data-target="#moreuserinfo" onClick={this.More_user_data} style={{ marginLeft: "10px" }} className="btn btn-success">More</button>
                                                </td>
                                                <td onMouseEnter={() => { this.setState({ Clicked_Item: user.id }) }} className="d-{xs,sm}-block d-lg-none mob-dc-button">
                                                    <button data-toggle="modal" data-target="#deleteUser" className="btn btn-danger">Delete</button>
                                                    <button data-toggle="modal" data-target="#moreuserinfo" onClick={this.More_user_data} style={{ marginLeft: "5px" }} className="btn btn-success">More</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    this.state.tableData.map((user, i) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{this.state.page + i}</td>
                                                <td>{user.Username}</td>
                                                <td>{user.Name}</td>
                                                <td>{user.IP}</td>
                                                <td onMouseEnter={() => { this.setState({ Clicked_Item: user.id }) }} className="d-none d-lg-block">
                                                    <button data-toggle="modal" data-target="#deleteUser" className="btn btn-danger">Delete</button>
                                                    <button style={{ marginLeft: "10px" }} data-toggle="modal" onClick={this.More_user_data} data-target="#moreuserinfo" className="btn btn-success">More</button>
                                                </td>
                                                <td onMouseEnter={() => { this.setState({ Clicked_Item: user.id }) }} className="d-{xs,sm}-block d-lg-none mob-dc-button">
                                                    <button data-toggle="modal" data-target="#deleteUser" className="btn btn-danger">Delete</button>
                                                    <button style={{ marginLeft: "5px" }} data-toggle="modal" onClick={this.More_user_data} data-target="#moreuserinfo" className="btn btn-success">More</button>
                                                </td>
                                            </tr>
                                        )
                                    }) : null
                            }
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={"Back"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
                {/* =============== Delete Modal =============== */}
                <div className="modal fade" id="deleteUser" tabIndex="-1" role="dialog" aria-labelledby="deleteUserLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteUserLabel">Delete User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete this user?<br /><br />
                                <div className="delete-user">
                                    <button type="button" className="btn btn-secondary" style={{ marginRight: "10px" }} data-dismiss="modal">Cancel</button>
                                    <button type="button" data-dismiss="modal" onClick={this.Delete_user} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* =============== more user info Modal =============== */}
                <div className="modal fade" id="moreuserinfo" tabIndex="-1" role="dialog" aria-labelledby="moreuserinfo" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteUserLabel">User Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.MoreUserDataSuccess === true ?
                                    <>
                                        <div className="row">
                                            <img className="col-md-4" src={this.state.MoreUserData.ProfilePic} alt="user profile" />
                                            <div className="col-md-8">
                                                <h4>Name : <span>{this.state.MoreUserData.Name}</span></h4>
                                                <h4>IP Addr : <span>{this.state.MoreUserData.IP}</span></h4>
                                                <h4>Role : <span>{this.state.MoreUserData.role}</span></h4>
                                            </div>
                                        </div>
                                        <div className="row real-c">
                                            <div className="col-lg-12">
                                                <hr />
                                                <h5>Username : <span className="badge">{this.state.MoreUserData.Username}</span></h5>
                                                <h5>Last Active : <span className="badge">{this.state.MoreUserData.LastActive}</span></h5>
                                                <h5>Account Create Date : <span className="badge">{this.state.MoreUserData.Account_Create_Time}</span></h5>
                                                <h5>Subscription Create Date : <span className="badge">{this.state.MoreUserData.Subscription_create_date}</span></h5>
                                                <h5>Expire Date : <span className="badge">{this.state.MoreUserData.ExpireTime}</span></h5>
                                                <hr />
                                                <h4>Contact</h4>
                                                <h5>E-mail : <span className="badge">{this.state.MoreUserContact[0]}</span></h5>
                                                <h5>Instagram : <span className="badge">{this.state.MoreUserContact[1]}</span></h5>
                                                <h5>Facebook : <span className="badge">{this.state.MoreUserContact[2]}</span></h5>
                                            </div>
                                        </div>
                                    </>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default AdminHome;