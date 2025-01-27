import { debounce, result } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

export const SearchFilter = ({ search, setSearch, refetchData }) => {
  const debouncedRefetch = useCallback(
    debounce(() => refetchData(), 500),
    []
  );

  const departments = ["IT", "Management", "Marketing", "HR"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearch((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : value,
    }));

    debouncedRefetch();
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Search Input */}
      <div className=" flex gap-5">
        <input
          type="search"
          className="w-full sm:w-auto focus:outline-none font-medium p-2 border-2 rounded-md border-slate-300"
          name="query"
          placeholder="Search By Name"
          value={search.query}
          onChange={handleChange}
        />
      </div>

      <div>
        <select
          name="department"
          value={search.department}
          onChange={handleChange}
          className="w-full sm:w-auto focus:outline-none font-medium p-2 border-2 rounded-md border-slate-300"
          id="department"
        >
          <option value="">Select Department</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
