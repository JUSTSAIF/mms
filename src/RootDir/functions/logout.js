const Logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token');
    window.location.reload(true);
}

export default Logout;