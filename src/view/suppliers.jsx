import PageTitle from "../components/Common/PageTitle";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import DialogSupplier from "../components/Dialog/DialogSupplier";
import ListSupplier from "../components/List/ListSupplier";
import { getSupplierList } from "../services/supplierService";

export default function Suppliers() {
  const [open, setOpen] = useState(false);
  const [suppliersList, setSuppliersList] = useState([]);

  function loadList() {
    getSupplierList()
      .then((res) => res.json())
      .then((res) => {
        setSuppliersList(res || []);
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
        <PageTitle title={"Fornecedores"} />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="font-medium font-sm bg-transparent">
            Adicionar novo fornecedor
          </Dialog.Trigger>
          <DialogSupplier reloadList={reloadList} />
        </Dialog.Root>
      </div>
      <ListSupplier suppliersList={suppliersList} reloadList={reloadList} />
    </>
  );
}
