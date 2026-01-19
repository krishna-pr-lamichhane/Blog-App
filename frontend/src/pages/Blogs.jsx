import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then(res => setBlogs(res.data));
  }, []);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: token }
      });
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err) {
      alert("You are not allowed to delete this blog");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Blog IT</h1>
          <p className="text-gray-400 mt-1">
            Read and share thoughts with the blog community
          </p>
        </div>

        <div className="flex gap-2">
          {!token ? (
            <>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white"
                onClick={() => navigate("/add")}
              >
               Add Blog
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* blogs displaying */}
      <div className="max-w-3xl mx-auto space-y-6">
        {blogs.map(b => (
          <article
            key={b._id}
            className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
              {b.title}
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              {b.content}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>
                By <span className="font-medium">{b.user.username}</span>
              </span>

              {token && (
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 transition text-black"
                    onClick={() => navigate(`/edit/${b._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition text-white"
                    onClick={() => deleteBlog(b._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* no blogs */}
      {blogs.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          No blogs available yet.
        </p>
      )}
    </div>
  );
}
