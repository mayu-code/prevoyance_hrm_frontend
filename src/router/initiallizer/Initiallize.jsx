import { getUserByJwtService } from "../../api/service/userService/UserService";
import { decryptData } from "../../security/SecurityCrypto";
export const initializeUser = async (
  jwtToken,
  data,
  setIsLoading,
  setUser1
) => {
  if (!jwtToken || !data) {
    setIsLoading(false); // No token or data, no need to fetch
    return;
  }

  try {
    const decryptedUser = decryptData(data);
    setUser1(decryptedUser);

    // Fetch user data based on role
    const user = await getUserByJwtService(jwtToken);

    setUser1(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    setUser1(null); // Handle errors gracefully
  } finally {
    setIsLoading(false); // Done loading
  }
};
