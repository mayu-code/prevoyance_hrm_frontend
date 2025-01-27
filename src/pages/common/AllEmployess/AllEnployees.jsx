import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EmployeeTable } from "./EmployeeTable";
import { getAllEmployeeService } from "../../../api/service/managerService/managerService";
import { SearchFilter } from "../searchFilter/SearchFilter";

export const AllEmployees = () => {
  const paramReq = {
    query: undefined,
    department: undefined,
  };

  const [search, setSearch] = useState(paramReq);

  const {
    data: employees,
    refetch: refetchEmployees,
    isLoading,
  } = useQuery({
    queryKey: ["employees", search],
    queryFn: async () => {
      return await getAllEmployeeService(search);
    },
  });

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/user/hr-manager/registration");
  };

  // Handle Submit Selected Employees
  const handleSubmit = () => {
    console.log(selectedEmployees);
    setSelectedEmployees([]);
    // Add further actions, such as sending IDs to an API
  };

  return (
    <div className="bg-white mt-3 mx-auto container p-6 flex flex-col gap-4">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        refetchData={refetchEmployees}
      />

      {/* Trigger Button */}
      {/* <div className="flex justify-between">
        <div className="flex gap-4 justify-start">
          {selectedEmployees.length > 0 && (
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
      </div> */}

      <EmployeeTable
        employees={employees}
        selectedEmployees={selectedEmployees}
        setSelectedEmployees={setSelectedEmployees}
        isLoading={isLoading}
      />
    </div>
  );
};
