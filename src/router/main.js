import { Routes, Route } from "react-router-dom";

//Private All roles
import PrivateRoute from "./privateRoute";
import Index from "../view/main/index";

//Private Internal roles
import Items from "../view/main/internal/items/itemsView";
import OrderRequest from "../view/main/admin/orderRequest";
import Stock from "../view/main/internal/stock/stock";
import Sales from "../view/main/internal/sales/sales";
import Profile from "../view/main/internal/profile";

//Private Admin role
import InquiryItem from "../view/main/admin/inquiryItem";

//Private External role
import SupplierInquiryList from "../view/main/external/supplierInquiryList";
import InquiryAvailable from "../view/main/external/inquiryAvailable";

//Public route
import PublicRoute from "./publicRoute";
import Login from "../view/login/login";
import LoginSupplier from "../view/login/loginSupplier";
import NotFound from "../view/notFound";
import OrderAdmin from "../view/main/admin/orderAdmin";
import OrderStock from "../view/main/stock/orderStock";
import SupplierOrder from "../view/main/external/supplierOrder";
import SupplierOrderList from "../view/main/external/supplierOrderList";
import AdminView from "../view/main/admin/AdminView";

export default function MainRoutes() {
  const allRoles = [1, 2, 3, 4];
  const internalRoles = [1, 2, 3];
  const externalRoles = [1, 3, 4];
  const adminOnly = [1];

  return (
    <Routes>
      {/* <PrivateRoute /> */}
      <Route path="/" exact element={<PrivateRoute canView={allRoles} />}>
        <Route path="/" element={<Index />} />
      </Route>

      <Route path="/main/" exact element={<PrivateRoute canView={allRoles} />}>
        <Route path="/main/" element={<Index />} />
      </Route>

      <Route path="/admin/general" exact element={<PrivateRoute canView={adminOnly} />}>
        <Route path="/admin/general" element={<AdminView />} />
      </Route>
      <Route path="/admin/inquiry/item/:idInquiryItem" exact element={<PrivateRoute canView={adminOnly} />}>
        <Route path="/admin/inquiry/item/:idInquiryItem" element={<InquiryItem />}/>
      </Route>
      <Route path="/admin/order-list" exact element={<PrivateRoute canView={adminOnly} />}>
        <Route path="/admin/order-list" element={<OrderAdmin />} />
      </Route>

      <Route path="/main/profile" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/profile" element={<Profile />} />
      </Route>
      <Route path="/main/items" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/items" element={<Items />} />
      </Route>
      <Route path="/main/order" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/order" element={<OrderRequest />} />
      </Route>
      <Route path="/main/stock" exactelement={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/stock" element={<Stock />} />
      </Route>
      <Route path="/main/sales" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/sales" element={<Sales />} />
      </Route>

      <Route path="/supplier/inquiry-list" exact element={<PrivateRoute canView={externalRoles} />}>
        <Route path="/supplier/inquiry-list" element={<SupplierInquiryList />}/>
      </Route>
      <Route path="/supplier/inquiry-list/available/:idInquiryHistory/:title" exact element={<PrivateRoute canView={externalRoles} />}>
        <Route path="/supplier/inquiry-list/available/:idInquiryHistory/:title" element={<InquiryAvailable />}/>
      </Route>
      <Route path="/supplier/order-requests" element={<PrivateRoute canView={externalRoles} />}>
        <Route path="/supplier/order-requests" element={<SupplierOrderList />}/>
      </Route>
      <Route path="/supplier/order/:idOrder" exact element={<PrivateRoute canView={externalRoles} />}>
        <Route path="/supplier/order/:idOrder" element={<SupplierOrder />} />
      </Route>

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
