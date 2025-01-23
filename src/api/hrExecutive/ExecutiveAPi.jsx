import axios from "axios";

const hr = axios.create({
  baseURL: "http://localhost:8080/hrExecutive",
});

export const addEmloyee = (registrationReq, jwt) => {
  return hr.post("/addEmloyee", registrationReq, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
