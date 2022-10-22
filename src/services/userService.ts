import axios from "axios";
import { loginModel, registerModel } from "../models/userModel";

const registerUser = (data: registerModel) => {
  return axios.post("http://localhost:8000/user/register", data);
};

const loginUser = (data: loginModel) => {
  return axios.post("http://localhost:8000/user/login", data);
};

const userService = {
  registerUser,
  loginUser,
};

export default userService;
