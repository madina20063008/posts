import axios from "axios";
import { useEffect, useState } from "react";
import AddPosts from "../components/AddPosts";
import Delete from "../assets/image.png";
import { Link } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userMe, setUserMe] = useState(null);
  const token = localStorage.getItem("token");

  async function getPosts() {
    try {
      const response = await axios.get(`https://nt-devconnector.onrender.com/api/posts`, {
        headers: { "x-auth-token": token },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function getMe() {
    try {
      const response = await axios.get(`https://nt-devconnector.onrender.com/api/auth`, {
        headers: { "x-auth-token": token },
      });
      setUserMe(response?.data?._id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    getPosts();
    getMe();
  }, []);

  async function handleLike(postId) {
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/like/${postId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      getPosts(); 
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  async function handleDislike(postId) {
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/unlike/${postId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      getPosts(); 
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://nt-devconnector.onrender.com/api/posts/${id}`, {
        headers: { "x-auth-token": token },
      });
      getPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  return (
    <div className="w-full bg-white-100 p-6">
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
              <div>
                <p className="mt-6 text-gray-700 pb-[20px]">{post.text}</p>
                <p className="text-gray-500 text-sm">Posted on 3/14/2025</p>
                <div className="flex items-center mt-4 space-x-2">
                  
                  <button
                    className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded"
                    onClick={() => handleLike(post._id)}
                  >
                    <box-icon name="like"></box-icon>
                    <span>{post.likes?.length || 0}</span>
                  </button>

                  <button
                    className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded"
                    onClick={() => handleDislike(post._id)}
                  >
                    <box-icon name="dislike" type="solid"></box-icon>
                  </button>

                  <Link to={`/comment/${post._id}`}>
                    <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">
                      Discussion
                    </button>
                  </Link>

                  {post?.user === userMe && (
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 hover:underline"
                    >
                      <img src={Delete} alt="Delete" />
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















// import { createApi } from '@reduxjs/toolkit/query'

// export const Home = () => {
//   const {data, error, isLoading} = useGetPostsQuery();
//   console.log(data);
//   const [posts, setPosts] = useState([]);
//   return (
//         <div className="w-full bg-white-100 p-6 ">
//           <div className="w-[1000px] mx-auto">
//             {posts.map((post) => (
//               <div key={post._id} className="bg-white p-4 border shadow-sm mb-[10px] text-[26px]">
//                 <div className="flex items-center space-x-4 text-[20px] gap-[80px]">
//                   <img
//                     src={post.avatar || "default-avatar.png"}
//                     alt="User"
//                     className="w-[100px] rounded-full bg-gray-300"
//                   />
//                   <div className="">
    
//                     <p className="mt-6 text-gray-700 pb-[20px]">{post.text}</p>
//                     <p className="text-gray-500 text-sm">Posted on 3/14/2025</p>
//                     <div className="flex items-center mt-4 space-x-2">
//                       <button className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded">
//                         <box-icon name='like' ></box-icon>
//                         <span>{post.likes?.length || 0}</span>
//                       </button>
//                       <button className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded">
//                         <box-icon name='dislike' type='solid' ></box-icon>
//                       </button>
//                       {/* <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">
//                         Discussion
//                       </button> */}
                      
    
//                       <Link to="/comment">
//                         <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">
//                           Discussion
//                         </button>
//                       </Link>
    
//                       {post?.user === userMe && (
//                         <button
//                           onClick={() => handleDelete(post._id)}
//                           className=" text-red-500 hover:underline"
//                         >
//                           <img src={Delete} alt="" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
    
//                 <h2 className="text-blue-500 font-semibold text-[20px] ml-[10px]">{post.name}</h2>
    
    
    
    
//               </div>
//             ))}
//           </div>
//         </div>
//       );
// }
// export default Home;