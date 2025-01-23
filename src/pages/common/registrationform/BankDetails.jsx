import { useState } from "react";
import { star } from "../../../components/ui/Utils";

export const BankDetails = ({
  bankInfo,
  setBankInfo,
  page,
  setPage,
  handleSubmit,
  errors,
  setErrors,
}) => {
  const { bankName, bankAccountNo, ifscCode, panNo, uanNo } = bankInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // validateFields(name, value);
    setBankInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="bankName">Bank Name {star}</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={bankName}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.bankName && (
                  <p className="text-red-500 text-sm">{errors.bankName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="bankAccountNo">Account No {star}</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="bankAccountNo"
                  name="bankAccountNo"
                  value={bankAccountNo}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.bankAccountNo && (
                  <p className="text-red-500 text-sm">{errors.bankAccountNo}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="ifscCode">IFSC Code {star}</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={ifscCode}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.ifscCode && (
                  <p className="text-red-500 text-sm">{errors.ifscCode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="panNo">PAN {star} </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="panNo"
                  name="panNo"
                  value={panNo}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.panNo && (
                  <p className="text-red-500 text-sm">{errors.panNo}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="uanNo">UAN</label>
              <div className="mt-2">
                <input
                  type="text"
                  id="uanNo"
                  name="uanNo"
                  value={uanNo}
                  onChange={handleChange}
                  className={` p-2 w-full border-gray-300 h-10 font-medium border-2 rounded-md focus:outline-none `}
                />
                {errors.uanNo && (
                  <p className="text-red-500 text-sm">{errors.uanNo}</p>
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
