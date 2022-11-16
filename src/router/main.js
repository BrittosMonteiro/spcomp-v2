import { Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

export default function MainRoutes() {
  return (
    <Routes>
      <PrivateRoute />
      <PublicRoute />
    </Routes>
  );
}
