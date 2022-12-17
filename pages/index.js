import React from "react";
import { useState, useEffect, Suspense } from "react";

const Home = () => {
  const [students, setStudents] = useState([]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() +
    1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  const fetchData = async () => {
    const response = await fetch(
      "https://v1.nocodeapi.com/olacodes/netlify/HxdooGSgqPbqdwqO/listFormSubmissions?form_id=639d06170fb0d600089610a8"
    );
    setStudents(await response.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen md:flex">
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form
          name="report"
          encType="multipart/form-data"
          method="POST"
          data-netlify="true"
          className="bg-white"
        >
          <input type="hidden" name="form-name" value="report" />
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
            <Suspense fallback="null">{date}</Suspense>
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <input type="hidden" name="date/time" value={date} />
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="FullName"
              id=""
              placeholder="Full Name"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="Matric"
              id=""
              placeholder="Matric"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <select
              className="pl-2 outline-none border-none w-full"
              type="text"
              name="Section"
              id=""
              placeholder=""
            >
              <option value="Regular">Regular</option>
              <option value="DirectEntry">Direct Entry</option>
            </select>
          </div>
          <div className="mt-10 relative">
            <p className="mb-2 block text-sm text-center font-medium text-gray-500">
              Upload your Project Report
            </p>
            <input
              type="file"
              className="peer w-full text-sm file:bg-gradient-to-b file:from-indigo-600 file:to-indigo-500 file:px-2 file:py-0 file:m-3 file:border-none file:rounded-full file:text-white file:cursor-pointer file:shadow-lg file:shadow-indigo-600/50 bg-gradient-to-br from-gray-600 to-gray-700 text-white/80 rounded-full cursor-pointer shadow-xl shadow-gray-700/60"
              name="ReportFile"
              id=""
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Submit
          </button>
          {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span> */}
        </form>
      </div>
      <div className="relative overflow-hidden  w-full h-full bg-gradient-to-tr from-blue-800 to-purple-700 i ">
        <div>
          {/* <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p> */}
          <div className="h-screen flex justify-center items-center px-10">
            <table className="w-full  text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    S/N
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Matric
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Section
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Date/Time
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Remark Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  return (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student.data.FullName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student.data.Matric}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student.data.Section}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Nill
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Nill
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button> */}
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
    </div>
  );
};

export default Home;
