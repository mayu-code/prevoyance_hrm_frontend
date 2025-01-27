import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signInImage } from "../../components/ui/img/SignInImage";
import { useState } from "react";
import { loginUserService } from "../../api/service/authService/AuthService";
import { saveJwtToken } from "../../api/service/tokenService/SaveToken";
import { addUser } from "../../redux/slice/UserSlice";
import { encryptData } from "../../security/SecurityCrypto";
import { getUserByJwtService } from "../../api/service/userService/UserService";
import { setUserCookie } from "../../cookies/UserCookie";
import { selectRoute } from "../../api/service/RouteRedirectionService/RoutesRedireactionAvatar";

export const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErors] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateFields(name, value);
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = (name, value) => {
    let newErrors = [];

    if (name === "email" && !value) newErrors.email = "Email is Requiried";
    if (name === "password" && !value)
      newErrors.password = "Password is Requiried";

    setErors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSubmit();
    setErors(errors);
    if (Object.keys(errors).length !== 0) return;

    // console.log(loginData);

    const res = await loginUserService(loginData);

    alert(res?.message);

    const token = res.token;

    if (token) {
      saveJwtToken(res?.token);

      // console.log(res?.role);

      const user = await getUserByJwtService(res?.token);

      dispatch(addUser(encryptData(user)));

      setUserCookie(user);

      const route = selectRoute(user?.role, "dashboard");

      // console.log(route);

      navigate(route);
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  const validateSubmit = () => {
    let newErrors = [];

    if (!loginData.email) newErrors.email = "Email is Requiried";
    if (!loginData.password) newErrors.password = "Password is Requiried";

    return newErrors;
  };
  return (
    <section className="mt-10">
      <div className="container w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] bg-white border-2 border-purple-200 rounded-lg mx-auto ">
        <div className="w-[100%] mx-auto p-10">
          <div className="overflow-hidden flex justify-center items-center">
            <img
              src={signInImage}
              alt="image"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <div className="flex justify-center items-center">
                <h2 className="text-3xl font-medium text-purple-600">
                  Sign In
                </h2>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 placeholder:font-medium placeholder:text-gray-800 w-full h-10 p-2 rounded-md"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 placeholder:font-medium placeholder:text-gray-800 w-full h-10 p-2 rounded-md"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-500 p-3 hover:bg-purple-600 text-white rounded-lg"
                >
                  Sign in
                </button>
              </div>
              <div className="flex justify-center items-center">
                <p>
                  Already have an account?{" "}
                  <NavLink to="/register">
                    <span className="text-blue-500">Sign up</span>
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
