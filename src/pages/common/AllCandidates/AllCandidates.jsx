import React from "react";
import { CandidateTable } from "./CandidateTable";
import { useNavigate } from "react-router-dom";

export const AllCandidates = () => {
  const candidates = [
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      mobile: "262223521",
      department: "IT",
      position: "Software Engineer",
    },
  ];

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/user/hr-executive/registration");
  };

  return (
    <div className="bg-white mt-3 mx-auto container p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          onClick={handleButtonClick}
          className="text-white bg-blue-500 px-4 py-2 rounded-md"
        >
          Add Candidate
        </button>
      </div>

      <CandidateTable candidates={candidates} />
    </div>
  );
};
