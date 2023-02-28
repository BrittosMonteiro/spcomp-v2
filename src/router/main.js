import { Routes, Route } from "react-router-dom";

//Main routes
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

//Private All roles
import Index from "../view/main/index";

//Private Internal roles
import Profile from "../view/main/internal/profile/profile";
import ItemsView from "../view/main/internal/items/itemsView";
import OrderView from "../view/main/internal/orders/orderView";
import StockView from "../view/main/internal/stock/stock";
import SalesView from "../view/main/internal/sales/sales";

//Private Admin role
import AdminView from "../view/main/admin/general/AdminView";
import InquiryItem from "../view/main/admin/general/inquiryItem";
import Imports from "../view/main/admin/imports/imports";
import ImportDetail from "../view/main/admin/imports/importDetail";

//Private External role
import SupplierInquiryList from "../view/main/external/supplierInquiryList";
import InquiryAvailable from "../view/main/external/inquiryAvailable";
import SupplierOrder from "../view/main/external/supplierOrder";
import SupplierOrderList from "../view/main/external/supplierOrderList";

//Public route
import Login from "../view/login/login";
import LoginSupplier from "../view/login/loginSupplier";
import NotFound from "../view/notFound";

export default function MainRoutes() {
  const allRoles = [1, 2, 3, 4];
  const internalRoles = [1, 2, 3];
  const externalRoles = [1, 3, 4];
  const adminOnly = [1];
  const adminStock = [1]

  return (
    <Routes>
      {/* <PrivateRoute /> */}
      <Route path="/" exact element={<PrivateRoute canView={allRoles} />}>
        <Route path="/" element={<Index />} />
      </Route>

      <Route path="/admin/general" exact element={<PrivateRoute canView={adminOnly} />}>
        <Route path="/admin/general" element={<AdminView />} />
      </Route>
      <Route path="/admin/inquiry/item/:idInquiryItem" exact element={<PrivateRoute canView={adminOnly} />}>
        <Route path="/admin/inquiry/item/:idInquiryItem" element={<InquiryItem />}/>
      </Route>
      <Route path="/admin/imports/list" exact element={<PrivateRoute canView={adminStock} />}>
        <Route path="/admin/imports/list" element={<Imports />}/>
      </Route>
      <Route path="/admin/imports/list/:idImportHistory" exact element={<PrivateRoute canView={adminStock} />}>
        <Route path="/admin/imports/list/:idImportHistory" element={<ImportDetail />}/>
      </Route>

      <Route path="/main/profile" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/profile" element={<Profile />} />
      </Route>
      <Route path="/main/items" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/items" element={<ItemsView />} />
      </Route>
      <Route path="/main/order" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/order" element={<OrderView />} />
      </Route>
      <Route path="/main/stock" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/stock" element={<StockView />} />
      </Route>
      <Route path="/main/sales" exact element={<PrivateRoute canView={internalRoles} />}>
        <Route path="/main/sales" element={<SalesView />} />
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
