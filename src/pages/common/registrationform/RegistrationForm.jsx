import { useState } from "react";
import { selectTitle } from "./TitleSelector";
import { EducationDetails } from "./EducationDetails";
import { ExperienceDetails } from "./ExperienceDetails";
import { addEmloyeeService } from "../../../api/service/executiveService/executiveService";
import { resetStates } from "./ResetState";
import { PersonalDetails } from "./PersonalDetails";
import { BankDetails } from "./BankDetails";
import { ProfessionalDetails } from "./ProfessionalDetails";
import { Navtools } from "./Navtools";

export const RegistrationForm = () => {
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);

  const [personalInfo, setPersonalInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    emgMobileNo: "",
    officialEmail: "",
    dob: "",
    adharNo: "",
    image: "",
    presentAddress: "",
    permanentAddress: "",
  });

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankAccountNo: "",
    ifscCode: "",
    panNo: "",
    uanNo: "",
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    totalExperience: "",
    location: "",
    hireSource: "",
    position: "",
    department: "",
    skills: "",
    highestQualification: "",
    currentSalary: "",
    joiningDate: "",
    additionalInfo: "",
    offerLetter: "",
  });

  const [educationList, setEducationList] = useState([
    {
      degree: "",
      college: "",
      field: "",
      passingYear: "",
      marksInPercent: "",
      additionalNote: "",
    },
  ]);

  const [experienceList, setExperienceList] = useState([
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

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    // console.log(personalInfo);

    setPage((prev) => prev + 1);
  };

  const handleBankInfoSubmit = (e) => {
    e.preventDefault();
    // console.log(bankInfo);

    setPage((prev) => prev + 1);
  };

  const handleEducationInfoSubmit = (e) => {
    e.preventDefault();
    // console.log(educationList);

    setPage((prev) => prev + 1);
  };

  const handleProfessionalInfoSubmit = (e) => {
    e.preventDefault();
    // console.log(professionalInfo);

    setPage((prev) => prev + 1);
  };

  const handleExperienceInfoSubmit = async (e) => {
    e.preventDefault();
    // console.log(experienceList);

    const payload = {
      personalDetail: personalInfo,
      educationDetails: educationList,
      professionalDetails: professionalInfo,
      bankDetail: bankInfo,
      experienceDetails: experienceList,
    };

    console.log("final payload: ", payload);

    const res = await addEmloyeeService(payload);

    alert(res?.message);

    resetStates(
      setPersonalInfo,
      setEducationList,
      setExperienceList,
      setProfessionalInfo,
      setBankInfo
    );

    setPage(1);
  };

  return (
    <div>
      <div className="mt-5">
        <Navtools page={page} setPage={setPage} />
      </div>

      <div className="bg-white flex flex-col gap-5 p-10 mt-3 mx-auto container rounded-md">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center items-center">
            {selectTitle(page)}
          </div>

          {page === 1 && (
            <PersonalDetails
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
              page={page}
              setPage={setPage}
              errors={errors}
              setErrors={setErrors}
              handleSubmit={handlePersonalInfoSubmit}
            />
          )}

          {page === 2 && (
            <BankDetails
              bankInfo={bankInfo}
              setBankInfo={setBankInfo}
              page={page}
              setPage={setPage}
              errors={errors}
              setErrors={setErrors}
              handleSubmit={handleBankInfoSubmit}
            />
          )}

          {page === 3 && (
            <ProfessionalDetails
              professionalInfo={professionalInfo}
              setProfessionalInfo={setProfessionalInfo}
              page={page}
              setPage={setPage}
              errors={errors}
              setErrors={setErrors}
              handleSubmit={handleProfessionalInfoSubmit}
            />
          )}

          {page === 4 && (
            <EducationDetails
              educationList={educationList}
              setEducationList={setEducationList}
              page={page}
              setPage={setPage}
              errors={errors}
              setErrors={setErrors}
              handleSubmit={handleEducationInfoSubmit}
            />
          )}

          {page === 5 && (
            <ExperienceDetails
              experienceList={experienceList}
              setExperienceList={setExperienceList}
              page={page}
              setPage={setPage}
              errors={errors}
              setErrors={setErrors}
              handleSubmit={handleExperienceInfoSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
