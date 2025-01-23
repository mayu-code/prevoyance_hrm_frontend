import axios from "axios";

const user = axios.create({
  baseURL: "http://localhost:8080/user",
});

export const getUserByJwt = (jwt) => {
  return user.get("/getProfile", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
