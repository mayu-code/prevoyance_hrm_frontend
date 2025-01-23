export const selectTitle = (page) => {
  switch (page) {
    case 1:
      return <h1 className="text-xl font-bold">Personal Details</h1>;
    case 2:
      return <h1 className="text-xl font-bold">Bank Details</h1>;
    case 3:
      return <h1 className="text-xl font-bold">Professional Details</h1>;
    case 4:
      return <h1 className="text-xl font-bold">Education Details</h1>;
    case 5:
      return <h1 className="text-xl font-bold">Experience Details</h1>;
    default:
      return <h1 className="text-xl font-bold">Registration Form</h1>;
  }
};
