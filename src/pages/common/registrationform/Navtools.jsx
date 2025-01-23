import { IoDocumentOutline } from "react-icons/io5";

export const Navtools = ({ page, setPage }) => {
  const navs = [
    {
      id: 1,
      icon: IoDocumentOutline,
      label: "Personal Details",
      page: 1,
    },
    {
      id: 2,
      icon: IoDocumentOutline,
      label: "Bank Details",
      page: 2,
    },
    {
      id: 3,
      icon: IoDocumentOutline,
      label: "Professional Details",
      page: 3,
    },
    {
      id: 4,
      icon: IoDocumentOutline,
      label: "Education Details",
      page: 4,
    },
    {
      id: 5,
      icon: IoDocumentOutline,
      label: "Experience Details",
      page: 5,
    },
  ];

  const handleClick = (page) => {
    setPage(page);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[100%]">
        <ul className="flex justify-around px-6 py-5 rounded-lg bg-white">
          {navs?.map((nav) => {
            return (
              <li
                key={nav.id}
                onClick={() => handleClick(nav.page)}
                className="flex flex-col justify-center items-center gap-2 cursor-pointer"
              >
                <div
                  className={`${
                    page === nav.page ? "bg-blue-500" : "bg-blue-100"
                  } p-3  rounded-full`}
                >
                  <nav.icon
                    className={`${
                      page === nav.page ? "text-blue-100" : "text-blue-600"
                    } `}
                  />
                </div>
                <p className="font-medium">{nav.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
