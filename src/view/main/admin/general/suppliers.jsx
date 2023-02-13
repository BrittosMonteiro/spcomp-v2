import { useState, useEffect } from "react";

import { readSuppliers } from "../../../../services/supplierService";
import DialogSupplier from "./Components/Dialog/DialogSupplier";
import SuppliersTable from "./Components/TablesAndRows/SupplierTable";

export default function Suppliers() {
  const [open, setOpen] = useState(false);
  const [suppliersList, setSuppliersList] = useState([]);

  function loadList() {
    readSuppliers()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setSuppliersList(response.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadList();
  }, []);

  function closeModal() {
    loadList();
    setOpen(false);
  }

  return (
    <>
      <div className="flex jc-between ai-center">
        <button
          type="button"
          className="action-btn font-medium font-sm pa-1 border-radius-soft"
          onClick={() => setOpen(true)}
        >
          Adicionar novo fornecedor
        </button>
        <DialogSupplier onClose={closeModal} reload={loadList} open={open} />
      </div>
      <SuppliersTable suppliersList={suppliersList} reload={loadList} />
    </>
  );
}
