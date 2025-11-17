import { useContext, useState } from "react";
import React from "react";
import { User } from "../App";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { profile, setProfile } = useContext(User);
  const [signIn, setSignIn] = useState({
    userName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signIn.userName === "" || signIn.email === "") {
      alert("please complete the form!!");
      e.preventDefault();
      return;
    }
    if (!emailRegex.test(signIn.email)) {
      e.preventDefault();
      alert("Enter a valid email");
      return;
    }
    setProfile({
      userName: signIn.userName,
      email: signIn.email,
    });
    setSignIn({
      userName: "",
      email: "",
    });
  };
  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pt-10 h-screen bg-gray-300 items-center"
      >
        <p className="pt-5 font-bold">Profile Details</p>
        <div className="mt-10">Name</div>
        <input
          type="text"
          className="bg-gray-400 rounded p-1"
          name="userName"
          onChange={handleChange}
          value={signIn.userName}        />
        <div>Email</div>
        <input
          type="text"
          className="bg-gray-400 rounded p-1"
          name="email"
          onChange={handleChange}
          value={signIn.email}
        />
        <button className="bg-gray-400 p-1 rounded hover:cursor-pointer">
          Submit
        </button>
      </form>
      <Footer />
    </>
  );
};

export default Profile;
