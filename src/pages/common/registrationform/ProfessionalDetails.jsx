import { star } from "../../../components/ui/Utils";

export const ProfessionalDetails = ({
  professionalInfo,
  setProfessionalInfo,
  page,
  setPage,
  handleSubmit,
  errors,
  setErrors,
}) => {
  const {
    totalExperience,
    location,
    hireSource,
    position,
    department,
    skills,
    highestQualification,
    currentSalary,
    joiningDate,
    additionalInfo,
    offerLetter,
  } = professionalInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // validateFields(name, value);
    setProfessionalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setErrors((prev) => ({
        ...prev,
        offerLetter: "",
      }));
      setProfessionalInfo((prevData) => ({
        ...prevData,
        offerLetter: null,
      }));
      return;
    }

    if (file) {
      const maxSizeInBytes = 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setErrors((prev) => ({
          ...prev,
          offerLetter: "File size exceeds 1 MB.",
        }));
        setProfessionalInfo((prevData) => ({
          ...prevData,
          offerLetter: null,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          offerLetter: "",
        }));
        reader.onloadend = () => {
          setProfessionalInfo((prevData) => ({
            ...prevData,
            offerLetter: reader.result,
          }));
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="totalExperience">Experience {star}</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="totalExperience"
                  name="totalExperience"
                  value={totalExperience}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.totalExperience && (
                  <p className="text-red-500 text-sm">
                    {errors.totalExperience}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="hireSource">Source Of Hire {star}</label>
              <div className="mt-2">
                <input
                  type="hireSource"
                  id="hireSource"
                  name="hireSource"
                  value={hireSource}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.hireSource && (
                  <p className="text-red-500 text-sm">{errors.hireSource}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="position">Position {star} </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={position}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm">{errors.position}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="department">Department {star} </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={department}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.department && (
                  <p className="text-red-500 text-sm">{errors.department}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="skills">skill {star}</label>
              <div className="mt-2">
                <textarea
                  id="skills"
                  name="skills"
                  rows="3"
                  value={skills}
                  onChange={handleChange}
                  className={` py-1 px-4 w-full bg-gray-200 border-2 rounded-md focus:outline-none`}
                ></textarea>
                {errors.skills && (
                  <p className="text-red-500 text-sm">{errors.skills}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="highestQualification">
                Highest Qualification {star}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="highestQualification"
                  name="highestQualification"
                  value={highestQualification}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.highestQualification && (
                  <p className="text-red-500 text-sm">
                    {errors.highestQualification}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="currentSalary">Current Salary {star} </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="currentSalary"
                  name="currentSalary"
                  value={currentSalary}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.currentSalary && (
                  <p className="text-red-500 text-sm">{errors.currentSalary}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="joiningDate">Joining Date {star} </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={joiningDate}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.joiningDate && (
                  <p className="text-red-500 text-sm">{errors.joiningDate}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="offerLetter">Offer Letter {star} </label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {errors.offerLetter && (
                  <p className="text-red-500 text-sm">{errors.offerLetter}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="additionalInfo">Additional Info</label>
              <div className="mt-2">
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows="3"
                  value={additionalInfo}
                  onChange={handleChange}
                  className={` py-1 px-4 w-full bg-gray-200 border-2 rounded-md focus:outline-none`}
                ></textarea>
                {errors.additionalInfo && (
                  <p className="text-red-500 text-sm">
                    {errors.additionalInfo}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-center items-center gap-10">
            <div className="col-span-2"></div>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="py-[5px] text-lg px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Previous
            </button>
            <button
              type="submit"
              className="py-[5px] text-lg px-8 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
