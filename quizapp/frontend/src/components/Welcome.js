import * as React from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const dateUnix = Date.now();
const date = new Date(dateUnix);
const hr = ("0" + date.getHours()).slice(-2);
const min = ("0" + date.getMinutes()).slice(-2);
const sec = ("0" + date.getSeconds()).slice(-2);
const curtime = `${hr}:${min}:${sec}`;

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roll_no = queryParams.get("roll_no");

  const handleStart = () => {
    navigate(`/question?roll_no=${roll_no}`);

    axios
      .post("https://hci-analysis.software/api/unprompted/", {
        user: roll_no,
        action: "Start",
        page: 0,
        time: curtime,
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error while making the Axios request:", error);
      });
  };

  return (
    <div className="lg:flex lg:flex-row">
      <div className="lg:w-2/3">
        <div className="h-full flex flex-col justify-center items-center text-blue-texts font-thefont gap-y-3 p-8 lg:p-16">
          <div>
            <p className="text-center text-3xl lg:text-7xl">
              Welcome to Amrita Summer Internship Selection process!
            </p>
            <p className="pt-10 px-6 lg:px-10 text-center text-xl lg:text-3xl">
              We welcome you to the selection process for Amrita Summer
              Internship Program. This assessment will enable us to test
              everyone’s knowledge and recruit the eligible candidates for the
              internship. Before you dive into the assessment, please do follow
              the dos and don’ts of the quiz.
            </p>
            <p className="text-center text-xl lg:text-3xl pb-10">
              All the best!
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              className="text-white bg-blue-texts rounded-full p-4 mb-10 text-base lg:text-sm"
              onClick={handleStart}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 bg-right-blue lg:order-first lg:h-screen">
        <div className="flex flex-col justify-center p-8 lg:p-16 py-12 lg:py-40 font-thefont text-white text-lg lg:text-2xl">
          <div className="mb-8">
            <h2 className="text-xl lg:text-5xl font-bold mb-4">
              Do's and Don'ts
            </h2>
            <div className="mb-4">
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Do's:</h3>
              <ul className="list-disc pl-4">
                <li>Read Questions Carefully</li>
                <li>Answer Every Question</li>
                <li>Manage Your Time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Don'ts:</h3>
              <ul className="list-disc pl-4">
                <li>Don't Cheat</li>
                <li>Don't Discuss Answers During the Exam</li>
                <li>Don't Leave Questions Blank</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
