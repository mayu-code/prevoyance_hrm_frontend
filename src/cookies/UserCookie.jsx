// utils/auth.js
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const secretKey =
  "fjcsdbjfkcsldfy98df68775dsa78d3j2bieruw7832buibduitd8329bdsa;dbsakjdg785d6asdgui32hewe;rjaopr73232435"; // A strong key used for encryption/decryption

// Encrypt the user object and store it in a cookie
export const setUserCookie = (user) => {
  const encryptedUser = CryptoJS.AES.encrypt(
    JSON.stringify(user),
    secretKey
  ).toString();
  Cookies.set("user", encryptedUser, { expires: 1, secure: true }); // Store for 1 days
};

// Decrypt and retrieve the user object from the cookie
export const getUserFromCookie = () => {
  const encryptedUser = Cookies.get("user");
  if (encryptedUser) {
    const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
    const decryptedUser = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedUser ? JSON.parse(decryptedUser) : null;
  }
  return null;
};

// Clear the user cookie
export const clearUserCookie = () => {
  Cookies.remove("user");
};
