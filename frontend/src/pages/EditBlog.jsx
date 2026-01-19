import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then(res => {
        const blog = res.data.find(b => b._id === id);
        if (blog) {
          setTitle(blog.title);
          setContent(blog.content);
        }
      });
  }, [id]);

  const updateBlog = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        { title, content },
        { headers: { Authorization: token } }
      );

      alert("Blog updated");
      navigate("/");
    } catch (err) {
      alert("You are not allowed to edit this blog");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
           Edit Blog
        </h1>

        <input
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-48"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-semibold"
          onClick={updateBlog}
        >
          Update Blog
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
