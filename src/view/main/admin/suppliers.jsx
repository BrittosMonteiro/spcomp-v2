import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";

import DialogSupplier from "../../../components/Dialog/DialogSupplier";
import SuppliersTable from "./Components/SupplierTable";
import { readSuppliers } from "../../../services/supplierService";

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
      <div className="row justify-content-between align-items-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="font-medium font-sm bg-green-1 text-white-1 pa-2 border-radius-soft">
            Adicionar novo fornecedor
          </Dialog.Trigger>
          <DialogSupplier reloadList={reloadList} />
        </Dialog.Root>
      </div>
      <SuppliersTable suppliersList={suppliersList} reloadList={reloadList} />
    </>
  );
}
