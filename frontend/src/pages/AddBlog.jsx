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
    <div className="p-10">
      <h1 className="text-2xl mb-4">Add Blog</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 block mb-2"
        placeholder="Content"
        onChange={e => setContent(e.target.value)}
      />

      <button
        className="bg-purple-500 text-white px-4 py-2"
        onClick={addBlog}
      >
        Add
      </button>
    </div>
  );
}
