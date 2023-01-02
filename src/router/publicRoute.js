import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  return userSession.isLogged ? <Navigate to={"/"} /> : <Outlet />;
}
