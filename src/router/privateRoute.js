import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  return userSession.isLogged ? <Outlet /> : <Navigate to={"/login"} />;
}
