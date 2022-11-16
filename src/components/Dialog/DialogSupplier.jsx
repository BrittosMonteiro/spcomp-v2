import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { postSupplier, putSupplier } from "../../services/supplierService";

export default function DialogSupplier(props) {
  const [id, setId] = useState(null);
  const [supplierName, setSupplierName] = useState(null);
  const [contactName, setContactName] = useState(null);
  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState(null);
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    if (props.supplierData) {
      setId(props.supplierData.id);
      setSupplierName(props.supplierData.name);
      setContactName(props.supplierData.contact);
      setEmail(props.supplierData.email);
      setStatus(props.supplierData.status);
      setObservation(props.supplierData.observation);
    }
  }, [props.supplierData]);

  function handleUser(e) {
    e.preventDefault();
    if (!supplierName || !contactName || !email) return;

    const supplier = {
      supplierName,
      contactName,
      email,
      status,
      observation,
    };

    if (!id) {
      postSupplier(supplier)
        .then((res) => res.json())
        .then(() => {
          props.reloadList();

          setId(null);
          setSupplierName(null);
          setContactName(null);
          setStatus(null);
          setEmail(null);
          setObservation(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      supplier.id = id;
      putSupplier(supplier)
        .then((res) => res.json())
        .then(() => {
          props.reloadList();

          setId(null);
          setSupplierName(null);
          setContactName(null);
          setEmail(null);
          setStatus(null);
          setObservation(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay">
          <Dialog.Content className="dialog">
            <Dialog.Title className="font-medium font-lg">
              {id ? "Informações do" : "Adicionar"} fornecedor
            </Dialog.Title>
            <form onSubmit={handleUser}>
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

              <div className="row justify-content-between align-items-center">
                <Dialog.Close className="font-medium font-md text-red-1 bg-transparent">
                  Fechar
                </Dialog.Close>
                <button
                  type={"submit"}
                  className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
                >
                  {id ? "Atualizar" : "Concluir"}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </>
  );
}
