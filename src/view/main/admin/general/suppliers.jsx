import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";

import { readSuppliers } from "../../../../services/supplierService";
import DialogSupplier from "../../../../components/Dialog/DialogSupplier";
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

  function reloadList() {
    loadList();
    setOpen(false);
  }

  return (
    <>
      <div className="flex jc-between ai-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="action-btn font-medium font-sm pa-1 border-radius-soft">
            Adicionar novo fornecedor
          </Dialog.Trigger>
          <DialogSupplier reloadList={reloadList} />
        </Dialog.Root>
      </div>
      <SuppliersTable suppliersList={suppliersList} reloadList={reloadList} />
    </>
  );
}
