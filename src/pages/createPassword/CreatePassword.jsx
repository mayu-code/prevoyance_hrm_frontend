import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPasswordService } from "../../api/service/authService/AuthService";

export const CreatePassword = () => {
  const location = useLocation();

  // Extract the query parameters
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [data, setData] = useState({
    email: email,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field in real-time
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let fieldError = "";

    if (fieldName === "password") {
      if (!value) {
        fieldError = "Password is required.";
      } else if (value.length < 8) {
        fieldError = "Password must be at least 8 characters long.";
      }
    }

    if (fieldName === "confirmPassword") {
      if (!value) {
        fieldError = "Confirm Password is required.";
      } else if (value !== data.password) {
        fieldError = "Passwords do not match.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: fieldError,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.password) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form on submit
    if (validateForm()) {
      console.log(data);

      const res = await createPasswordService(data);

      alert(res?.message);

      // Reset form after successful submission
      setData({
        email: data.email,
        password: "",
        confirmPassword: "",
      });

      setErrors({});

      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center">
        <div className="mt-20 flex rounded-md shadow-sm flex-col w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] gap-10 bg-white p-10">
          <div className="flex justify-center items-center">
            <h1 className="font-semibold text-xl">Create your new password</h1>
          </div>
          <p>
            Email: <span className="font-medium ">{data?.email}</span>{" "}
          </p>
          <div className="flex flex-col gap-5">
            {/* Password Field */}
            <div>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                name="password"
                className="h-10 p-2 rounded-md focus:outline-none focus:ring-2 w-full"
                placeholder="Enter password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {/* Confirm Password Field */}
            <div>
              <input
                type="password"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                className="h-10 p-2 rounded-md focus:outline-none focus:ring-2 w-full"
                placeholder="Confirm password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex justify-center items-center rounded-md bg-blue-500 py-2 text-white">
            <button type="submit">Create Password</button>
          </div>
        </div>
      </div>
    </form>
  );
};
