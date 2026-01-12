import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddBlog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
