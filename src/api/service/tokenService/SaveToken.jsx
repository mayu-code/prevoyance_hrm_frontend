export const saveJwtToken = (jwt) => {
  localStorage.setItem("jwt", jwt);
};
