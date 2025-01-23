import { addEmloyee } from "../../hrExecutive/ExecutiveAPi";

const jwt = localStorage.getItem("jwt");

export const addEmloyeeService = async (registrationReq) => {
  try {
    const res = await addEmloyee(registrationReq, jwt);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
