export const redirectRoute = (role) => {
  switch (role) {
    case "SUPERADMIN":
      return "/user/sadmin/dashboard";
    case "ADMIN":
      return "/user/admin/dashboard";
    case "HRMANAGER":
      return "/user/hr-manager/dashboard";
    case "HREXECUTIVE":
      return "/user/hr-executive/dashboard";
    default:
      return "/";
  }
};
