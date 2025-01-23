import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { decryptData } from "../../security/SecurityCrypto";
import AvatarMenu from "../ui/Avatar";
import { companyLogo } from "../ui/img/CompanyLogo";

export const Header = () => {
  const [user, setUser] = useState(null);

  const jwt = localStorage.getItem("jwt");

  const data = useSelector((state) => state.userReducer.user);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(decryptData(data));
    }
  }, [data]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white sticky top-0 z-50 w-full">
      <div className="w-[100%] md:w-[80%] mx-auto">
        <div className="flex py-2 h-[5rem] justify-between">
          <NavLink to="/">
            <div className="flex gap-2">
              <figure className="w-16 h-auto ">
                <img src={companyLogo} alt="logo" />
              </figure>
              <div className="flex justify-center items-center">
                <p className="font-bold tracking-widest">
                  Prevoyance IT Solutions
                </p>
              </div>
            </div>
          </NavLink>
          <div className="hidden md:flex justify-center  items-center">
            <ul className="flex space-x-5">
              {!jwt && (
                <>
                  <NavLink to="/register">
                    <li className="group relative inline-block px-6 py-2 rounded-full text-white bg-purple-700  border-2 border-purple-700 font-bold overflow-hidden">
                      <span className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                      <span className="relative z-10">Sign Up</span>
                    </li>
                  </NavLink>
                  <NavLink to="/login">
                    <li className="group relative inline-block px-6  py-2 rounded-full text-purple-700 hover:text-white bg-white  border-2 border-purple-700 font-bold overflow-hidden">
                      <span className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                      <span className="relative z-10">Login</span>
                    </li>
                  </NavLink>
                </>
              )}
              {jwt && <AvatarMenu user={user} jwt={jwt} />}
            </ul>
          </div>
          <div
            className="flex cursor-pointer md:hidden justify-center m-2 items-center"
            onClick={handleToggle}
          >
            <GiHamburgerMenu className="text-2xl" />
          </div>
          {jwt && (
            <div className="md:hidden flex justify-center items-center">
              <AvatarMenu user={user} jwt={jwt} />
            </div>
          )}
        </div>
        {isOpen && (
          <div className="relative md:hidden transition-all duration-400 ease-in-out">
            <div className="flex flex-col justify-center gap-2 py-2 items-center">
              <NavLink
                to="/register"
                className="cursor-pointer w-full flex justify-center py-2 items-center hover:bg-gray-200 transition-colors duration-200 ease-in-out"
              >
                <p>
                  <span className="font-medium text-lg text-orange-500">
                    Sign Up
                  </span>
                </p>
              </NavLink>
              <NavLink
                to="/login"
                className="cursor-pointer w-full flex justify-center py-2 items-center hover:bg-gray-200 transition-colors duration-200 ease-in-out"
              >
                <p>
                  <span className="font-medium text-lg text-blue-500">
                    Login
                  </span>
                </p>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
