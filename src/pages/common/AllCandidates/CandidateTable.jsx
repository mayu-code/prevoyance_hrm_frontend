import React from "react";

export const CandidateTable = ({ candidates }) => {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-blue-300">
          <th className="py-2 px-4 text-left border border-gray-200">ID</th>
          <th className="py-2 px-4 text-left border border-gray-200">
            First Name
          </th>
          <th className="py-2 px-4 text-left border border-gray-200">
            Last Name
          </th>
          <th className="py-2 px-4 text-left border border-gray-200">Email</th>
          <th className="py-2 px-4 text-left border border-gray-200">Mobile</th>
          <th className="py-2 px-4 text-left border border-gray-200">
            Department
          </th>
          <th className="py-2 px-4 text-left border border-gray-200">
            Position
          </th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => (
          <tr
            key={candidate.id}
            className="bg-white text-gray-800 hover:bg-blue-50 hover:cursor-pointer"
          >
            <td className="py-2 px-4 border border-gray-200">{candidate.id}</td>
            <td className="py-2 px-4 border border-gray-200">
              {candidate.firstName}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {candidate.lastName}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {candidate.email}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {candidate.mobile}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {candidate.department}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {candidate.position}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
