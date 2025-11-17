import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { jobs } from "./Jobs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Job = () => {
  const { id } = useParams();
  // const [job, setJob] = useState(null);
  const job = jobs.find((item) => item.id.toString() === id.toString());
  const { appliedJobs } = useSelector((state) => state.jobsApplied);
  // const[alreadyApplied, setAlreadyApplied] = useState(false);
  // useEffect
  const alreadyApplied = appliedJobs.some((item) => {
    return item.jobId.toString() === id.toString();
  });
  useEffect(() => {}, [appliedJobs]);
  // useEffect(() => {
  //   const foundJob = jobs.find((item) => item.id.toString() === id.toString());
  //   setJob(foundJob);
  // }, [id]);
  // max-w-xl
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-300 text-[70%] sm:text-[100%] flex flex-col items-center justify-center p-5 font-[Poppins]">
        <div className="bg-gray-400 rounded-xl shadow-lg p-6 sm:p-10 mx-10 sm:mx-52 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex flex-col justify-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {job.companyName}
            </h1>
            <p className="text-sm font-semibold sm:text-base">{job.title}</p>
            <p>
              <span className="font-bold text-lg mt-2">Salary: </span>₹
              {job.salary}
            </p>
            <p>
              <span className="font-bold text-lg mt-2">Requirement: </span>
              {job.requirement}
            </p>
            <p>
              <span className="font-bold text-lg mt-2">Description: </span>
              {job.description}
            </p>
            <Link
              to={`/apply/${id}`}
              className="mt-4 font-bold w-[15%] p-2 text-center hover:cursor-pointer text-l sm:text-xl rounded-full bg-blue-500"
            >
              {alreadyApplied ? "Applied" : "Apply Now"}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Job;
