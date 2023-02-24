import { useState, useEffect } from "react";

import { readSuppliers } from "../../../../services/supplierService";
import DialogSupplier from "./Components/Dialog/DialogSupplier";
import SuppliersTable from "./Components/TablesAndRows/SupplierTable";

export default function Suppliers() {
  const [open, setOpen] = useState(false);
  const [suppliersList, setSuppliersList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");

  async function loadList() {
    setContentMessage("Carregando informações");
    
    await readSuppliers()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setSuppliersList(response.data || []);
      })
      .catch(() => {
        setContentMessage("Não foi possível carregar. Tente mais tarde");
      })
      .finally(() => {
        if (suppliersList.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há fornecedores cadastrados");
        }
      });
  }

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {suppliersList.length > 0 ? (
        <SuppliersTable suppliersList={suppliersList} reload={loadList} />
      ) : (
        <div className="row">
          <p className="font-md font-medium">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
