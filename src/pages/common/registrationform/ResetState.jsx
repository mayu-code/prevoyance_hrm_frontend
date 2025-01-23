const initialPersonalInfo = {
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
};

const initialBankInfo = {
  bankName: "",
  bankAccountNo: "",
  ifscCode: "",
  panNo: "",
  uanNo: "",
};

const initialProfessionalInfo = {
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
};

const initialEducationList = [
  {
    degree: "",
    college: "",
    field: "",
    passingYear: "",
    marksInPercent: "",
    additionalNote: "",
  },
];

const initialExperienceList = [
  {
    companyName: "",
    designation: "",
    duration: "",
    annualCTC: "",
    offerLetter: "",
    salarySlip: "",
    reasonOfLeaving: "",
  },
];

export const resetStates = (
  setPersonalInfo,
  setEducationList,
  setExperienceList,
  setProfessionalInfo,
  setBankInfo
) => {
  setPersonalInfo(initialPersonalInfo);
  setEducationList(initialEducationList);
  setExperienceList(initialExperienceList);
  setProfessionalInfo(initialProfessionalInfo);
  setBankInfo(initialBankInfo);
};
