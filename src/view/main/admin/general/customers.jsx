import { useEffect, useState } from "react";

import { readCustomers } from "../../../../services/customerService";
import DialogCustomer from "./Components/Dialog/DialogCustomer";
import CustomersTable from "./Components/TablesAndRows/CustomersTable";

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");

  async function loadCustomers() {
    setContentMessage("Carregando informações");

    await readCustomers()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setCustomersList(res.data);
      })
      .catch(() => {
        setContentMessage("Não foi possível carregar. Tente mais tarde");
      })
      .finally(() => {
        if (customersList.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há clientes cadastrados");
        }
      });
  }

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
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
          Adicionar novo cliente
        </button>
        <DialogCustomer
          open={open}
          onClose={closeModal}
          reload={loadCustomers}
        />
      </div>
      {customersList.length > 0 ? (
        <CustomersTable customersList={customersList} reload={loadCustomers} />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
