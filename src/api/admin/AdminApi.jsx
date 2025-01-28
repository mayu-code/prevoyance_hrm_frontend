import axios from "axios";

const admin = axios.create({
  baseURL: "http://localhost:8080/admin",
});

export const getEmployeeDetail = (id, jwt) => {
  return admin.get(`/getEmployeeById/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const updatePersonalDetail = (updateReq, jwt) => {
  return admin.post(`/updatePersonalDetail`, updateReq, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
