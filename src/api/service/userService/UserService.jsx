import { getUserByJwt } from "../../user/User";

export const getUserByJwtService = async (jwt) => {
  try {
    const res = await getUserByJwt(jwt);
    // console.log(res);

    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
