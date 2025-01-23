import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/slice/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUsersLine } from "react-icons/fa6";
import { FaFileUpload, FaUsers, FaUserTimes } from "react-icons/fa";
import { IoLogOut, IoPersonAdd } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { selectRoute } from "../../api/service/RouteRedirectionService/RoutesRedireactionAvatar";

export const Sidebar = ({ user, isOpen, setIsOpen, handleClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      const token = localStorage.getItem("jwt");
      if (token) {
        localStorage.removeItem("jwt");
        dispatch(deleteUser());
        navigate("/login");
      }
    }
  };

  const handleActiveLink = ({ isActive }) => {
    return isActive ? "text-white bg-blue-700" : "text-gray-700 bg-gray-200";
  };

  return (
    <div className=" bg-white rounded-lg mt-2 h-full">
      <div className="py-5 px-5">
        <div onClick={handleClick} className="flex md:hidden justify-end mb-2">
          <RxCross2 className="text-2xl font-bold" />
        </div>
        <div>
          <h1 className="font-bold">H R M</h1>
        </div>
        <div className="mt-5">
          <ul className="flex flex-col gap-4">
            <NavLink
              className={({ isActive }) =>
                `p-3 hover:text-white font-medium  hover:bg-blue-700 rounded-md ${handleActiveLink(
                  { isActive }
                )}`
              }
              to={selectRoute(user?.role, "dashboard")}
            >
              <li className="cursor-pointer">
                <p>
                  <div className="flex justify-center items-center">
                    <MdDashboard size={20} />
                  </div>
                </p>
              </li>
            </NavLink>
            <div className="flex text-sm justify-center -mt-3 items-center">
              Dashboard
            </div>

            <NavLink
              className={({ isActive }) =>
                `p-3 hover:text-white font-medium  hover:bg-blue-700 rounded-md ${handleActiveLink(
                  { isActive }
                )}`
              }
              to={selectRoute(user?.role, "all-candidates")}
            >
              <li className="cursor-pointer">
                <p>
                  <div className="flex text-sm justify-center items-center">
                    <FaUsers size={20} />
                  </div>
                </p>
              </li>
            </NavLink>
            <div className="flex text-sm justify-center -mt-3 items-center">
              Candidates
            </div>

            <li className="cursor-pointer" onClick={handleLogout}>
              <p className="p-3 text-gray-700 bg-gray-200 hover:bg-red-500 px-4 font-medium hover:text-white rounded-md">
                <div className="flex justify-center items-center">
                  <IoLogOut size={20} />
                </div>
              </p>
              <div className="flex text-sm justify-center mt-2 items-center">
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
