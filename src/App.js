import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Common/Header";
import RouterView from "./router/route";

function App() {
  return (
    <Router>
      <div className="container px-4">
        <Header />
        <RouterView />
      </div>
    </Router>
  );
}

export default App;
