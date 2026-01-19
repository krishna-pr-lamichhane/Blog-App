import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-4">
            You must be logged in to view this page.
          </p>
          <Navigate to="/login" />
        </div>
      </div>
    );
  }

  return children;
}
