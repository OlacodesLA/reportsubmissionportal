import React from "react";
import { useState, useEffect, Suspense, useRef } from "react";
import axios from "axios";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [remark, setRemark] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [datetime, setDatetime] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadlineDisplay, setdeadlineDisplay] = useState("");

  const deadline = new Date("12/17/2022 16:42");

  //Conversions
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const getTime = () => {
    const time = deadline - new Date();
    console.log(minutes);
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    if (minutes > 0) {
      setdeadlineDisplay("Submit Now! to get your full score");
      setRemark("Full");
    } else if (minutes < 0 && minutes > -15 && seconds < 0 && hours == -1) {
      setdeadlineDisplay("Late Submission 15 marks would be deducted");
      setRemark("-15");
    } else if (minutes <= -15 && minutes > -30 && seconds < 0 && hours == -1) {
      setdeadlineDisplay("Last Submission 30 marks would be deducted");
      setRemark("-30");
    }
    if (minutes <= -30 && minutes > -45 && seconds < 0 && hours == -1) {
      setdeadlineDisplay("Late Submission 45 marks would be deducted");
      setRemark("-45");
    } else if (minutes <= -45 && minutes > -60 && seconds < 0 && hours == -1) {
      setdeadlineDisplay("Late Submission 60 marks would be deducted");
      setRemark("-60");
    } else if (hours <= -2) {
      setdeadlineDisplay(
        "Deadline has been exceeded! You cant submit any longer"
      );
    }

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const getDateTime = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() +
      1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    return setDatetime(date);
  };

  useEffect(() => {
    getDateTime();
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://api.netlify.com/api/v1/sites/e9eeed89-10e2-4d37-8e00-e2f4825edefc/submissions",
        {
          headers: {
            Authorization: "bearer RLwDCXYUD-QRtKvxK3ZQluZjE7MwAWaZqrvyRFoDN08",
          },
        }
      );
      setStudents(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  //Get Current Posts
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="lg:flex">
      <div className="flex xl:px-40 px-10 justify-center items-center bg-white">
        <div className="w-80">
          <form
            name="report"
            encType="multipart/form-data"
            method="POST"
            data-netlify="true"
            className="bg-white"
          >
            <input type="hidden" name="form-name" value="report" />
            <h1 className="">{deadlineDisplay}</h1>

            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
              {/* <Suspense fallback="null">{date}</Suspense> */}
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              {days} Days : {hours} Hours : {minutes} Minutes : {seconds}{" "}
              Seconds
            </p>
            <input type="hidden" name="datetime" value={datetime} />
            <input type="hidden" name="remark" value={remark} />
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
              onClick={getDateTime}
            >
              Submit
            </button>
            {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span> */}
          </form>
        </div>
      </div>
      <div className="relative overflow-hidden  w-full h-full bg-gradient-to-tr from-blue-800 to-purple-700 i ">
        <div>
          <div className="h-screen flex flex-col justify-center items-center px-10 rounded-lg">
            <Table students={currentStudents} loading={loading} />
            <Pagination
              studentsPerPage={studentsPerPage}
              totalStudents={students.length}
              paginate={paginate}
            />
          </div>
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
