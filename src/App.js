import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./router/privateRoute";
import PublicRoute from "./router/publicRoute";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => {
    return state.userReducer;
  });

  return (
    <Router>
      <div className="container px-4">
        {user.token ? <PrivateRoute /> : <PublicRoute />}
      </div>
    </Router>
  );
}

export default App;
