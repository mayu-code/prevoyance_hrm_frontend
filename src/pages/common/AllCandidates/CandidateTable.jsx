import React, { useState } from "react";
import OnboardingForm from "../onboarding/OnboardingForm";
import { PulseLoader } from "../../../components/ui/Loader/Loaders";

export const CandidateTable = ({
  candidates,
  selectedCandidates,
  setSelectedCandidates,
  isLoading,
  refetchCandidates,
  user,
}) => {
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [onboardingData, setOnboardingData] = useState(null);

  // Handle row click to open the onboarding form
  const handleRowClick = (candidate) => {
    // if(user?.role==="SUPERADMIN")
    setOnboardingData({
      id: candidate.id,
      name: `${candidate.firstName} ${candidate.lastName}`,
      email: candidate.email,
      position: candidate.position,
      department: candidate.department,
    });
    setShowOnboardingForm(true);
  };

  // Handle checkbox change for individual candidates
  const handleCheckboxChange = (candidateId) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCandidates(candidates.map((candidate) => candidate.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full  table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-300">
            <th className="py-2 px-4 text-left border border-gray-200">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedCandidates.length === candidates?.length &&
                  candidates?.length > 0
                }
              />
            </th>
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
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8" className="py-10 text-center">
                <PulseLoader />
              </td>
            </tr>
          ) : candidates?.length === 0 ? (
            <tr>
              <td colSpan="8" className="py-10 text-center text-gray-500">
                No Candidates Found
              </td>
            </tr>
          ) : (
            candidates?.map((candidate) => (
              <tr
                key={candidate.id}
                className="bg-white text-gray-800 hover:bg-blue-50 hover:cursor-pointer"
              >
                <td className="py-2 px-4 border border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleCheckboxChange(candidate.id)}
                  />
                </td>
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
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Onboarding Form Modal */}
      {showOnboardingForm && (
        <OnboardingForm
          showModal={showOnboardingForm}
          setShowModal={setShowOnboardingForm}
          preFilledData={onboardingData}
          refetchCandidates={refetchCandidates}
        />
      )}
    </div>
  );
};
