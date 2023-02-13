import { useEffect, useState } from "react";

import { readCustomers } from "../../../../services/customerService";
import DialogCustomer from "./Components/Dialog/DialogCustomer";
import CustomersTable from "./Components/TablesAndRows/CustomersTable";

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [customersList, setCustomersList] = useState([]);

  async function loadCustomers() {
    await readCustomers()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setCustomersList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadCustomers();
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
      <CustomersTable customersList={customersList} reload={loadCustomers} />
    </>
  );
}
