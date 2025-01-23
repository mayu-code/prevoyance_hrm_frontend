import { lazy, useState } from "react";
import { signupImage } from "../../components/ui/img/SignupImage";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUserService } from "../../api/service/authService/AuthService";

export const SignUp = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateFields(name, value);
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFields = (name, value) => {
    let newErrors = [];
    if (name === "firstName" && !value) {
      newErrors.firstName = "fisrt Name is Required!";
    }
    if (name === "lastName" && !value) {
      newErrors.lastName = "last Name is Required!";
    }
    if (name === "email" && !value) {
      newErrors.email = "Email is Required!";
    }
    if (name === "contact" && !value) {
      newErrors.contact = "Contact is required!";
    }
    if (value.length > 10) newErrors.contact = "Enter 10 digits only!";
    if (name === "password" && !value) {
      newErrors.password = "Password is Required!";
    }
    if (name === "confirmPassword" && value !== registerData.password)
      newErrors.confirmPassword = "Password Doesn't match!!";
    setErors(newErrors);
  };

  const validateSubmit = () => {
    let newErrors = {};

    if (registerData.firstName === "")
      newErrors.firstName = "first Name is Required!!";
    if (registerData.lastName === "")
      newErrors.lastName = "last Name is Required!!";
    if (registerData.email === "") newErrors.email = "Email is Required!!";
    if (registerData.contact === "")
      newErrors.contact = "Contact is Required!!";
    if (registerData.password === "")
      newErrors.password = "Password is Required!!";
    if (registerData.confirmPassword === "")
      newErrors.confirmPassword = "Confirm Password is Required!!";
    if (registerData.password !== registerData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";

    return newErrors;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSubmit();
    setErors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    const { confirmPassword, ...payload } = registerData;

    console.log("form data: ", payload);

    const res = await registerUserService(payload);

    alert(res?.message);

    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/login");
  };

  return (
    <section className="mt-2">
      <div className="container w-[80%] bg-white border-2 border-purple-200 rounded-lg mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="overflow-hidden hidden md:inline">
          <img
            src={signupImage}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[80%] mx-auto p-2 md:p-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl font-medium text-purple-600">Sign Up</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleChange}
                    className="focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 placeholder:font-medium placeholder:text-gray-800 w-full h-10 p-2 rounded-md"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleChange}
                    className="focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 placeholder:font-medium placeholder:text-gray-800 w-full h-10 p-2 rounded-md"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
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
                  type="text"
                  name="contact"
                  value={registerData.contact}
                  onChange={handleChange}
                  className="focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 placeholder:font-medium placeholder:text-gray-800 w-full h-10 p-2 rounded-md"
                  placeholder="Contact"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">{errors.contact}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  className="focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 placeholder:font-medium placeholder:text-gray-800 w-full h-10 p-2 rounded-md"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  className="focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 placeholder:font-medium placeholder:text-gray-800 w-full h-10 p-2 rounded-md"
                  placeholder="Re-enter Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-500 p-3 hover:bg-purple-600 text-white rounded-lg"
                >
                  Sign up
                </button>
              </div>
              <div className="flex justify-center items-center">
                <p>
                  Already have an account?{" "}
                  <NavLink to="/login">
                    <span className="text-blue-500">Sign in</span>
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
