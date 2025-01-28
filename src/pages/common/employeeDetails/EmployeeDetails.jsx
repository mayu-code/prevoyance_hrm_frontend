import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import {
  getEmployeeDetailService,
  updatePersonalDetailService,
} from "../../../api/service/adminService/AdminService";
import { defaultPic } from "../../../components/ui/ProfilePic";

export const EmployeeDetails = ({
  showModal,
  setShowModal,
  id,
  refetchEmployees,
}) => {
  const [employee, setEmployee] = useState(null);
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      const data = await getEmployeeDetailService(id);
      setEmployee(data);
      setEditedEmployee({
        id: data.id,
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        image: "",
        email: data?.email || "",
        officialEmail: data?.officialEmail || "",
        mobileNo: data?.mobileNo || "",
        emgMobileNo: data?.emgMobileNo || "",
        dob: data?.dob || "",
        adharNo: data?.adharNo || "",
        presentAddress: data?.presentAddress || "",
        permanentAddress: data?.permanentAddress || "",
      });
    };
    if (id) fetchEmployee();
  }, [id, isPersonalEditing]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
      setEditedEmployee((prevData) => ({
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
        setEditedEmployee((prevData) => ({
          ...prevData,
          image: null,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          image: "",
        }));
        reader.onloadend = () => {
          setEditedEmployee((prevData) => ({
            ...prevData,
            image: reader.result,
          }));
        };

        reader.readAsDataURL(file);
      }
    }
  };

  console.log(employee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = () => {
    setEditedEmployee({
      firstName: employee?.firstName || "",
      lastName: employee?.lastName || "",
      email: employee?.email || "",
      officialEmail: employee?.officialEmail || "",
      mobileNo: employee?.mobileNo || "",
      emgMobileNo: employee?.emgMobileNo || "",
      dob: employee?.dob || "",
      adharNo: employee?.adharNo || "",
      presentAddress: employee?.presentAddress || "",
      permanentAddress: employee?.permanentAddress || "",
    });
  };

  // console.log(employee);

  const handleEditClick = () => {
    setIsPersonalEditing(!isPersonalEditing);
  };

  const handleSaveClick = async () => {
    try {
      // setEmployee(updatedData);
      console.log(editedEmployee);

      const res = await updatePersonalDetailService(editedEmployee);

      alert(res?.message);

      setIsPersonalEditing(false); // Exit editing mode
      // setShowModal(false);
      refetchEmployees();
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };

  if (!employee) return null;

  return (
    <div className="fixed inset-0 flex top-16 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white flex flex-col gap-6 w-full max-w-[96%] max-h-[92%] p-8 rounded shadow-lg overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Employee Details</h2>
          <ImCross
            className="cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setShowModal(false)}
          />
        </div>
        <hr />

        <div className="overflow-y-auto">
          {/* <div className="w-[90%] flex justify-end">
            <div className="w-40 h-40 flex-shrink-0">
              <img
                src={employee.image || defaultPic}
                alt="Employee"
                className="w-full h-full object-cover rounded-lg border border-gray-300"
              />
            </div>
          </div> */}

          {/* Personal Information */}
          <div>
            <div className="flex gap-5">
              <h3 className="font-semibold text-lg mb-4">
                Personal Information
              </h3>
              <div>
                <button
                  onClick={handleEditClick}
                  className={`${
                    isPersonalEditing ? "bg-red-500" : "bg-blue-500"
                  } px-4 py-2  rounded-md text-white`}
                >
                  {isPersonalEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>
            <div className="flex mt-5 justify-between flex-wrap">
              <div className="w-full md:w-[75%]">
                <table className="table-auto w-full text-sm text-left">
                  <tbody>
                    <tr className="py-3">
                      <td className="font-medium px-4 py-2">Name:</td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="flex flex-col gap-3">
                            <input
                              type="text"
                              name="firstName"
                              value={editedEmployee.firstName}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                            <input
                              type="text"
                              name="lastName"
                              value={editedEmployee.lastName}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.firstName} ${employee.lastName}`
                        )}
                      </td>
                      <td className="font-medium px-4 py-2">Email:</td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <input
                              type="email"
                              name="email"
                              value={editedEmployee.email}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.email}`
                        )}
                      </td>
                    </tr>

                    <tr className="py-3">
                      <td className="font-medium px-4 py-2">Official Email:</td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <input
                              type="email"
                              name="officialEmail"
                              value={editedEmployee.officialEmail}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.officialEmail}`
                        )}
                      </td>
                      {isPersonalEditing && (
                        <>
                          <td className="font-medium px-4 py-2">Image:</td>
                          <td className="px-4 py-2">
                            <div className="w-full">
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                              />
                              {errors.image && (
                                <p className="text-red-500 text-sm">
                                  {errors.image}
                                </p>
                              )}
                            </div>
                          </td>
                        </>
                      )}
                    </tr>

                    <tr className="py-3">
                      <td className="font-medium px-4 py-2">Mobile No:</td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <input
                              type="text"
                              name="mobileNo"
                              value={editedEmployee.mobileNo}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.mobileNo}`
                        )}
                      </td>
                      <td className="font-medium px-4 py-2">
                        Emergency Mobile No:
                      </td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <input
                              type="text"
                              name="emgMobileNo"
                              value={editedEmployee.emgMobileNo}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.emgMobileNo}`
                        )}
                      </td>
                    </tr>

                    <tr className="py-3">
                      <td className="font-medium px-4 py-2">DOB:</td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <input
                              type="date"
                              name="dob"
                              value={editedEmployee.dob}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.dob}`
                        )}
                      </td>
                      <td className="font-medium px-4 py-2">Aadhar No:</td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <input
                              type="text"
                              name="adharNo"
                              value={editedEmployee.adharNo}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.adharNo}`
                        )}
                      </td>
                    </tr>

                    <tr className="py-3">
                      <td className="font-medium px-4 py-2">
                        Present Address:
                      </td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <textarea
                              name="presentAddress"
                              value={editedEmployee.presentAddress}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.presentAddress}`
                        )}
                      </td>
                      <td className="font-medium px-4 py-2">
                        Permanent Address:
                      </td>
                      <td className="px-4 py-2">
                        {isPersonalEditing ? (
                          <div className="w-full">
                            <textarea
                              name="permanentAddress"
                              value={editedEmployee.permanentAddress}
                              onChange={handleInputChange}
                              className="border-2 border-x-white border-b-gray-300 w-full border-t-white focus:outline-none focus:border-b-blue-500 p-2 rounded-sm"
                            />
                          </div>
                        ) : (
                          `${employee.permanentAddress}`
                        )}
                      </td>
                    </tr>

                    <tr className="py-3">
                      <td className="font-medium px-4 py-2">Role:</td>
                      <td className="px-4 py-2">{employee.role}</td>
                      <td className="font-medium px-4 py-2">Status:</td>
                      <td className="px-4 py-2">
                        {employee.active ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-full md:w-[25%] mt-5 md:mt-0">
                <div className="w-40 ml-24 h-40">
                  <img
                    src={employee.image || defaultPic}
                    alt="Employee"
                    name="image"
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                  />
                </div>
              </div>
            </div>

            {isPersonalEditing && (
              <div className="mt-5 flex justify-end  w-[74%]">
                <button
                  onClick={handleSaveClick}
                  className="px-10 py-2 text-lg bg-green-500 rounded-md text-white"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div>
            {/* Professional Details */}
            <h3 className="font-semibold text-lg mb-4">Professional Details</h3>
            <table className="table-auto w-full text-sm text-left">
              <tbody>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">Total Experience:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.totalExperience}
                  </td>
                  <td className="font-medium px-4 py-2">Position:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.position}
                  </td>
                </tr>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">Department:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.department}
                  </td>
                  <td className="font-medium px-4 py-2">Location:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.location}
                  </td>
                </tr>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">Skills:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.skills}
                  </td>
                  <td className="font-medium px-4 py-2">
                    Highest Qualification:
                  </td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.highestQualification}
                  </td>
                </tr>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">Current Salary:</td>
                  <td className="px-4 py-2">
                    ₹{employee.professionalDetail.currentSalary}
                  </td>
                  <td className="font-medium px-4 py-2">Joining Date:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.joiningDate}
                  </td>
                </tr>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">Hire Source:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.hireSource}
                  </td>
                  <td className="font-medium px-4 py-2">Additional Info:</td>
                  <td className="px-4 py-2">
                    {employee.professionalDetail.additionalInfo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            {/* Bank Details */}
            <h3 className="font-semibold text-lg mb-4 mt-6">Bank Details</h3>
            <table className="table-auto w-full text-sm text-left">
              <tbody>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">Bank Name:</td>
                  <td className="px-4 py-2">{employee.bankDetails.bankName}</td>
                  <td className="font-medium px-4 py-2">Account No:</td>
                  <td className="px-4 py-2">
                    {employee.bankDetails.bankAccountNo}
                  </td>
                </tr>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">IFSC Code:</td>
                  <td className="px-4 py-2">{employee.bankDetails.ifscCode}</td>
                  <td className="font-medium px-4 py-2">PAN No:</td>
                  <td className="px-4 py-2">{employee.bankDetails.panNo}</td>
                </tr>
                <tr className="py-3">
                  <td className="font-medium px-4 py-2">UAN No:</td>
                  <td className="px-4 py-2">{employee.bankDetails.uanNo}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Education Details */}
          <div>
            <h3 className="font-semibold text-lg mb-4 mt-6">
              Education Details
            </h3>
            <table className="table-auto w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="font-medium px-4 py-2">Degree</th>
                  <th className="font-medium px-4 py-2">College</th>
                  <th className="font-medium px-4 py-2">Field</th>
                  <th className="font-medium px-4 py-2">Passing Year</th>
                </tr>
              </thead>
              <tbody>
                {employee.educationDetails.map((edu) => (
                  <tr key={edu.id} className="even:bg-gray-50 border-b">
                    <td className="px-4 py-3">{edu.degree}</td>
                    <td className="px-4 py-3">{edu.college}</td>
                    <td className="px-4 py-3">{edu.field}</td>
                    <td className="px-4 py-3">{edu.passingYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Experience Details */}
          <div>
            <h3 className="font-semibold text-lg mb-4 mt-6">
              Experience Details
            </h3>
            <table className="table-auto w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="font-medium px-4 py-2">Company</th>
                  <th className="font-medium px-4 py-2">Designation</th>
                  <th className="font-medium px-4 py-2">Duration</th>
                  <th className="font-medium px-4 py-2">Annual CTC</th>
                </tr>
              </thead>
              <tbody>
                {employee.experienceDetail.map((exp) => (
                  <tr key={exp.id} className="even:bg-gray-50 border-b">
                    <td className="px-4 py-3">{exp.companyName}</td>
                    <td className="px-4 py-3">{exp.designation}</td>
                    <td className="px-4 py-3">{exp.duration}</td>
                    <td className="px-4 py-3">{exp.annualCTC}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
