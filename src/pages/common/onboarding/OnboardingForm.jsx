import React, { useEffect, useState } from "react";
import { onboardEmployeeService } from "../../../api/service/managerService/managerService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserFromCookie } from "../../../cookies/UserCookie";
import { selectRoute } from "../../../api/service/RouteRedirectionService/RoutesRedireactionAvatar";

const OnboardingForm = ({
  showModal,
  setShowModal,
  preFilledData,
  refetchCandidates,
}) => {
  const [formValues, setFormValues] = useState({
    id: preFilledData?.id || "",
    email: preFilledData?.email || "",
    name: preFilledData?.name || "",
    role: "",
    position: preFilledData.position || "",
    department: preFilledData.department || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const user = getUserFromCookie();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { department, name, position, ...payload } = formValues;

    console.log("Onboarding Form Values:", payload);

    const res = await onboardEmployeeService(payload);

    alert(res?.message);

    setShowModal(false); // Close modal after submission

    const route = selectRoute(user?.role, "all-employees");

    navigate(route);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg transition-transform transform">
            <h2 className="text-2xl font-bold mb-4">Onboarding Candidate</h2>
            <form onSubmit={handleSubmit}>
              {/* Pre-filled fields */}
              <div className="p-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formValues.id}
                    onChange={handleInputChange}
                    className="w-full h-8 p-2 border-gray-300 rounded shadow-sm"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="w-full  h-8 p-2 border-gray-300 rounded shadow-sm"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="w-full  h-8 p-2 border-gray-300 rounded shadow-sm"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formValues.position}
                    onChange={handleInputChange}
                    className="w-full  h-8 p-2 border-gray-300 rounded shadow-sm"
                    disabled
                  />
                </div>

                {/* Role Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formValues.role}
                    onChange={handleInputChange}
                    className="w-full h-10 focus:outline-none p-2 border-gray-300 rounded shadow-sm"
                    required
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="HRManager">HR Manager</option>
                    <option value="HRExecutive">HR Executive</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingForm;
