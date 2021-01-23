import axios from 'axios'
import { checkExpire } from "../../API"
import { useHistory } from 'react-router-dom'

var token = null;
const CheckLoginAdmin = (props) => {
    var headers = { 'Content-Type': 'application/json' }
    const history = useHistory()

    if (localStorage.getItem("admin_token")) {
        token = encodeURIComponent(localStorage.getItem("admin_token"));
    } else if (sessionStorage.getItem("admin_token")) {
        token = encodeURIComponent(sessionStorage.getItem("admin_token"));
    }

    if (token === undefined | token === null) {
        history.push('/admin-login')
    } else {
        axios.get(checkExpire + "?token_check=" + token + "&r=1", { headers: headers })
            .then((response) => {
                const msg = response.data.msg;
                if (msg === "token active") {
                    history.push(props.page)
                } else {
                    history.push('/admin-login')
                }
            })
    }
    return (null);
}

export default CheckLoginAdmin;