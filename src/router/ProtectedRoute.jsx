import { useEffect } from "react";
import { useState } from "react";
import { initializeUser } from "./initiallizer/Initiallize";
import { useSelector } from "react-redux";
import Loader from "../components/ui/Loader";
import { Navigate, Outlet } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { Sidebar } from "../components/ui/Sidebar";
import { getUserFromCookie } from "../cookies/UserCookie";

export const ProtectedRoute = ({ allowedRoles }) => {
  const [user1, setUser1] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const jwtToken = localStorage.getItem("jwt");

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // const data = useSelector((state) => state.userReducer.user);

  const data = getUserFromCookie();

  useEffect(() => {
    if (jwtToken) {
      initializeUser(jwtToken, data, setIsLoading, setUser1);
    } else {
      setIsLoading(false);
    }
  }, [jwtToken]);

  if (isLoading) return <Loader />;

  // console.log(user1);

  if (!user1) {
    localStorage.removeItem("jwt");
    return <Navigate to="/login" replace={true} />;
  }

  // console.log(user1);

  // Handle role-based routing
  if (user1) {
    return allowedRoles.includes(user1.role) ? (
      <section className="flex md:static min-h-[calc(100vh-5.5rem)] bg-gray-200">
        <div
          onClick={handleToggle}
          className="absolute top-20 z-40 cursor-pointer md:hidden m-2"
        >
          <HiMenuAlt2 className="text-2xl" />
        </div>
        <div
          className={`absolute md:fixed md:left-0 ${
            isOpen ? "block z-50" : "hidden"
          } md:inline-block md:w-[6%] h-lvh`}
        >
          <Sidebar
            user={user1}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleClick={handleToggle}
          />
        </div>
        <div className="md:w-[95%] md:ml-[7%]">
          <Outlet />
        </div>
      </section>
    ) : (
      <Navigate to="/" replace />
    );
  }

  return <Navigate to="/" replace />;
};
