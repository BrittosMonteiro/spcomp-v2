import { Routes, Route } from "react-router-dom";

//Private All roles
import PrivateRoute from "./privateRoute";
import Index from "../view/main/index";

//Private Internal roles
import Items from "../view/main/internal/items";
import Inquiry from "../view/main/internal/inquiry";
import Purchase from "../view/main/internal/purchase";
import Stock from "../view/main/internal/stock";
import Sales from "../view/main/internal/sales";
import Profile from "../view/main/internal/profile";

//Private Admin role
import Customers from "../view/main/admin/customers";
import Suppliers from "../view/main/admin/suppliers";
import Users from "../view/main/admin/users";
import InquiryItem from "../view/main/admin/inquiryItem";

//Private External role
import SupplierResponse from "../view/main/external/supplierResponse";
import InquiryAvailable from "../view/main/external/inquiryAvailable";

//Public route
import PublicRoute from "./publicRoute";
import Login from "../view/login/login";
import LoginSupplier from "../view/login/loginSupplier";
import NotFound from "../view/notFound";

export default function MainRoutes() {
  const allRoles = [1, 2, 3, 4];
  const internalRoles = [1, 2, 3];
  const externalRoles = [1, 4];
  const adminOnly = [1];

  return (
    <Routes>
      {/* <PrivateRoute /> */}
      <Route
        path="/inquiry/list"
        exact
        element={<PrivateRoute canView={externalRoles} />}
      >
        <Route path="/inquiry/list" element={<SupplierResponse />} />
      </Route>
      <Route
        path="/inquiry/list/available/:idInquiryHistory/:title"
        exact
        element={<PrivateRoute canView={externalRoles} />}
      >
        <Route
          path="/inquiry/list/available/:idInquiryHistory/:title"
          element={<InquiryAvailable />}
        />
      </Route>
      <Route
        path="/admin/inquiry/item/:idInquiryItem"
        exact
        element={<PrivateRoute canView={adminOnly} />}
      >
        <Route
          path="/admin/inquiry/item/:idInquiryItem"
          element={<InquiryItem />}
        />
      </Route>
      <Route path="/" exact element={<PrivateRoute canView={allRoles} />}>
        <Route path="/" element={<Index />} />
      </Route>

      <Route path="/main/" exact element={<PrivateRoute canView={allRoles} />}>
        <Route path="/main/" element={<Index />} />
      </Route>

      <Route
        path="/main/items"
        exact
        element={<PrivateRoute canView={internalRoles} />}
      >
        <Route path="/main/items" element={<Items />} />
      </Route>

      <Route
        path="/main/inquiry"
        exact
        element={<PrivateRoute canView={internalRoles} />}
      >
        <Route path="/main/inquiry" element={<Inquiry />} />
      </Route>

      <Route
        path="/main/purchase"
        exact
        element={<PrivateRoute canView={internalRoles} />}
      >
        <Route path="/main/purchase" element={<Purchase />} />
      </Route>

      <Route
        path="/main/stock"
        exact
        element={<PrivateRoute canView={internalRoles} />}
      >
        <Route path="/main/stock" element={<Stock />} />
      </Route>

      <Route
        path="/main/sales"
        exact
        element={<PrivateRoute canView={internalRoles} />}
      >
        <Route path="/main/sales" element={<Sales />} />
      </Route>

      <Route
        path="/main/profile"
        exact
        element={<PrivateRoute canView={internalRoles} />}
      >
        <Route path="/main/profile" element={<Profile />} />
      </Route>
      <Route
        path="/admin/customers"
        exact
        element={<PrivateRoute canView={internalRoles} />}
      >
        <Route path="/admin/customers" element={<Customers />} />
      </Route>

      <Route
        path="/admin/suppliers"
        exact
        element={<PrivateRoute canView={adminOnly} />}
      >
        <Route path="/admin/suppliers" element={<Suppliers />} />
      </Route>

      <Route
        path="/admin/users"
        exact
        element={<PrivateRoute canView={adminOnly} />}
      >
        <Route path="/admin/users" element={<Users />} />
      </Route>

      {/* <PublicRoute /> */}
      <Route path="/supplier/login" exact element={<PublicRoute />}>
        <Route path="/supplier/login" element={<LoginSupplier />} />
      </Route>

      <Route path="/login" exact element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
