import { XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import {
  createSupplier,
  updateSupplier,
} from "../../../../../../services/supplierService";

export default function DialogSupplier({ open, onClose, reload, supplier }) {
  const [supplierName, setSupplierName] = useState(null);
  const [contactName, setContactName] = useState(null);
  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState(null);
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    if (supplier) {
      setSupplierName(supplier.name);
      setContactName(supplier.contact);
      setEmail(supplier.email);
      setStatus(supplier.status);
      setObservation(supplier.observation);
    }
  }, [supplier]);

  function handleSupplier(e) {
    e.preventDefault();

    if (!supplierName || !contactName || !email) return;

    const supplierData = {
      name: supplierName,
      contact: contactName,
      email,
      status,
      observation,
    };

    if (supplier?.id) {
      const data = { idSupplier: supplier.id, supplier: supplierData };
      updateCurrentSupplier(data);
    } else {
      createNewSupplier(supplierData);
    }
  }

  async function createNewSupplier(supplierData) {
    await createSupplier(supplierData)
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          reload();
          clearFields();
          onClose();
        }
      })
      .catch((err) => {});
  }
  async function updateCurrentSupplier(supplierData) {
    await updateSupplier(supplierData)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reload();
          clearFields();
          onClose();
        }
      })
      .catch((err) => {});
  }

  function clearFields() {
    setSupplierName(null);
    setContactName(null);
    setEmail(null);
    setStatus(null);
    setObservation(null);
  }

  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-medium font-lg">
          {supplier?.id ? "Informações do" : "Adicionar"} fornecedor
        </h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <form onSubmit={handleSupplier}>
        <div className="row align-item-center gap-4 mt-4">
          <div className="column gap-2 text-dark-3 font-medium font-sm">
            <label htmlFor="supplier_name">Fornecedor</label>
            <input
              type={"text"}
              name="supplier_name"
              id="supplier_name"
              defaultValue={supplierName}
              placeholder="Fornecedor"
              className="border-default pa-2 border-radius-soft font-medium font-md"
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>
          <div className="column gap-2 text-dark-3 font-medium font-sm">
            <label htmlFor="supplier_contactName">Responsável</label>
            <input
              type={"text"}
              name="supplier_contactName"
              id="supplier_contactName"
              defaultValue={contactName}
              placeholder="Responsável"
              className="border-default pa-2 border-radius-soft font-medium font-md"
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
        </div>

        <div className="row align-item-center gap-4 mt-4">
          <div className="column gap-2 text-dark-3 font-medium font-sm">
            <label htmlFor="supplier_email">Email</label>
            <input
              type={"email"}
              name="supplier_email"
              id="supplier_email"
              defaultValue={email}
              placeholder="Email"
              className="border-default pa-2 border-radius-soft font-medium font-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="column gap-2 text-dark-3 font-medium font-sm">
            <label htmlFor="supplier_status">Escolher status</label>
            <select
              name="supplier_status"
              id="supplier_status"
              defaultValue={status}
              className="border-default pa-2 border-radius-soft font-medium font-md"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Escolher status</option>
              <option value={true}>Ativo</option>
              <option value={false}>Desativado</option>
            </select>
          </div>
        </div>

        <div className="column gap-2 text-dark-3 font-medium font-sm mt-4">
          <label htmlFor="supplier_observation">Observações</label>
          <textarea
            name="supplier_observation"
            id="supplier_observation"
            defaultValue={observation}
            placeholder="Informações importantes sobre o fornecedor"
            className="border-default pa-2 border-radius-soft font-medium font-md"
            onChange={(e) => setObservation(e.target.value)}
          ></textarea>
        </div>

        <hr className="my-4" />

        <div className="row jc-between ai-center">
          <button
            type={"submit"}
            className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
          >
            {supplier?.id ? "Atualizar" : "Concluir"}
          </button>
        </div>
      </form>
    </DialogDefault>
  );
}
