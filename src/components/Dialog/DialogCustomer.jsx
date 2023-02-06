import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer, updateCustomer } from "../../services/customerService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function DialogCustomer({ customerData, reloadList }) {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [cnpj, setCnpj] = useState(null);
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState(null);
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    if (customerData) {
      setId(customerData.id);
      setName(customerData.name);
      setCnpj(customerData.cnpj);
      setContact(customerData.contact);
      setEmail(customerData.email);
      setPhone(customerData.phone);
      setStatus(customerData.status);
      setObservation(customerData.observation);
    }
  }, [customerData]);

  function handleCustomer(e) {
    e.preventDefault();

    if (!name || !cnpj || !email) return;
    const customer = {
      name,
      cnpj,
      contact,
      email,
      phone,
      status,
      observation,
    };

    if (!id) {
      create(customer);
    } else {
      update(id, customer);
    }
  }

  async function create(customer) {
    await createCustomer(customer)
      .then((response) => {
        if (response.status !== 200) {
          handleMessageBox("failed", "Não foi possível adicionar o cliente");
        }
      })
      .then(() => {
        handleMessageBox("success", "Cliente criado com sucesso");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível adicionar o cliente");
      });
  }

  async function update(id, customer) {
    updateCustomer({ idCustomer: id, data: customer })
      .then((response) => {
        if (response.status !== 200) {
          handleMessageBox("failed", "Não foi possível atualizar o cliente");
        }
      })
      .then(() => {
        handleMessageBox("success", "Cliente atualizado com sucesso");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível atualizar o cliente");
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay">
          <Dialog.Content className="dialog">
            <Dialog.Title className="font-medium font-lg">
              {id ? "Informações do" : "Adicionar"} Cliente
            </Dialog.Title>
            <form onSubmit={handleCustomer}>
              <div className="row align-items-center justify-content-between gap-4 mt-4">
                <div className="column gap-2 font-md font-medium">
                  <label htmlFor="customer_name">Nome</label>
                  <input
                    type={"text"}
                    id="customer_name"
                    name="customer_name"
                    placeholder="Nome"
                    className="border-default border-radius-soft pa-2 font-md font-medium"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="column gap-2 font-md font-medium">
                  <label htmlFor="customer_cnpj">CNPJ</label>
                  <input
                    type={"text"}
                    id="customer_cnpj"
                    name="customer_cnpj"
                    placeholder="CNPJ"
                    className="border-default border-radius-soft pa-2 font-md font-medium"
                    defaultValue={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </div>
              </div>

              <div className="row align-items-center justify-content-between gap-4 mt-4">
                <div className="column gap-2 font-md font-medium">
                  <label htmlFor="customer_contact">Responsável</label>
                  <input
                    type={"text"}
                    id="customer_contact"
                    name="customer_contact"
                    placeholder="Responsável"
                    className="border-default border-radius-soft pa-2 font-md font-medium"
                    defaultValue={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="column gap-2 font-md font-medium">
                  <label htmlFor="customer_email">Email</label>
                  <input
                    type={"text"}
                    id="customer_email"
                    name="customer_email"
                    placeholder="Email"
                    className="border-default border-radius-soft pa-2 font-md font-medium"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="row align-items-center justify-content-between gap-4 mt-4">
                <div className="column gap-2 font-md font-medium">
                  <label htmlFor="customer_phone">Telefone</label>
                  <input
                    type={"text"}
                    id="customer_phone"
                    name="customer_phone"
                    placeholder="Telefone"
                    className="border-default border-radius-soft pa-2 font-md font-medium"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="column gap-2 font-md font-medium">
                  <label htmlFor="customer_status">Status</label>
                  <select
                    name="customer_status"
                    id="customer_status"
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

              <div className="column gap-2 mt-4 font-md font-medium">
                <label htmlFor="customer_observation">Observações</label>
                <textarea
                  id="customer_observation"
                  name="customer_observation"
                  placeholder="Observações importantes sobre o cliente"
                  className="border-default border-radius-soft font-md font-medium pa-2"
                  defaultValue={observation}
                  onChange={(e) => setObservation(e.target.value)}
                ></textarea>
              </div>

              <hr className="my-4" />

              <div className="row jc-between ai-center">
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
