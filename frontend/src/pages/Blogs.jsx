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
    <div className="p-10">
      
      {/*NAV bar if token exists else not exists*/}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog App</h1>

        <div>
          {!token ? (
            <>
              <button
                className="bg-blue-500 text-white px-3 py-1 mr-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="bg-green-500 text-white px-3 py-1"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-purple-500 text-white px-3 py-1 mr-2"
                onClick={() => navigate("/add")}
              >
                Add Blog
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/*BLOG LIST */}
      {blogs.map(b => (
        <div key={b._id} className="border p-3 mb-3">
          <h2 className="font-bold">{b.title}</h2>
          <p>{b.content}</p>
          <small>By {b.user.username}</small>

          {token && (
            <div className="mt-2">
              <button
                className="bg-yellow-400 px-2 py-1 mr-2"
                onClick={() => navigate(`/edit/${b._id}`)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => deleteBlog(b._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
