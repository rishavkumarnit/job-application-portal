import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { jobs } from "./Jobs";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-400 pb-15">
        <p className="text-3xl font-[poppins] mt-10 pt-10">Jobs List</p>
        <div className="mx-10  items-center mt-8 grid sm:grid-cols-3 shadow md:grid-cols-4 grid-cols-1 gap-2 sm:gap-8">
          {jobs.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col bg-gray-200 p-4 rounded shadow-xl gap-2 h-64 w-64 relative"
              >
                <p>
                  <span className="font-semibold">Title: </span>{item.title}
                </p>
                <p>
                  <span className="font-semibold">Brief: </span>{item.brief}
                </p>
                <p>
                  <span className="font-semibold">Name: </span>
                  {item.companyName}
                </p>
                <Link to={`/job/${item.id}`}>
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

export default Home;
