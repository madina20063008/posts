
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import Delete from "../assets/image.png";

// const CommentPage = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState("");
//   const token = localStorage.getItem("token");
//   const [userMe, setUserMe] = useState(null);

//   async function fetchPost() {
//     try {
//       const response = await axios.get(`https://nt-devconnector.onrender.com/api/posts/${id}`, {
//         headers: { "x-auth-token": token },
//       });
//       setPost(response.data);
//       setComments(response.data.comments);
//     } catch (error) {
//       console.error("Error fetching post:", error);
//     }
//   }

//   async function fetchUser() {
//     try {
//       const response = await axios.get("https://nt-devconnector.onrender.com/api/auth", {
//         headers: { "x-auth-token": token },
//       });
//       setUserMe(response.data._id); 
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   }

//   useEffect(() => {
//     fetchPost();
//     fetchUser();
//   }, [id]);

//   async function handleCommentSubmit(e) {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `https://nt-devconnector.onrender.com/api/posts/comment/${id}`,
//         { text },
//         { headers: { "x-auth-token": token } }
//       );
//       setText("");
//       fetchPost();
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     }
//   }

//   async function handleDeletePost() {
//     try {
//       await axios.delete(`https://nt-devconnector.onrender.com/api/posts/${id}`, {
//         headers: { "x-auth-token": token },
//       });
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   }

//   async function handleDeleteComment(commentId) {
//     try {
//       await axios.delete(`https://nt-devconnector.onrender.com/api/posts/comment/${id}/${commentId}`, {
//         headers: { "x-auth-token": token },
//       });
//       fetchPost();
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   }

//   if (!post) {
//     return <p className="text-center text-gray-500">Loading post...</p>;
//   }

//   return (
//     <div className="w-full bg-white-100 p-6">
//       <div className="w-[1000px] mx-auto">
//         <Link to="/">
//           <button className="ml-auto bg-gray-100 text-black px-4 py-2 mt-12 mb-6 rounded">
//             Back To Posts
//           </button>
//         </Link>
//         <div className="bg-white p-4 border shadow-sm mb-[10px] text-[26px]">
//           <div className="flex items-center space-x-4 text-[20px] gap-[80px]">
//             <img
//               src={post.avatar || "default-avatar.png"}
//               alt="User"
//               className="w-[100px] rounded-full bg-gray-300"
//             />
//             <div>
//               <p className="mt-6 text-gray-700 pb-[20px]">{post.text}</p>
//               <p className="text-gray-500 text-sm">Posted on 3/14/2025</p>
//               <div className="flex items-center mt-4 space-x-2">
//                 <button className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded">
//                   <box-icon name="like"></box-icon>
//                   <span>{post.likes?.length || 0}</span>
//                 </button>
//                 <button className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded">
//                   <box-icon name="dislike" type="solid"></box-icon>
//                 </button>

//                 <Link to="/">
//                   <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">
//                     Discussion
//                   </button>
//                 </Link>

//                 {post?.user === userMe && (
//                   <button
//                     onClick={handleDeletePost}
//                     className="text-red-500 hover:underline"
//                   >
//                     <img src={Delete} alt="Delete" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <h2 className="text-blue-500 font-semibold text-[20px] ml-[10px]">{post.name}</h2>
//         </div>

//         <div className="w-full mx-auto pb-4 bg-white rounded-lg">
//           <div className="w-[1000px] mx-auto">
//             <div className="mt-4 bg-blue-500 text-white p-2 text-[20px] rounded-t-lg font-semibold">
//               Leave a Comment
//             </div>
//             <form onSubmit={handleCommentSubmit}>
//               <textarea
//                 className="w-full p-2 mt-4 border text-[20px] rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 rows="4"
//                 placeholder="Write a reply..."
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               ></textarea>
//               <button
//                 type="submit"
//                 className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>

