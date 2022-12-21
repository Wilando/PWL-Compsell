import axios from "axios";
const API_URL = "http://localhost:8000/auth/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    },
    {withCredentials: true})

};

const register = (nama, email, password) => {
  return axios
    .post(API_URL + "register", {
      nama,
      email,
      password,
    })
}

const logout = () => {
  return axios.get(API_URL + "logout", {withCredentials: true})
};

const whoami = (cookie) => {
  return axios.get(API_URL + "whoami", {withCredentials: true, headers: { Cookie: cookie} } );
}

// eslint-disable-next-line
export default {
  login,
  logout,
  whoami,
};
