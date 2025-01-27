import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:8080/auth",
});

export const registerUser = (registerReq) => {
  return auth.post("/register", registerReq);
};

export const loginUser = (loginReq) => {
  return auth.post("/login", loginReq);
};

export const createPassword = (req) => {
  return auth.post("/createPassword", req);
};
