import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import { User } from "../App";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { jobs } from "./Jobs";
import { addAppliedJob } from "./slices/JobSlice";

export default function ApplyForm() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const currentJob = jobs.find((item) => item.id.toString() === id.toString());
  const dispatch = useDispatch();
  const { profile } = useContext(User);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: [],
    skillInput: "",
    coverLetter: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (formData.skillInput.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skillInput],
        skillInput: "",
      });
    }
  };

  const handleStep2Button = () => {
    if (formData.name === "") {
      alert("Please complete the form");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email");
      return;
    }
    if (isNaN(Number(formData.phone)) || formData.phone.length < 10) {
      alert("Enter a valid number");
      return;
    }
    setStep(2);
  };

  const handleStep3Button = () => {
    if (formData.experience === "") {
      alert("Please add experience");
      return;
    }
    if (isNaN(formData.experience)) {
      alert("Pease add expeirence in numbers only");
      return;
    }
    setStep(3);
  };

  const handleSaveApplication = () => {
    dispatch(
      addAppliedJob({
        jobId: currentJob.id,
        applicantName: profile.userName,
        experience: formData.experience,
        skills: formData.skills,
        coverLetter: formData.coverLetter,
        startDate: formData.startDate,
        title: currentJob.title,
        brief: currentJob.brief,
      })
    );
  };

  const handleStep4Button = () => {
    if (formData.coverLetter === "") {
      alert("Cover letter cant be blank!!");
      return;
    }
    const today = new Date();
    const selected = new Date(formData.startDate);
    if (selected < today) {
      alert("Please enter future date only!!");
      return;
    }
    setStep(4);
  };

  const handleSubmit = () => {
    handleSaveApplication();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      skills: [],
      skillInput: "",
      coverLetter: "",
      startDate: "",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 p-6 relative">
        <h1 className="text-3xl font-bold mb-6">Job Application</h1>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Step 1: Personal Information
            </h2>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-3"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded mb-3"
            />

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:cursor-pointer"
              onClick={() => handleStep2Button()}
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Step 2: Experience</h2>

            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of Experience"
              className="w-full p-2 border rounded mb-3"
            />

            {/* Add multiple skills */}
            <div className="flex gap-2 mb-3">
              <input
                name="skillInput"
                value={formData.skillInput}
                onChange={handleChange}
                placeholder="Add a skill"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={addSkill}
                className="bg-green-600 text-white px-3 py-2 rounded hover:cursor-pointer"
              >
                Add
              </button>
            </div>

            {formData.skills.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {formData.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-gray-300 px-2 py-1 rounded text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                onClick={() => handleStep3Button()}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Step 3: Additional Information
            </h2>

            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Cover Letter"
              className="w-full p-2 border rounded mb-3"
              rows={4}
            />

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                onClick={() => handleStep4Button()}
              >
                Proceed
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-semibold m-2">Application summary</h2>
            <p>
              <span className="font-semibold m-2">Name: </span>
              {formData.name}
            </p>
            <p>
              <span className="font-semibold m-2">Email: </span>
              {formData.email}
            </p>
            <p>
              <span className="font-semibold m-2">Phone: </span>
              {formData.phone}
            </p>
            <p>
              <span className="font-semibold m-2">Experience: </span>
              {formData.experience}
            </p>
            <p>
              <span className="font-semibold m-2">Skills: </span>
              {formData.skills}
            </p>
            <p>
              <span className="font-semibold m-2">Cover letter: </span>
              {formData.coverLetter}
            </p>
            <p>
              <span className="font-semibold m-2">Start date: </span>
              {formData.startDate}
            </p>

            <div className="flex justify-between mt-2">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                onClick={() => setStep(3)}
              >
                Edit Application
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        <Link to={"/applications"}>
          <div
            className={`fixed bottom-12 right-2 p-2 bg-green-500
             rounded text-white shadow-lg transition-opacity duration-700
            ${submitted ? "opacity-100" : "opacity-0"}
          `}
          >
            Application submitted
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
