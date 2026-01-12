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
        setTitle(blog.title);
        setContent(blog.content);
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
    <div className="p-10">
      <h1 className="text-2xl mb-4">Edit Blog</h1>

      <input
        className="border p-2 block mb-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 block mb-2"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={updateBlog}
      >
        Update
      </button>
    </div>
  );
}