//         {comments.map((comment) => (
//           <div key={comment._id} className="bg-white p-4 border shadow-sm mb-[10px] text-[26px]">
//             <div className="flex items-center space-x-4 text-[20px] gap-[80px]">
//               <img
//                 src={comment.avatar || "default-avatar.png"}
//                 alt="User"
//                 className="w-[100px] rounded-full bg-gray-300"
//               />
//               <div>
//                 <p className="mt-6 text-gray-700 pb-[20px]">{comment.text}</p>
//                 <p className="text-gray-500 text-sm">Posted on 3/14/2025</p>
//               </div>
//               {comment?.user === userMe && (
//                 <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:underline">
//                   <img src={Delete} alt="Delete" />
//                 </button>
//               )}
//             </div>
//             <h2 className="text-blue-500 font-semibold text-[20px] ml-[10px]">{comment.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentPage;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Delete from "../assets/image.png";

const CommentPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const [userMe, setUserMe] = useState(null);

  async function fetchPost() {
    try {
      const response = await axios.get(`https://nt-devconnector.onrender.com/api/posts/${id}`, {
        headers: { "x-auth-token": token },
      });
      setPost(response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  async function fetchUser() {
    try {
      const response = await axios.get("https://nt-devconnector.onrender.com/api/auth", {
        headers: { "x-auth-token": token },
      });
      setUserMe(response.data._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchPost();
    fetchUser();
  }, [id]);

  async function handleLike() {
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/like/${id}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      fetchPost(); // Refresh post after liking
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  async function handleDislike() {
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/unlike/${id}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      fetchPost(); // Refresh post after disliking
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `https://nt-devconnector.onrender.com/api/posts/comment/${id}`,
        { text },
        { headers: { "x-auth-token": token } }
      );
      setText("");
      fetchPost();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  }

  async function handleDeletePost() {
    try {
      await axios.delete(`https://nt-devconnector.onrender.com/api/posts/${id}`, {
        headers: { "x-auth-token": token },
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await axios.delete(`https://nt-devconnector.onrender.com/api/posts/comment/${id}/${commentId}`, {
        headers: { "x-auth-token": token },
      });
      fetchPost();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  if (!post) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  return (
    <div className="w-full bg-white-100 p-6">
      <div className="w-[1000px] mx-auto">
        <Link to="/">
          <button className="ml-auto bg-gray-100 text-black px-4 py-2 mt-12 mb-6 rounded">
            Back To Posts
          </button>
        </Link>
        <div className="bg-white p-4 border shadow-sm mb-[10px] text-[26px]">
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
                {/* Like Button */}
                <button
                  className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded"
                  onClick={handleLike}
                >
                  <box-icon name="like"></box-icon>
                  <span>{post.likes?.length || 0}</span>
                </button>

                {/* Dislike Button */}
                <button
                  className="flex items-center space-x-1 text-gray-600 border px-3 py-1 rounded"
                  onClick={handleDislike}
                >
                  <box-icon name="dislike" type="solid"></box-icon>
                </button>

                <Link to="/">
                  <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">
                    Discussion
                  </button>
                </Link>

                {post?.user === userMe && (
                  <button
                    onClick={handleDeletePost}
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

        {/* Comment Section */}
        <div className="w-full mx-auto pb-4 bg-white rounded-lg">
          <div className="w-[1000px] mx-auto">
            <div className="mt-4 bg-blue-500 text-white p-2 text-[20px] rounded-t-lg font-semibold">
              Leave a Comment
            </div>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full p-2 mt-4 border text-[20px] rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="4"
                placeholder="Write a reply..."
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

        {/* Display Comments */}
        {comments.map((comment) => (
          <div key={comment._id} className="bg-white p-4 border shadow-sm mb-[10px] text-[26px]">
            <div className="flex items-center space-x-4 text-[20px] gap-[80px]">
              <img
                src={comment.avatar || "default-avatar.png"}
                alt="User"
                className="w-[100px] rounded-full bg-gray-300"
              />
              <div>
                <p className="mt-6 text-gray-700 pb-[20px]">{comment.text}</p>
                <p className="text-gray-500 text-sm">Posted on 3/14/2025</p>
              </div>
              {comment?.user === userMe && (
                <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:underline">
                  <img src={Delete} alt="Delete" />
                </button>
              )}
            </div>
            <h2 className="text-blue-500 font-semibold text-[20px] ml-[10px]">{comment.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;
