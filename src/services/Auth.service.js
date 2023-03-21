import axios from "axios";



const API_URL = "http://localhost:4000/user"

const register = async (username, password, email, address) => {
  const result = await axios.post(API_URL + "/addUser", {
    username,
    email,
    password,
    address
  })
  localStorage.setItem("user", JSON.stringify(result.data));
  return result.data;
};

const login = async(username, password) => {
  const result = await axios.get(API_URL + `/getUserByName/${username}`)
  if (result.data) {
    if(result.data.password==password){
    localStorage.setItem("user", JSON.stringify(result.data));
    return result.data;
  }
  }
 return false

};



const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;