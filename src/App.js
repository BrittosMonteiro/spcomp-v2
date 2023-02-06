import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/Common/Sidebar";
import MainRoutes from "./router/main";
import MessageBox from "./components/Common/MessageBox";
import { setUser } from "./store/actions/userAction";

function App() {
  const dispatch = useDispatch();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser) {
    dispatch(setUser(loggedUser));
  }

  return (
    <Router>
      <div className="container row">
        <Sidebar />
        <div className="column w-full pa-4">
          <MainRoutes />
        </div>
        <MessageBox />
      </div>
    </Router>
  );
}

export default App;
