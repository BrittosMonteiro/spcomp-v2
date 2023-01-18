import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ canView }) {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const hasPermission = canView.indexOf(userSession.role);

  return userSession.isLogged && hasPermission !== -1 ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
}
