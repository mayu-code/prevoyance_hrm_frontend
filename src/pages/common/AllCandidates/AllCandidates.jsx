import React, { useState } from "react";
import { CandidateTable } from "./CandidateTable";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllCandidatesService } from "../../../api/service/managerService/managerService";
import { SearchFilter } from "../searchFilter/SearchFilter";
import { getUserFromCookie } from "../../../cookies/UserCookie";
import { selectRoute } from "../../../api/service/RouteRedirectionService/RoutesRedireactionAvatar";

export const AllCandidates = () => {
  const paramReq = {
    query: undefined,
    department: undefined,
  };

  const [search, setSearch] = useState(paramReq);

  const {
    data: candidates,
    refetch: refetchCandidates,
    isLoading,
  } = useQuery({
    queryKey: ["candidates", search],
    queryFn: async () => {
      return await getAllCandidatesService(search);
    },
  });

  const user = getUserFromCookie();

  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    const route = selectRoute(user?.role, "registration");

    navigate(route);
  };

  // Handle Submit Selected Candidates
  const handleSubmit = () => {
    console.log(selectedCandidates);
    setSelectedCandidates([]);
  };

  return (
    <div className="bg-white mt-3 mx-auto container p-6 flex flex-col gap-4">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        refetchData={refetchCandidates}
      />
      {/* Trigger Button */}
      <div className="flex justify-between">
        <div className="flex gap-4 justify-start">
          {selectedCandidates.length > 0 && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleButtonClick}
            className="text-white bg-blue-500 px-4 py-2 rounded-md"
          >
            Add Candidate
          </button>
        </div>
      </div>

      <CandidateTable
        candidates={candidates}
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
        isLoading={isLoading}
        refetchCandidates={refetchCandidates}
        user={user}
      />
    </div>
  );
};
