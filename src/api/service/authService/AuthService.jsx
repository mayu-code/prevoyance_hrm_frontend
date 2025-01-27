import { createPassword, loginUser, registerUser } from "../../auth/Auth";

export const registerUserService = async (registerReq) => {
  try {
    const res = await registerUser(registerReq);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUserService = async (loginReq) => {
  try {
    const res = await loginUser(loginReq);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createPasswordService = async (req) => {
  try {
    const res = await createPassword(req);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
