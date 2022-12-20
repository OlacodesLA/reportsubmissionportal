import React from "react";

const Pagination = ({ studentsPerPage, totalStudents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex justify-center gap-2 text-xs font-medium pt-2">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className="text-white hover:text-blue-700 hover:bg-white cursor-pointer rounded-md"
        >
          <a
            // href="!#"
            className="block h-8 w-8 rounded-md border border-gray-100 text-center  leading-8"
            onClick={() => paginate(number)}
          >
            {number}
          </a>
        </li>
      ))}
      {/* <li className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
        2
      </li> */}
    </ul>
  );
};

export default Pagination;
