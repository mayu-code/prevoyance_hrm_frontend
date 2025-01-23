import { useState } from "react";
import { star } from "../../../components/ui/Utils";

export const PersonalDetails = ({
  personalInfo,
  setPersonalInfo,
  page,
  setPage,
  handleSubmit,
  errors,
  setErrors,
}) => {
  const {
    email,
    firstName,
    lastName,
    mobileNo,
    emgMobileNo,
    officialEmail,
    dob,
    adharNo,
    image,
    presentAddress,
    permanentAddress,
  } = personalInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // validateFields(name, value);
    setPersonalInfo((prev) => ({
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
        image: "",
      }));
      setPersonalInfo((prevData) => ({
        ...prevData,
        image: null,
      }));
      return;
    }

    if (file) {
      const maxSizeInBytes = 600 * 1024;
      if (file.size > maxSizeInBytes) {
        setErrors((prev) => ({
          ...prev,
          image: "File size exceeds 600KB. Please upload a smaller image.",
        }));
        setPersonalInfo((prevData) => ({
          ...prevData,
          image: null,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          image: "",
        }));
        reader.onloadend = () => {
          setPersonalInfo((prevData) => ({
            ...prevData,
            image: reader.result,
          }));
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const validateFields = (name, value) => {
    let newErrors = { ...errors };

    const checkInteger = (input) => {
      if (/^\d*$/.test(input)) return true;
      else return false;
    };

    const validateIFSC = (value) => {
      return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);
    };

    if (name === "name" && !value) newErrors.name = "Name is Required";
    else if (name === "email" && value === "")
      newErrors.email = "Email is Required";
    else if (name === "fatherName" && !value)
      newErrors.fatherName = "father name is Required";
    else if (name === "mobileNo" && !value)
      newErrors.mobileNo = "mobile number is Required";
    else if (name === "mobileNo" && !checkInteger(value))
      newErrors.mobileNo = "enter valid mobile number";
    else if (name === "mobileNo" && value.length !== 10)
      newErrors.mobileNo = "mobile number should be 10 digit";
    else if (name === "emgMobileNo" && !value)
      newErrors.emgMobileNo = "emergency mobile number is Required";
    else if (name === "emgMobileNo" && !checkInteger(value))
      newErrors.emgMobileNo = "enter valid mobile number";
    else if (name === "emgMobileNo" && value.length !== 10)
      newErrors.emgMobileNo = "mobile number should be 10 digit";
    else if (name === "bankAccountNo" && !value)
      newErrors.bankAccountNo = "Bank Account number is Required";
    else if (name === "bankAccountNo" && !checkInteger(value))
      newErrors.bankAccountNo = "enter valid bank Account number";
    else if (name === "ifscCode" && !value)
      newErrors.ifscCode = "ifsc code is Required";
    else if (name === "ifscCode" && !validateIFSC(value))
      newErrors.ifscCode = "enter valid ifsc code";
    else if (name === "presentAddress" && !value)
      newErrors.presentAddress = "present address is Required";
    else if (name === "permanentAddress" && !value)
      newErrors.permanentAddress = "permanent address is Required";
    else if (name === "position" && !value)
      newErrors.position = "Position is Required";
    else delete newErrors[name];

    setErrors(newErrors);
  };

  const [checkbox, setCheckbox] = useState(false);

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox);
    if (!checkbox) personalInfo.permanentAddress = presentAddress;
    else personalInfo.permanentAddress = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="firstName">First Name {star}</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lastName">Last Name {star}</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email">Email {star}</label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="mobileNo">Mobile No {star} </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  value={mobileNo}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-sm">{errors.mobileNo}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="emgMobileNo">Emergency Mobile No</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="emgMobileNo"
                  name="emgMobileNo"
                  value={emgMobileNo}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.emgMobileNo && (
                  <p className="text-red-500 text-sm">{errors.emgMobileNo}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="officialEmail">Official Email</label>
              <div className="mt-2">
                <input
                  type="email"
                  id="officialEmail"
                  name="officialEmail"
                  value={officialEmail}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.officialEmail && (
                  <p className="text-red-500 text-sm">{errors.officialEmail}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="adharNo">Adhar No {star} </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="adharNo"
                  name="adharNo"
                  value={adharNo}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.adharNo && (
                  <p className="text-red-500 text-sm">{errors.adharNo}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="dob">DOB {star} </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dob}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <div className="mt-2">
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="presentAddress">Present Address {star} </label>
              <div className="mt-2">
                <textarea
                  id="presentAddress"
                  name="presentAddress"
                  rows="3"
                  value={presentAddress}
                  onChange={handleChange}
                  className={` py-1 px-4 w-full bg-gray-200 border-2 rounded-md focus:outline-none`}
                ></textarea>
                {errors.presentAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.presentAddress}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={checkbox}
                  onChange={handleCheckboxChange}
                />
                <p>Same as the present address</p>
              </div>
            </div>

            <div>
              <label htmlFor="localAddress">Permanent Address {star}</label>
              <div className="mt-2">
                <textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  rows="3"
                  disabled={checkbox}
                  value={permanentAddress}
                  onChange={handleChange}
                  className={`py-1 px-4 w-full bg-gray-200 border-2 rounded-md focus:outline-none`}
                ></textarea>
                {errors.permanentAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.permanentAddress}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center items-center">
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
