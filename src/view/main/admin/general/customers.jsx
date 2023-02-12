import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import DialogCustomer from "../../../../components/Dialog/DialogCustomer";
import { readCustomers } from "../../../../services/customerService";
import CustomersTable from "./Components/TablesAndRows/CustomersTable";

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [customersList, setCustomersList] = useState([]);

  async function getCustomers() {
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
    getCustomers();
  }, []);

  function reloadList() {
    getCustomers();
    setOpen(false);
  }

  return (
    <>
      <div className="flex jc-between ai-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="action-btn font-medium font-sm pa-1 border-radius-soft">
            Adicionar novo cliente
          </Dialog.Trigger>
          <DialogCustomer reloadList={reloadList} />
        </Dialog.Root>
      </div>
      <CustomersTable customersList={customersList} reloadList={reloadList} />
    </>
  );
}
