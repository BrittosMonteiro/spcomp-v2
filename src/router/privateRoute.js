import { Routes, Route } from "react-router-dom";
import Header from "../components/Common/Header";
import Index from "../view/index";
import Items from "../view/items";
import Inquiry from "../view/inquiry";
import Purchase from "../view/purchase";
import Stock from "../view/stock";
import Sales from "../view/sales";
import Profile from "../view/profile";
import Customers from "../view/customers";
import Suppliers from "../view/suppliers";

export default function PrivateRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main/" element={<Index />} />
        <Route path="/main/items" element={<Items />} />
        <Route path="/main/inquiry" element={<Inquiry />} />
        <Route path="/main/purchase" element={<Purchase />} />
        <Route path="/main/stock" element={<Stock />} />
        <Route path="/main/sales" element={<Sales />} />
        <Route path="/main/profile" element={<Profile />} />
        <Route path="/admin-route/customers" element={<Customers />} />
        <Route path="/admin-route/suppliers" element={<Suppliers />} />
      </Routes>
    </>
  );
}
