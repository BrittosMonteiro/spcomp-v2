import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Common/Header";
import MainRoutes from "./router/main";
// import PrivateRoute from "./router/privateRoute";
// import PublicRoute from "./router/publicRoute";
import { setUserAction } from "./store/actions/userAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userState = JSON.parse(localStorage.getItem("userState"));
    if (userState) {
      dispatch(setUserAction(userState));
    }
  });

  return (
    <Router>
      <div className="container px-4">
        <Header />
        <MainRoutes />
      </div>
    </Router>
  );
}

export default App;
