import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Timer from "./Timer";
import Chat from "./chat";

const Questionpage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resetHint, setResetHint] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const roll_no = queryParams.get("roll_no");
  const dateUnix = Date.now();
  const date = new Date(dateUnix);
  const hr = ("0" + date.getHours()).slice(-2);
  const min = ("0" + date.getMinutes()).slice(-2);
  const sec = ("0" + date.getSeconds()).slice(-2);
  const curtime = `${hr}:${min}:${sec}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://hci-analysis.software/api/questions/");   
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          const shuffledQuestions = [...response.data].sort(() => Math.random() - 0.5);
          setQuestions(shuffledQuestions);
        } else {
          console.error("F.");
          fetchData();
        }
      } catch (error) {
        console.error("err", error);
      }
    };
  
    fetchData();
  }, []);
  const question = questions[currentQuestionIndex];
  const totalQuestionCount = questions.length;
  const currentQuestionPercent =
    ((currentQuestionIndex + 1) / totalQuestionCount) * 100;

  const handleOptionClick = (option, index) => {
    let va = "A";
    if (index == 1) {
      va = "B";
    } else if (index == 2) {
      va = "C";
    } else if (index == 3) {
      va = "D";
    }
    const pageno = JSON.stringify(currentQuestionIndex + 1);

    const details = { user: roll_no, action: va, page: pageno, time: curtime };

    axios
      .post("https://hci-analysis.software/api/unprompted/", details)
      .then((response) => {
        setSelectedOption(option);
      })
      .catch((error) => {
        console.error("Error while making the Axios request:", error);
      });
    setSelectedOption(option);
  };

  const isContinueDisabled = !selectedOption || !question;
  const handleContinue = () => {
    const pageno = JSON.stringify(currentQuestionIndex + 1);
    axios
      .post("https://hci-analysis.software/api/unprompted/", {
        user: roll_no,
        action: "Continue",
        page: pageno,
        time: curtime,
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error while making the Axios request:", error);
      });
    if (!isContinueDisabled && question) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedOption(null);
        setResetHint((prev) => !prev);
      }
    }
  };

  const handleNext = () => {
    const pageno = JSON.stringify(currentQuestionIndex + 1);
    axios
      .post("https://hci-analysis.software/api/unprompted/", {
        user: roll_no,
        action: "End",
        page: pageno,
        time: curtime,
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error while making the Axios request:", error);
      });
      navigate(`/feedback?roll_no=${roll_no}`);
  };

  return (
    <div className="h-screen w-screen sm:w-full divide-y divide-solid overflow-y-auto">
      <div className="h-4/5 flex flex-col lg:flex-row overflow-y-auto">
        <div className="w-full lg:w-2/3 px-4 overflow-y-auto max-h-[600px]">
          <div className="box-border p-4 text-lg text-blue-texts py-10">
            Q.{currentQuestionIndex + 1} {question && question.question}
          </div>
          <div className="flex flex-col p-4 space-y-7 ">
            {question &&
              question.op1 &&
              [question.op1, question.op2, question.op3, question.op4].map(
                (option, index) => (
                  <Button
                    key={index}
                    className={`border border-blue-texts w-32 text-black p-4 rounded-lg text-sm ${
                      selectedOption === option
                        ? "bg-hover-color text-white"
                        : "hover:bg-hover-color hover:text-white"
                    }`}
                    onClick={() => handleOptionClick(option, index)}
                  >
                    {option}
                  </Button>
                )
              )}
          </div>
        </div>
        <div className="sm:w-full lg:w-1/3 bg-blue-50 lg:h-auto overflow-y-auto">
          <div className="h-10 bg-blue-texts w-full flex justify-center text-white">
            AI/ChatGPT Help
          </div>
          <div
            className="bg-blue-50 p-4 box sm:max-h-[calc(100vh - 210px)] sm:overflow-auto"
            style={{ whiteSpace: "break-spaces" }}
          >
            <Chat
              text={question && question.misleading_suggestion}
              resetHint={resetHint}
            />
          </div>
        </div>
      </div>

      <div className="h-1/5 px-12">
        <div className="h-5"></div>
        <div className="text-blue-texts">
          {currentQuestionIndex + 1 + "/" + totalQuestionCount}
        </div>
        <div className="h-1 w-full bg-gray-300">
          <div
            style={{ width: `${currentQuestionPercent}%` }}
            className={`h-full bg-blue-texts`}
          ></div>
        </div>
        <div className="flex justify-center">
          <div className="text-blue-texts">
            Time remaining :&nbsp;
            <Timer />
            <div className="flex justify-normal items-center h-20">
              <div>
                {currentQuestionIndex + 1 != totalQuestionCount && (
                  <Button
                    className={`text-white bg-blue-texts rounded-full p-4 w-32 justify-items-end text-sm ${
                      isContinueDisabled ? "bg-gray-400 cursor-not-allowed" : ""
                    }`}
                    onClick={handleContinue}
                    disabled={isContinueDisabled}
                  >
                    Continue
                  </Button>
                )}
                {currentQuestionIndex + 1 == totalQuestionCount && (
                  <Button
                    className={`text-white bg-blue-texts rounded-full p-4 w-32 justify-items-end text-sm ${
                      isContinueDisabled ? "bg-gray-400 cursor-not-allowed" : ""
                    }`}
                    onClick={handleNext}
                    disabled={isContinueDisabled}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Questionpage;
