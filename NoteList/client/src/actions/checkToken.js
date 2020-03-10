//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import Cookies from 'js-cookie';

export const getToken = () => {
    return Cookies.get("access_token") ? Cookies.get("access_token") : null;
}

export const checkToken = async () => {
    var token = getToken();
    const obj = {
        "token": token
    }
    const res = await axios.post("/api/users/verify", obj);
    if (res.data.success) {
        return true;
    } else {
        return false;
    }
}