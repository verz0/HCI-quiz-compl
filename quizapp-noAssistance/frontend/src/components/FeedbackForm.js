import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionCounter, setQuestionCounter] = useState(1);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // State to track if all questions are answered
  const options = ["A", "B", "C", "D", "E"];
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
        const response = await axios.get(
          "https://hci-analysis.software/api/feedback/"
        );
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setQuestions(response.data);
          const initialSelectedOptions = {};
          response.data.forEach((question) => {
            initialSelectedOptions[question.id] = null;
          });
          setSelectedOptions(initialSelectedOptions);
        } else {
          console.error("No questions found.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check if all questions are answered
    const answeredQuestions = Object.values(selectedOptions).filter(
      (option) => option !== null
    );
    setAllQuestionsAnswered(answeredQuestions.length === questions.length);
  }, [selectedOptions, questions]);

  const handleOptionSelect = (questionId, optionIndex) => {
    const selectedOption = options[optionIndex];
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const feedbackData = {
          user: roll_no,
          action: selectedOptions[question.id],
          set: 3,
          time: curtime,
          page: `Question ${i + 1}`,
        };
        await axios.post(
          "https://hci-analysis.software/api/feedbackans/",
          feedbackData
        );
      }

      navigate("/thankyou");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-5 bg-gradient-to-b from-blue-texts to-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto sm:h-30 h-5/6 border border-blue-texts p-6 rounded-lg bg-white md:w-1/2 overflow-y-auto"
      >
        <div className="flex justify-center items-center mb-10 text-3xl text-blue-texts">
          Feedback Form
        </div>
        <div className="flex flex-col p-4 space-y-7 ">
          {questions.map((question, index) => (
            <div key={question.id}>
              {/* {console.log(question)} */}
              <p>
                Q.{questionCounter + index}. {question.questions}
              </p>
              <div className="space-y-2">
                {options.map((option, optionIndex) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      checked={
                        selectedOptions[question.id] === options[optionIndex]
                      }
                      onChange={() =>
                        handleOptionSelect(question.id, optionIndex)
                      }
                      className="mr-2"
                    />
                    <label>
                      {option === "A"
                        ? question.option1
                        : option === "B"
                        ? question.option2
                        : option === "C"
                        ? question.option3
                        : option === "D"
                        ? question.option4
                        : question.option5}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={!allQuestionsAnswered} // Disable the button if all questions are not answered
          className={`text-white mb-10 bg-blue-texts hover:bg-[#4999c4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full py-2.5 text-center ${
            !allQuestionsAnswered ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
