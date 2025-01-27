import { addEmloyee } from "../../hrExecutive/ExecutiveAPi";

export const addEmloyeeService = async (registrationReq) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const res = await addEmloyee(registrationReq, jwt);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
