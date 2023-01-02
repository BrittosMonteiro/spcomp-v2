import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import DialogCustomer from "../../components/Dialog/DialogCustomer";
import ListCustomers from "../../components/List/ListCustomer";
import { getCustomersList } from "../../services/customerService";

export default function Customers() {
  const [open, setOpen] = useState(false);
  const [customersList, setCustomersList] = useState([]);

  function getCustomers() {
    getCustomersList()
      .then((res) => res.json())
      .then((res) => {
        setCustomersList(res);
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
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Clientes"} />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="font-medium font-sm bg-transparent">
            Adicionar novo cliente
          </Dialog.Trigger>
          <DialogCustomer reloadList={reloadList} />
        </Dialog.Root>
      </div>
      <ListCustomers customersList={customersList} reloadList={reloadList} />
    </>
  );
}
