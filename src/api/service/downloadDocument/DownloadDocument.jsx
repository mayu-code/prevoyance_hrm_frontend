import React from "react";

const DownloadDocument = ({ data }) => {
  const openInNewTab = () => {
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe src="${data}" width="100%" height="100%"></iframe>`
    );
  };

  return (
    <div>
      <button onClick={openInNewTab}>Open PDF in New Tab</button>
    </div>
  );
};

export default DownloadDocument;
