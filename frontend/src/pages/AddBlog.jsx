import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const addBlog = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/blogs",
        { title, content },
        { headers: { Authorization: token } }
      );

      alert("Blog added");
      navigate("/");
    } catch (err) {
      alert("Failed to add blog");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
           Add New Blog
        </h1>

        <input
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Blog Title"
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-48"
          placeholder="Write your blog content here..."
          onChange={e => setContent(e.target.value)}
        />

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2 rounded-lg font-semibold"
          onClick={addBlog}
        >
          Publish Blog
        </button>

        <button
          className="w-full mt-3 text-gray-400 hover:text-white transition text-sm"
          onClick={() => navigate("/")}
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
}
