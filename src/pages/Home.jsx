
import axios from "axios";
import { useEffect, useState } from "react";
import AddPosts from "../components/AddPosts";
import Delete from "../assets/image.png";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userMe, setUserMe] = useState(null);
  const token = localStorage.getItem("token");

  async function getPosts() {
    const response = await axios.get(`https://nt-devconnector.onrender.com/api/posts`, {
      headers: { "x-auth-token": token },
    });
    setPosts(response.data);
  }

  async function getMe() {
    const response = await axios.get(`https://nt-devconnector.onrender.com/api/auth`, {
      headers: { "x-auth-token": token },
    });
    setUserMe(response?.data?._id);
  }

  useEffect(() => {
    getPosts();
    getMe();
  }, []);

  function handleDelete(id) {
    axios
      .delete(`https://nt-devconnector.onrender.com/api/posts/${id}`, {
        headers: { "x-auth-token": token },
      })
      .then(() => {
        getPosts();
      });
  }

  return (
    <div className="w-full bg-white-100 p-6 ">
      <div className="w-[1000px] mx-auto">
        <AddPosts getPosts={getPosts} />
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 border shadow-sm mb-[10px] text-[26px]">
            <div className="flex items-center space-x-4 text-[20px] gap-[80px]">
              <img
                src={post.avatar || "default-avatar.png"}
                alt="User"
                className="w-[100px] rounded-full bg-gray-300"
              />
              <div className="">

                <p className="mt-6 text-gray-700 pb-[20px]">{post.text}</p>
                <p className="text-gray-500 text-sm">Posted on 3/14/2025</p>
                <div className="flex items-center mt-4 space-x-2">
                  <button className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded">
                    <box-icon name='like' ></box-icon>
                    <span>{post.likes?.length || 0}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded">
                    <box-icon name='dislike' type='solid' ></box-icon>
                  </button>
                  <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">
                    Discussion
                  </button>
                  {post?.user === userMe && (
                    <button
                      onClick={() => handleDelete(post._id)}
                      className=" text-red-500 hover:underline"
                    >
                      <img src={Delete} alt="" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <h2 className="text-blue-500 font-semibold text-[20px] ml-[10px]">{post.name}</h2>




          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


