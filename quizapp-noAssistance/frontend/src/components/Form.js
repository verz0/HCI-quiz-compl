import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BorderForm = () => {
  const navigate = useNavigate();
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const [formData, setFormData] = useState({
    roll_no: "",
    name: "",
    email: "",
    gender:"",
    age:"",
    degree:"",
    uni:"",
    cgpa:"",
    device_dimensions:"",
    consent: false
  });

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  formData.device_dimensions=`${windowWidth.current},${windowHeight.current}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://hci-analysis.software/api/users/", formData)
      .then((response) => {})
      .catch((error) => {
        console.error("Error while making the Axios request:", error);
      });

    navigate(`/Welcome?roll_no=${formData.roll_no}`);
  };

  return (
    <div className="flex justify-center items-center h-screen px-5 bg-gradient-to-b from-blue-texts to-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto sm:h-30 h-5/6 border border-blue-texts p-6 rounded-lg bg-white md:w-1/2 overflow-y-auto"
      >
        <div className="flex justify-center items-center mb-10 text-3xl text-blue-texts">
          Welcome
        </div>
        <div className="flex justify-center items-center mb-10 text-xl text-blue-texts">
          Please enter the following details before getting started
        </div>
        <div className="mb-7">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-blue-texts p-2.5 rounded-md w-full"
            placeholder="enter your name"
            required
          />
        </div>
        <div className="mb-7">
          <label
            htmlFor="roll_no"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            Roll Number
          </label>
          <input
            type="text"
            id="roll_no"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
            className="border border-blue-texts p-2.5 rounded-md w-full"
            placeholder="enter your roll number"
            required
          />
        </div>
        <div className="mb-7">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-blue-texts p-2.5 rounded-md w-full max-w-md" 
            placeholder="am.en.u4cse22001@am.students.amrita.edu"
            required
          />
        </div>
        <div className="mb-7">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            Gender
          </label>
          <div
             className="border border-blue-texts p-2.5 rounded-md w-full flex flex-col items-start gap-2" 
          >
            <label htmlFor="gender-male">
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                style={{ marginRight: "10px" }}
              />
              <span style={{ color: "gray" }}>Male</span>
            </label>
            <label htmlFor="gender-female">
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                style={{ marginRight: "10px" }}
              />
              <span style={{ color: "gray" }}>Female</span>
            </label>
            <label htmlFor="gender-x">
              <input
                type="radio"
                id="gender-x"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
                style={{ marginRight: "10px" }}
              />
              <span style={{ color: "gray" }}>Other</span>
            </label>
          </div>
        </div>
        <div className="mb-7">
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border border-blue-texts p-2.5 rounded-md w-full"
            placeholder="enter your age"
            required
            min={0}
          />
        </div>
        <div className="mb-7">
          <label
            htmlFor="degree"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="border border-blue-texts p-2.5 rounded-md w-full"
            placeholder="enter your degree"
            required
          />
        </div>
        <div className="mb-7">
          <label
            htmlFor="uni"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            University
          </label>
          <input
            type="text"
            id="uni"
            name="uni"
            value={formData.uni}
            onChange={handleChange}
            className="border border-blue-texts p-2.5 rounded-md w-full"
            placeholder="enter your University"
            required
          />
        </div>
        <div className="mb-7">
          <label
            htmlFor="cgpa"
            className="block mb-2 text-sm font-medium text-blue-texts"
          >
            CGPA
          </label>
          <input
            type="number"
            step={0.01}
            id="cgpa"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            className="border border-blue-texts p-2.5 rounded-md w-full"
            placeholder="enter your cgpa"
            required
            min={0}
            pattern="^\d+(\.\d{1,2})?$|^\d$"
            max={10}
          />
        </div>   
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mr-2 "
            style={{marginBottom:"8.7rem"}}
            required
          />
          <label htmlFor="consent" className="text-xs text-blue-texts mb-7">
          We take the protection of your privacy seriously and adhere to strict guidelines to maintain anonymity. No individual-level data will ever be shared outside our research team, ensuring complete confidentiality of all information provided by you. By participating in this survey, you agree to provide honest and accurate responses. Your participation is voluntary, and you may withdraw at any time without penalty. By submitting your completed survey, you are giving us permission to use your responses for research purposes only.
          </label>
        </div>       
        <button
          type="submit"
          className="text-white mb-10 bg-blue-texts hover:bg-[#4999c4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BorderForm;
