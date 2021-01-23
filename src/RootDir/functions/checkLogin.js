import axios from 'axios'
import { checkExpire } from "../../API";
import { useHistory } from 'react-router-dom'

const CheckLogin = (props) =>{
  // Check login Page Show or no
  const history = useHistory()
  if (localStorage.getItem("token") !== undefined | localStorage.getItem("token") < 1 | localStorage.getItem("token") !== null) {
    var token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' }
    axios.get(checkExpire + "?token_check=" + encodeURIComponent(token), { headers: headers })
        .then((response) => {
          const msg = response.data.msg;
          if (msg === "token active") {
              history.push('/'+props.page)
          } else if (msg !== "token active") {
              history.push('/login')
          }
        })
    } else {
        history.push('/login')
    }
    return null;
}

export default CheckLogin;