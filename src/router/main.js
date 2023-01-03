import { Routes, Route } from "react-router-dom";

//Private route
import Index from "../view/main/index";
import Items from "../view/main/items";
import Inquiry from "../view/main/inquiry";
import Purchase from "../view/main/purchase";
import Stock from "../view/main/stock";
import Sales from "../view/main/sales";
import Profile from "../view/main/profile";
import Customers from "../view/main/customers";
import Suppliers from "../view/main/suppliers";
import Users from "../view/main/users";
import PrivateRoute from "./privateRoute";

//Public route
import Login from "../view/login/login";
import PublicRoute from "./publicRoute";
import NotFound from "../view/notFound";

export default function MainRoutes() {
  return (
    <Routes>
      {/* <PrivateRoute /> */}
      <Route path="/" exact element={<PrivateRoute />}>
        <Route path="/" element={<Index />} />
      </Route>

      <Route path="/main/" exact element={<PrivateRoute />}>
        <Route path="/main/" element={<Index />} />
      </Route>

      <Route path="/main/items" exact element={<PrivateRoute />}>
        <Route path="/main/items" element={<Items />} />
      </Route>

      <Route path="/main/inquiry" exact element={<PrivateRoute />}>
        <Route path="/main/inquiry" element={<Inquiry />} />
      </Route>

      <Route path="/main/purchase" exact element={<PrivateRoute />}>
        <Route path="/main/purchase" element={<Purchase />} />
      </Route>

      <Route path="/main/stock" exact element={<PrivateRoute />}>
        <Route path="/main/stock" element={<Stock />} />
      </Route>

      <Route path="/main/sales" exact element={<PrivateRoute />}>
        <Route path="/main/sales" element={<Sales />} />
      </Route>

      <Route path="/main/profile" exact element={<PrivateRoute />}>
        <Route path="/main/profile" element={<Profile />} />
      </Route>

      <Route path="/admin-route/customers" exact element={<PrivateRoute />}>
        <Route path="/admin-route/customers" element={<Customers />} />
      </Route>

      <Route path="/admin-route/suppliers" exact element={<PrivateRoute />}>
        <Route path="/admin-route/suppliers" element={<Suppliers />} />
      </Route>

      <Route path="/admin-route/users" exact element={<PrivateRoute />}>
        <Route path="/admin-route/users" element={<Users />} />
      </Route>

      {/* <PublicRoute /> */}
      <Route path="/login" exact element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
