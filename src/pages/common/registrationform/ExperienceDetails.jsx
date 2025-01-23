import { star } from "../../../components/ui/Utils";

export const ExperienceDetails = ({
  experienceList,
  setExperienceList,
  page,
  setPage,
  handleSubmit,
  errors,
  setErrors,
}) => {
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index][name] = value;
    setExperienceList(updatedList);
  };

  const handleAddExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        companyName: "",
        designation: "",
        duration: "",
        annualCTC: "",
        offerLetter: "",
        salarySlip: "",
        reasonOfLeaving: "",
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const updatedList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedList);
  };

  const handleFileChange = (index, e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
      const updatedList = [...experienceList];
      updatedList[index][name] = null;
      setExperienceList(updatedList);
      return;
    }

    if (file.size > 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [name]: "File size exceeds 1 MB.",
      }));
      const updatedList = [...experienceList];
      updatedList[index][name] = null;
      setExperienceList(updatedList);
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
      reader.onloadend = () => {
        const updatedList = [...experienceList];
        updatedList[index][name] = reader.result;
        setExperienceList(updatedList);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        {experienceList.map((experience, index) => (
          <div
            key={index}
            className="border p-4 mb-4 grid grid-cols-3 gap-5 rounded-md shadow-sm bg-gray-50"
          >
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Company Name {star}
              </label>
              <input
                type="text"
                name="companyName"
                value={experience.companyName}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Company Name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Designation {star}
              </label>
              <input
                type="text"
                name="designation"
                value={experience.designation}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Designation"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Duration {star}
              </label>
              <input
                type="text"
                name="duration"
                value={experience.duration}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Duration (e.g., 2 years)"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Annual CTC (in ₹) {star}
              </label>
              <input
                type="text"
                name="annualCTC"
                value={experience.annualCTC}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Annual CTC"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Offer Letter {star}
              </label>
              <input
                type="file"
                name="offerLetter"
                onChange={(e) => handleFileChange(index, e)}
                placeholder="Offer Letter"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.offerLetter && (
                <p className="text-red-500 text-sm">{errors.offerLetter}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Salary Slip {star}
              </label>
              <input
                type="file"
                name="salarySlip"
                onChange={(e) => handleFileChange(index, e)}
                placeholder="Salary Slip"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.salarySlip && (
                <p className="text-red-500 text-sm">{errors.salarySlip}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Reason for Leaving
              </label>
              <textarea
                type="text"
                name="reasonOfLeaving"
                rows="3"
                value={experience.reasonOfLeaving}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Reason for Leaving"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {experienceList.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
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
            onClick={handleAddExperience}
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
