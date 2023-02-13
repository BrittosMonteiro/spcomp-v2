import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import {
  createCustomer,
  updateCustomer,
} from "../../../../../../services/customerService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogCustomer({ open, onClose, reload, customer }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [cnpj, setCnpj] = useState(null);
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState(null);
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setCnpj(customer.cnpj);
      setContact(customer.contact);
      setEmail(customer.email);
      setPhone(customer.phone);
      setStatus(customer.status);
      setObservation(customer.observation);
    }
  }, [customer]);

  const statusOptions = [
    {
      key: true,
      value: "Ativo",
    },
    {
      key: false,
      value: "Desativado",
    },
  ];

  function handleCustomer(e) {
    e.preventDefault();

    if (!name || !cnpj || !email) return;
    const customerData = {
      name,
      cnpj,
      contact,
      email,
      phone,
      status,
      observation,
    };

    if (customer?.id) {
      update(customerData);
    } else {
      create(customerData);
    }
  }

  async function create(customerData) {
    await createCustomer(customerData)
      .then((response) => {
        if (response.status === 201) {
          handleMessageBox("success", "Cliente criado com sucesso");
          reload();
          onClose();
        } else {
          handleMessageBox("failed", "Não foi possível adicionar o cliente");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível adicionar o cliente");
      });
  }

  async function update(customerData) {
    updateCustomer({ idCustomer: customer.id, data: customerData })
      .then((response) => {
        if (response.status === 200) {
          handleMessageBox("success", "Cliente atualizado com sucesso");
          reload();
          onClose();
        } else {
          handleMessageBox("failed", "Não foi possível atualizar o cliente");
        }
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
    <DialogDefault open={open} onClose={onClose}>
      <div className="row">
        <h1 className="font-medium font-lg">
          {customer?.id ? "Informações do" : "Adicionar"} Cliente
        </h1>
      </div>
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
              {statusOptions.map((status, index) => (
                <option key={index} value={status.key}>
                  {status.value}
                </option>
              ))}
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
          <button
            type={"submit"}
            className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
          >
            {customer?.id ? "Atualizar" : "Concluir"}
          </button>
        </div>
      </form>
    </DialogDefault>
  );
}
