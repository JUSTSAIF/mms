import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


function Footer() {
    return (
        <div>
            <div className="footer-nav-g navbar navbar-inverse navbar-fixed-bottom">
              <div className="container">
                <p className="navbar-text">
                    © {new Date().getFullYear()}{" "}
                    <a href="https://instagram.com/qq_iq" rel="noreferrer"  target="_blank" > | Created By Mr28 </a>
                </p>
              </div>
            </div>
        </div>
    )
}

export default Footer
