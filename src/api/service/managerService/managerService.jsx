import {
  getAllCandidates,
  getAllEmployees,
  onboardEmployee,
} from "../../hrManager/ManagerApi";

export const getAllCandidatesService = async (paramReq) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const res = await getAllCandidates(paramReq, jwt);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllEmployeeService = async (paramReq) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const res = await getAllEmployees(paramReq, jwt);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const onboardEmployeeService = async (employeeReq) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const res = await onboardEmployee(employeeReq, jwt);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
