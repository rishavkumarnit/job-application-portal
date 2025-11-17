import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import { User } from "../App";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { jobs } from "./Jobs";
import { addAppliedJob } from "./slices/JobSlice";
import useForm from "./UseForm";

export default function ApplyForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile } = useContext(User);

  const currentJob = jobs.find((item) => item.id.toString() === id.toString());

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validations = {
    1: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!emailRegex.test(values.email)) errors.email = "Invalid email";
      if (!values.phone || values.phone.length < 10)
        errors.phone = "Invalid phone number";
      return errors;
    },

    2: (values) => {
      const errors = {};
      if (!values.experience) errors.experience = "Experience required";
      if (isNaN(values.experience))
        errors.experience = "Experience must be a number";
      return errors;
    },

    3: (values) => {
      const errors = {};
      if (!values.coverLetter) errors.coverLetter = "Enter a cover letter";
      if (!values.startDate) errors.startDate = "Select a date";
      if (new Date(values.startDate) < new Date())
        errors.startDate = "Future date only";
      return errors;
    },
  };

  const {
    values: formData,
    setValues: setFormData,
    errors,
    handleChange,
    validateStep,
    resetForm,
  } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      experience: "",
      skills: [],
      skillInput: "",
      coverLetter: "",
      startDate: "",
    },
    validations
  );

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const addSkill = () => {
    if (formData.skillInput.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.skillInput],
        skillInput: "",
      });
    }
  };

  const handleStep2 = () => {
    if (validateStep(1)) setStep(2);
  };

  const handleStep3 = () => {
    if (validateStep(2)) setStep(3);
  };

  const handleStep4 = () => {
    if (validateStep(3)) setStep(4);
  };

  const handleSubmit = () => {
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

    setSubmitted(true);
    resetForm();
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 p-6 relative">
        <h1 className="text-3xl font-bold mb-6">Job Application</h1>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Step 1: Personal Info</h2>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-1"
            />
            {errors.name && <p className="text-red-600 text-sm mb-2">{errors.name}</p>}

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded mb-1"
            />
            {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email}</p>}

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded mb-1"
            />
            {errors.phone && <p className="text-red-600 text-sm mb-2">{errors.phone}</p>}

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
              onClick={handleStep2}
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
              className="w-full p-2 border rounded mb-1"
            />
            {errors.experience && (
              <p className="text-red-600 text-sm mb-2">{errors.experience}</p>
            )}

            {/* Add skills */}
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
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Add
              </button>
            </div>

            {formData.skills.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {formData.skills.map((s, i) => (
                  <span key={i} className="bg-gray-300 px-2 py-1 rounded text-sm">
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleStep3}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Step 3: Additional Info</h2>

            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Cover Letter"
              className="w-full p-2 border rounded mb-1"
              rows={4}
            />
            {errors.coverLetter && (
              <p className="text-red-600 text-sm mb-2">{errors.coverLetter}</p>
            )}

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-1"
            />
            {errors.startDate && (
              <p className="text-red-600 text-sm mb-2">{errors.startDate}</p>
            )}

            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleStep4}
              >
                Proceed
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 SUMMARY */}
        {step === 4 && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-xl font-semibold m-2">Application Summary</h2>

            {Object.entries(formData).map(([key, value]) => (
              key !== "skillInput" && (
                <p key={key}>
                  <span className="font-semibold capitalize">{key}:</span>{" "}
                  {Array.isArray(value) ? value.join(", ") : value}
                </p>
              )
            ))}

            <div className="flex justify-between mt-3">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setStep(3)}
              >
                Edit Application
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* success toast */}
        <Link to={"/applications"}>
          <div
            className={`fixed bottom-12 right-2 p-2 bg-green-500 rounded text-white shadow-lg transition-opacity duration-700 ${
              submitted ? "opacity-100" : "opacity-0"
            }`}
          >
            Application submitted
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
