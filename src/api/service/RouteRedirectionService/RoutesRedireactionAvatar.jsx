export const selectRoute = (role, action) => {
  switch (role) {
    case "SUPERADMIN":
      return `/user/sadmin/${action}`;
    case "ADMIN":
      return `/user/admin/${action}`;
    case "HRMANAGER":
      return `/user/hr-manager/${action}`;
    case "HREXECUTIVE":
      return `/user/hr-executive/${action}`;
    default:
      return "/";
  }
};
