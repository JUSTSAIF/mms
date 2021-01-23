import axios from 'axios'
import { checkExpire } from "../../API"
import { useHistory } from 'react-router-dom'

const CheckLoginAdmin = (props) => {
    var token = "";
    const history = useHistory()

    if (localStorage.getItem("admin_token")) {
        token = encodeURIComponent(localStorage.getItem("admin_token"));
    } else if (sessionStorage.getItem("admin_token")) {
        token = encodeURIComponent(sessionStorage.getItem("admin_token"));
    }

    if (token !== undefined | token !== "") {
        axios.get(checkExpire + "?token_check=" + token + "&r=1", { headers: { 'Content-Type': 'application/json' } }).then((response) => {
            const msg = response.data.msg;
            if (msg === "token active") {
                history.push(props.page)
            } else {
                history.push('/admin-login')
            }
        })
    }
    return null;
}

export default CheckLoginAdmin;