import Script from "next/script";
import React, { useEffect } from "react";
import exportFromJSON from "export-from-json";

const dashboard = () => {
  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];

  const ExporttoCSV = (data) => {
    const fileName = "download";
    const exportType = "csv";
    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <div>
      <button onClick={ExporttoCSV}>ok</button>
    </div>
  );
};

export default dashboard;
