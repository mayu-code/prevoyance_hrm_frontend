import React, { useState } from "react";
import OnboardingForm from "../onboarding/OnboardingForm";
import { PulseLoader } from "../../../components/ui/Loader/Loaders";
import { EmployeeDetails } from "../employeeDetails/EmployeeDetails";

export const EmployeeTable = ({
  employees,
  selectedEmployees,
  setSelectedEmployees,
  isLoading,
  refetchEmployees,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Handle row click to open the onboarding form
  const handleRowClick = (candidate) => {
    setSelectedId(candidate.id);
    setShowDetail(true);
  };

  // Handle checkbox change for individual employees
  const handleCheckboxChange = (candidateId) => {
    if (selectedEmployees.includes(candidateId)) {
      setSelectedEmployees(
        selectedEmployees.filter((id) => id !== candidateId)
      );
    } else {
      setSelectedEmployees([...selectedEmployees, candidateId]);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(employees.map((candidate) => candidate.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-300">
            {/* <th className="py-2 px-4 text-left border border-gray-200">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedEmployees.length === employees?.length &&
                  employees?.length > 0
                }
              />
            </th> */}
            <th className="py-2 px-4 text-left border border-gray-200">ID</th>
            <th className="py-2 px-4 text-left border border-gray-200">
              First Name
            </th>
            <th className="py-2 px-4 text-left border border-gray-200">
              Last Name
            </th>
            <th className="py-2 px-4 text-left border border-gray-200">
              Email
            </th>
            <th className="py-2 px-4 text-left border border-gray-200">
              Mobile
            </th>
            <th className="py-2 px-4 text-left border border-gray-200">
              Department
            </th>
            <th className="py-2 px-4 text-left border border-gray-200">
              Position
            </th>
            <th className="py-2 px-4 text-left border border-gray-200">Role</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="py-10 text-center">
                <PulseLoader />
              </td>
            </tr>
          ) : employees?.length === 0 ? (
            <tr>
              <td colSpan="8" className="py-10 text-center text-gray-500">
                No Employees Found
              </td>
            </tr>
          ) : (
            employees?.map((candidate) => (
              <tr
                key={candidate.id}
                className="bg-white text-gray-800 hover:bg-blue-50 hover:cursor-pointer"
              >
                {/* <td className="py-2 px-4 border border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(candidate.id)}
                    onChange={() => handleCheckboxChange(candidate.id)}
                  />
                </td> */}
                <td
                  className="py-2 px-4 border border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.id}
                </td>
                <td
                  className="py-2 px-4 border border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.firstName}
                </td>
                <td
                  className="py-2 px-4 border border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.lastName}
                </td>
                <td
                  className="py-2 px-4 border border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.email}
                </td>
                <td
                  className="py-2 px-4 border border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.mobileNo}
                </td>
                <td
                  className="py-2 px-4 border border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.department}
                </td>
                <td
                  className="py-2 px-4 border border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.position}
                </td>
                <td
                  className="py-2 px-4 border font-medium border-gray-200"
                  onClick={() => handleRowClick(candidate)}
                >
                  {candidate.role}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Onboarding Form Modal */}
      {showDetail && (
        <EmployeeDetails
          showModal={showDetail}
          setShowModal={setShowDetail}
          id={selectedId}
          refetchEmployees={refetchEmployees}
        />
      )}
    </div>
  );
};
