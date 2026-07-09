import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./App/Common/ProtectedRoute";
import MainLayout from "./App/Layout/MainLayout";
import Login from "./Features/Auth/Login";
import Profile from "./Features/Auth/Profile";
import Register from "./Features/Auth/Register";
import HomePage from "./Features/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
