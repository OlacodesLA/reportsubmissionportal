// import Table from "../components/Table";
// import React, { useState } from "react";
// export default function Home() {
//   const [fullName, setFullName] = useState("");
//   const [matric, setMatric] = useState("");
//   const [students, setStudents] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (fullName && matric) {
//       const student = { fullName, matric };
//       setStudents((students) => {
//         return [...students, student];
//       });
//       console.log(students);
//       setFullName("");
//       setMatric("");
//     } else {
//       console.log("empty values");
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-center ">
//         <article>
//           <form
//             className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
//             action=""
//             onSubmit={handleSubmit}
//           >
//             <label className="font-semibold text-xs" for="fullNameField">
//               Full Name
//             </label>
//             <input
//               className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
//               type="text"
//               id="fullNameField"
//               name="FullName"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />

//             <label className="font-semibold text-xs mt-3" for="matricField">
//               Matric Number
//             </label>
//             <input
//               className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
//               type="text"
//               name="MatricNumber"
//               id="matricField"
//               value={matric}
//               onChange={(e) => setMatric(e.target.value)}
//             />

//             <label className="font-semibold text-xs mt-3" for="matricField">
//               Upload Report
//             </label>
//             <input
//               className="flex items-center px-4 w-64 mt-2 rounded focus:outline-none focus:ring-2"
//               type="file"
//               name="Report"
//               id="matricField"
//             />
//             <button
//               type="submit"
//               className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </form>
//         </article>
//       </div>
//       <div>
//         <div>
//           <div className="flex flex-col">
//             <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//               <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
//                 <div className="overflow-hidden">
//                   <table className="min-w-full text-center">
//                     <thead className="border-b bg-gray-800">
//                       <tr>
//                         <th
//                           scope="col"
//                           className="text-sm font-medium text-white px-6 py-4"
//                         >
//                           #
//                         </th>
//                         <th
//                           scope="col"
//                           className="text-sm font-medium text-white px-6 py-4"
//                         >
//                           First
//                         </th>
//                         <th
//                           scope="col"
//                           className="text-sm font-medium text-white px-6 py-4"
//                         >
//                           Last
//                         </th>
//                         <th
//                           scope="col"
//                           className="text-sm font-medium text-white px-6 py-4"
//                         >
//                           Handle
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {students.map((student, index) => {
//                         const { id, fullName, matric } = student;
//                         return (
//                           <tr key={index} className="bg-white border-b">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                               1
//                             </td>
//                             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
//                               {fullName}
//                             </td>
//                             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
//                               {matric}
//                             </td>
//                             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
//                               @mdo
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const Home = () => {
  return (
    <form>
      <div className="flex justify-center ">
        <article>
          <form
            className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
            action=""
            name="report"
            enctype="multipart/form-data"
            method="POST"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="report" />

            <label className="font-semibold text-xs" for="fullNameField">
              Full Name
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="text"
              id="fullNameField"
              name="FullName"
            />

            <label className="font-semibold text-xs mt-3" for="matricField">
              Matric Number
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="text"
              name="MatricNumber"
              id="matricField"
            />

            <label className="font-semibold text-xs mt-3" for="reportUpload">
              Upload Report
            </label>
            <input
              className="flex items-center px-4 w-64 mt-2 rounded focus:outline-none focus:ring-2"
              type="file"
              name="ReportFile"
              id="reportUpload"
            />
            <button
              type="submit"
              className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </article>
      </div>
    </form>
  );
};

export default Home;
