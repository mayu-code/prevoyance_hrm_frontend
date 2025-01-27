import axios from "axios";

const hr = axios.create({
  baseURL: "http://localhost:8080/hrManager",
});

export const getAllCandidates = (paramReq, jwt) => {
  return hr.get("/getAllCandidates", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      query: paramReq.query,
      department: paramReq.department,
    },
  });
};

export const getAllEmployees = (paramReq, jwt) => {
  return hr.get("/getAllEmployees", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      query: paramReq.query,
      department: paramReq.department,
    },
  });
};

export const onboardEmployee = (employeeReq, jwt) => {
  return hr.post("/onboardEmployee", employeeReq, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
