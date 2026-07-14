import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./App/Common/ProtectedRoute";
import MainLayout from "./App/Layout/MainLayout";
import Login from "./Features/Auth/Login";
import Profile from "./Features/Auth/Profile";
import Register from "./Features/Auth/Register";
import HomePage from "./Features/HomePage/HomePage";
import ActivityList from "./Features/Activities/ActivityList";
import ActivityDetails from "./Features/Activities/ActivityDetails";
import CreateActivityForm from "./Features/Activities/CreateActivityForm";
import MyInscriptions from "./Features/Activities/MyInscriptions";
import NotFound from "./Features/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/activities/:id" element={<ActivityDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/activities/new" element={<CreateActivityForm />} />
          <Route path="/my-inscriptions" element={<MyInscriptions />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
