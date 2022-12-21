import React from "react";
import { useState, useEffect, Suspense, useRef } from "react";
import axios from "axios";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useSession, signOut } from "next-auth/react";
import { useRouter, Router } from "next/router";
import { LoginContext, ThankContext } from "../components/Context";
import CsvDownloadButton from "react-json-to-csv";
import exportFromJSON from "export-from-json";
import { fetchData } from "next-auth/client/_utils";
import Deadline from "../components/Deadline";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [submit, setsubmit] = useState(true);
  const [download, setdownload] = useState([]);
  const [remark, setRemark] = useState("");
  const [removeTimer, setRemoveTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [datetime, setDatetime] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadlineDisplay, setdeadlineDisplay] = useState("");

  const deadline = new Date("12/21/2022 12:00");

  //Conversions
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const getTime = () => {
    const time = deadline - new Date();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    if (minutes > 0) {
      setRemoveTimer(false);
      setRemark("Full");
      setsubmit(true);
    } else if (
      minutes < 0 &&
      minutes > -15 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 15 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-5");
      setsubmit(true);
    } else if (
      minutes <= -15 &&
      minutes > -30 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 30 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-10");
      setsubmit(true);
    }
    if (
      minutes <= -30 &&
      minutes > -45 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 45 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-15");
      setsubmit(true);
    } else if (
      minutes <= -45 &&
      minutes > -60 &&
      seconds < 0 &&
      hours == -1 &&
      days == -1
    ) {
      setdeadlineDisplay("Late Submission 60 marks would be deducted");
      setRemoveTimer(false);
      setRemark("-20");
      setsubmit(true);
    } else if (hours <= -2) {
      setdeadlineDisplay(
        "Deadline has been exceeded! You cant submit any longer"
      );
      setRemoveTimer(true);
      setsubmit(false);
    } else if (days < -1) {
      setdeadlineDisplay(
        "Deadline has been exceeded! You can't submit any longer"
      );
      setsubmit(false);
      setRemoveTimer(true);
    }

    console.log(days);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  //Get Current Date and Time

  const getDateTime = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() +
      1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    return setDatetime(date);
  };
  //Session
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    getDateTime();

    //Fetch Submission Data from the API
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
      let downloads = res.data;
      let downloadData = downloads.map((download) => {
        let down = download.data;
        const {
          FullName,
          Matric,
          Section,
          datetime,
          remark,
          ReportFile,
        } = down;

        return {
          Name: FullName,
          Matric: Matric,
          Section: Section,
          DateTime: datetime,
          Remark: remark,
          ReportFile: ReportFile.url,
        };
      });
      setdownload(downloadData);
      console.log(download);
    };

    fetchData();
  }, []);

  const data = download;

  //Exports to CSV file

  const ExporttoCSV = () => {
    const fileName = "reportsubmitions";
    const exportType = "csv";

    exportFromJSON({ data, fileName, exportType });
  };
  const ExporttoXLS = () => {
    const fileName = "reportsubmissions";
    const exportType = "xls";

    exportFromJSON({ data, fileName, exportType });
  };

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
    <div className="lg:flex lg:flex-row flex-col-reverse">
      <div className="flex xl:px-40 px-10 justify-center items-center bg-white">
        <div className="w-80">
          <div className="absolute top-10 ">
            <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#4900EE] to-indigo-600 drop-shadow-2xl">
              Report Submission Portal
            </h1>
            <h1 className="font-bold text-xl shadow-red-500">ECE 504</h1>
            <div className="flex flex-col">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className=" w-36 relative inline-flex items-center justify-center p-2 px-2 py-0 mt-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-700 rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#4900EE] to-indigo-600 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-indigo-700 transition-all duration-300 transform group-hover:translate-x-full ease text-sm">
                    Admin SignOut
                  </span>
                  <span className="relative invisible">Admin SignOut</span>
                </button>
              ) : (
                <button
                  onClick={() => router.push("api/auth/signin")}
                  className="w-36 relative inline-flex items-center justify-center p-2 px-2 py-0 mt-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-indigo-700 rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#4900EE] to-indigo-600 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-indigo-700 transition-all duration-300 transform group-hover:translate-x-full ease text-sm">
                    Admin SignIn
                  </span>
                  <span className="relative invisible">Admin SignIn</span>
                </button>
              )}
              {session ? (
                <div className="flex md:flex-row flex-col">
                  <button
                    onClick={ExporttoCSV}
                    class="w-56 mt-3 rounded relative inline-flex group items-center justify-center px-1 py-1 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
                  >
                    <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10 "></span>
                    <span class="relative text-sm">
                      Export Submission as CSV
                    </span>
                  </button>
                  <button
                    onClick={ExporttoXLS}
                    class="w-56 md:mt-3 mt-1  rounded relative inline-flex group items-center justify-center px-1 py-1 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white"
                  >
                    <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10 "></span>
                    <span class="relative text-sm">
                      Export Submission as XLS
                    </span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <form
            name="report"
            action="/thankyou"
            encType="multipart/form-data"
            method="POST"
            data-netlify="true"
            className="bg-white md:pt-40 pt-56"
          >
            <input type="hidden" name="form-name" value="report" />
            <ThankContext.Provider value={{ deadlineDisplay }}>
              <Deadline />
            </ThankContext.Provider>

            {removeTimer ? null : (
              <div className="w-full py-3 flex justify-center">
                <span className="flex gap-6">
                  <span className="flex justify-center items-center flex-col w-10 h-10 bg-gradient-to-r from-[#4900EE] to-indigo-600 rounded-lg">
                    <p id="days" className="text-base text-white">
                      {days}
                    </p>
                    <p className="text-[10px] text-white">Days</p>
                  </span>
                  <span className="flex justify-center items-center flex-col w-10 h-10 bg-gradient-to-r from-[#4900EE] to-indigo-600 rounded-lg">
                    <p id="hours" className="text-base text-white">
                      {hours}
                    </p>
                    <p className="text-[10px] text-white">Hours</p>
                  </span>
                  <span className="flex justify-center items-center flex-col w-10 h-10 bg-gradient-to-r from-[#4900EE] to-indigo-600 rounded-lg">
                    <p id="minutes" className="text-base text-white">
                      {minutes}
                    </p>
                    <p className="text-[10px] text-white">Minutes</p>
                  </span>
                  <span className="flex justify-center items-center flex-col w-10 h-10 bg-gradient-to-r from-[#4900EE] to-indigo-600 rounded-lg">
                    <p id="seconds" className="text-base text-white">
                      {seconds}
                    </p>
                    <p className="text-[10px] text-white">Seconds</p>
                  </span>
                </span>
              </div>
            )}
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
              disabled={submit ? false : true}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="relative overflow-hidden h-90  w-full md:h-full bg-gradient-to-tr from-blue-800 to-purple-700 i ">
        <div className="">
          <div className="h-screen flex flex-col md:justify-center pt-20 md:pt-0 justify-start items-center px-10 rounded-lg">
            <div className="w-full flex md:flex-row flex-col justify-between">
              <h1 className="w-full md:pb-20 text-lg  font-bold flex items-center md:justify-start md:text-start text-white drop-shadow-lg">
                List of students who has submitted
              </h1>
              <h1 className="w-full pb-20 text-base md:text-lg font-bold flex items-center md:justify-end md:text-end text-white drop-shadow-lg">
                Number of student who has submitted : {students.length}
              </h1>
            </div>
            <LoginContext.Provider
              value={{ students: currentStudents, loading }}
            >
              <Table />
            </LoginContext.Provider>
            <Pagination
              studentsPerPage={studentsPerPage}
              totalStudents={students.length}
              paginate={paginate}
            />
          </div>
        </div>
        <div className="absolute -bottom-32 text-gray border-gray-300 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 border-gray-300 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 text-gray-300 border-gray-300 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 border-gray-300 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      {/* <div className="absolute flex justify-center w-screen">
        <div className=" bg-white mx-10 px-6 py-2  mt-5 rounded-lg ">
          <h1 className="text-gray-900 text-2xl font-bold text-center">
            REPORT SUBMISSION PORTAL
          </h1>
          <h1 className="text-gray-900 pt-4 text-2xl font-bold text-center">
            ECE 504
          </h1>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
