import React from "react";
import { useParams } from "react-router-dom";
import { jobs } from "./Jobs";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Application = () => {
  const { appliedJobs } = useSelector((state) => state.jobsApplied);
  const { id } = useParams();
  const alreadyApplied = appliedJobs.find((item) => {
    return item.jobId.toString() === id.toString();
  });
  const job = jobs.find((item) => {
    console.log(alreadyApplied);
    return item.id.toString() === id.toString();
  });
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-300 text-[70%] sm:text-[100%] flex flex-col items-center justify-center p-5 font-[Poppins]">
        <div className="bg-gray-400 rounded-xl shadow-lg p-6 sm:p-10 mx-10 sm:mx-52 flex flex-col sm:flex-row gap-1 sm:gap-3">
          <div className="flex-1 flex flex-col justify-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center">
              Application Details
            </h1>
            <p className="text-sm font-semibold sm:text-base">
              {job.companyName}
            </p>
            <p className="text-sm font-semibold sm:text-base">{job.title}</p>
            <p>
              <span className="font-semibold text-lg mt-2">Salary: </span>₹
              {job.salary}
            </p>
            <p>
              <span className="font-semibold text-lg mt-2">Requirement: </span>
              {job.requirement}
            </p>
            <p>
              <span className="font-semibold text-lg mt-2">Description: </span>
              {job.description}
            </p>
            <p>
              <span className="font-semibold text-lg mt-2">Experience shown: </span>
              {alreadyApplied.experience}
            </p>
              <p>
              <span className="font-semibold text-lg mt-2">Skills shown: </span>
              {alreadyApplied.skills}
            </p>
              <p>
              <span className="font-semibold text-lg mt-2">Cover letter added: </span>
              {alreadyApplied.coverLetter}
            </p>
              <p>
              <span className="font-semibold text-lg mt-2">Start date mentioned: </span>
              {alreadyApplied.startDate}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;

// experience: formData.experience,
// skills: formData.skills,
// coverLetter: formData.coverLetter,
// startDate: formData.startDate,
// title: currentJob.title,
// brief:currentJob.brief
