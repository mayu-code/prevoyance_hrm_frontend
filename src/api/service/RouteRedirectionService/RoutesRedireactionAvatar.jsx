export const selectRoute = (role, action) => {
  switch (role) {
    case "SUPERADMIN":
      return `/sadmin/${action}`;
    case "ADMIN":
      return `/admin/${action}`;
    case "HRMANAGER":
      return `/hr-manager/${action}`;
    case "HREXECUTIVE":
      return `/hr-executive/${action}`;
    default:
      return "/";
  }
};
