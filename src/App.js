import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Common/Header";
import MainRoutes from "./router/main";
import { setUser } from "./store/actions/userAction";

function App() {
  const dispatch = useDispatch();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser) {
    dispatch(setUser(loggedUser));
  }

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
