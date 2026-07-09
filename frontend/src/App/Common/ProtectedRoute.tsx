import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../Stores/AuthStore";

function ProtectedRoute() {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default observer(ProtectedRoute);
