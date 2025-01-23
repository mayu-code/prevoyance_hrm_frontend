import { useState } from "react";
import { FaUser } from "react-icons/fa"; // You can use a library like react-icons for the user icon
import { defaultPic } from "./ProfilePic";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/slice/UserSlice";
import { useDispatch } from "react-redux";
import { MdSpaceDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { selectRoute } from "../../api/service/RouteRedirectionService/RoutesRedireactionAvatar";

const AvatarMenu = ({ user, jwt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      if (jwt) {
        localStorage.removeItem("jwt");
        dispatch(deleteUser());
        navigate("/login");
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (action) => {
    // Handle the action like profile, settings, or logout

    const route = selectRoute(user?.role, action);

    navigate(route);

    setIsMenuOpen(false); // Close menu after selection
  };

  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        className="flex selection:no-underline gap-2 cursor-pointer"
      >
        <div className="flex justify-center items-center">
          <img
            src={user?.image || defaultPic}
            alt="image"
            className="w-10 rounded-full"
          />
        </div>
        <div className="hidden md:flex justify-center items-center ">
          <p>{user?.name}</p>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute right-2 md:-right-10 mt-2 w-36 p-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="text-gray-700">
            <li
              className="px-4 py-2 hover:text-blue-600 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleMenuItemClick("dashboard")}
            >
              <div className="flex items-center gap-2">
                <MdSpaceDashboard />
                Dashboard
              </div>
            </li>
            <li
              className="px-4 py-2  hover:text-blue-600 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleMenuItemClick("profile")}
            >
              <div className="flex items-center gap-2">
                <FaUser />
                Profile
              </div>
            </li>
            <li
              className="px-4 py-2  hover:text-red-600 hover:bg-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2">
                <IoLogOut />
                Logout
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
