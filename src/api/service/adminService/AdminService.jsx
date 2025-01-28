import { getEmployeeDetail, updatePersonalDetail } from "../../admin/AdminApi";

export const getEmployeeDetailService = async (id) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const res = await getEmployeeDetail(id, jwt);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePersonalDetailService = async (updateReq) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const res = await updatePersonalDetail(updateReq, jwt);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
