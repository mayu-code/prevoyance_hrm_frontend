import { star } from "../../../components/ui/Utils";

export const EducationDetails = ({
  educationList,
  setEducationList,
  page,
  setPage,
  handleSubmit,
  errors,
  setErrors,
}) => {
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...educationList];
    updatedList[index][name] = value;
    setEducationList(updatedList);
  };

  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        college: "",
        field: "",
        passingYear: "",
        marksInPercent: "",
        additionalNote: "",
      },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        {educationList.map((education, index) => (
          <div
            key={index}
            className="border p-4 mb-4 grid grid-cols-4 gap-5 rounded-md shadow-sm bg-gray-50"
          >
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Degree/University {star}
              </label>
              <input
                type="text"
                name="degree"
                value={education.degree}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Degree"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                College {star}
              </label>
              <input
                type="text"
                name="college"
                value={education.college}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="College"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Field {star}
              </label>
              <input
                type="text"
                name="field"
                value={education.field}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Field"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Passing Year {star}
              </label>
              <input
                type="text"
                name="passingYear"
                value={education.passingYear}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Year"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Marks (%) {star}
              </label>
              <input
                type="text"
                name="marksInPercent"
                value={education.marksInPercent}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Marks in Percent"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Note
              </label>
              <textarea
                type="text"
                name="additionalNote"
                rows="3"
                value={education.additionalNote}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Additional Note"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {educationList.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="mt-3 text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddEducation}
            className="py-[5px] text-lg px-8 bg-white border border-gray-300 text-blue-500 rounded-md"
          >
            Add More
          </button>
        </div>
        <div className="w-[80%] mx-auto flex justify-center items-center gap-5">
          <div>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="py-[5px] text-lg px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Previous
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="py-[5px] text-lg px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
