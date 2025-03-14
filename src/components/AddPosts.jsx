
import axios from "axios";
import React, { useState } from "react";

const AddPosts = ({ getPosts }) => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://nt-devconnector.onrender.com/api/posts`,
        { text },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(() => getPosts());
    setText("");
  }
  return (
    <div className="w-full mx-auto pb-4 bg-white rounded-lg">
      <div className="w-[1000px] mx-auto">
      <h2 className="text-[50px] font-bold text-blue-500">Posts</h2>
      <p className="flex items-center text-gray-600 mt-2 text-[24px]">
        <span className="mr-2">👤</span> Welcome to the community
      </p>
      <div className="mt-4 bg-blue-500 text-white p-2 text-[20px] rounded-t-lg font-semibold">
        Say Something...
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 mt-4 border text-[20px] rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          rows="4"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddPosts;
