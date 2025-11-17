import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Applications = () => {
  const { appliedJobs } = useSelector((state) => state.jobsApplied);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-400 pb-15">
        <p className="text-3xl font-[poppins] pt-14">Applications</p>
        <div className="mx-10 items-center mt-8 text-[90%] grid sm:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-2 sm:gap-8">
          {appliedJobs.map((item) => {
            return (
              <div
                key={item.jobId}
                className="flex flex-col bg-gray-200 p-4 rounded shadow-xl gap-2 h-72 w-72 relative"
              >
                <p><span className="font-semibold">Title: </span>{item.title}</p>
                <p><span className="font-semibold">Applicant name: </span>{item.applicantName}</p>
                <p><span className="font-semibold">Experience: </span>{item.experience}</p>
                <p><span className="font-semibold">Skills: </span>{item.skills}</p>
                <p><span className="font-semibold">Brief: </span>{item.brief}</p>
                <Link to={`/applications/${item.jobId}`}>
                  <button className="bg-gray-700 rounded p-2 m-2 text-white bottom-4 absolute hover:cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Applications;
