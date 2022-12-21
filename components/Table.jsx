import React from "react";
import Pagination from "./Pagination";
import { useContext } from "react";
import { LoginContext } from "./Context";

const Table = () => {
  const { students, loading } = useContext(LoginContext);

  return (
    <table className="w-full text-center z-50 rounded-2xl overflow-scroll">
      <thead className="border-b bg-gray-900 rounded-2xl font-bold text-[10px] sm:text-sm">
        <tr>
          <th scope="col" className=" text-white px-1 sm:px-3 md:px-6 py-4 ">
            S/N
          </th>
          <th scope="col" className="  text-white px-1 sm:px-3 md:px-6 py-4">
            Full Name
          </th>
          <th scope="col" className="  text-white px-1 sm:px-3 md:px-6 py-4">
            Matric
          </th>
          <th scope="col" className=" text-white px-1 sm:px-3 md:px-6 py-4">
            Section
          </th>
          <th scope="col" className="  text-white px-1 sm:px-3 md:px-6 py-4">
            Date/Time
          </th>
          <th scope="col" className=" text-white px-1 sm:px-3 md:px-6 py-4 ">
            Remark Status
          </th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => {
          return (
            <tr
              key={index}
              className="bg-white border-b text-[10px] sm:text-sm "
            >
              <td className="px-1 sm:px-3 md:px-6 py-4 whitespace-nowrap   text-gray-900">
                {index}
              </td>
              <td className=" text-gray-900  px-0 sm:px-3 md:px-6 py-4 whitespace-nowrap">
                {student.data.FullName}
              </td>
              <td className=" text-gray-900  px-0 sm:px-3 md:px-6 py-4 whitespace-nowrap">
                {student.data.Matric}
              </td>
              <td className=" text-gray-900  px-0 sm:px-3 md:px-6 py-4 whitespace-nowrap">
                {student.data.Section}
              </td>
              <td className=" text-gray-900  px-0 sm:px-3 md:px-6 py-4 whitespace-nowrap">
                {student.data.datetime}
              </td>
              <td className=" text-white font-semibold  px-0 sm:px-3 md:px-6 py-4 whitespace-nowrap">
                <span className="bg-gradient-to-r from-[#4900EE] to-indigo-600 py-1 px-2 rounded-lg">
                  {student.data.remark}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
