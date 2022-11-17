import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PencilSimple, Trash } from "phosphor-react";
import { removeCustomer } from "../../services/customerService";
import DialogCustomer from "../Dialog/DialogCustomer";

export default function ListCustomers(props) {
  const [open, setOpen] = useState(false);

  function manageRemove(id) {
    if (id) {
      const data = {
        id: id,
      };

      removeCustomer(data)
        .then(() => {
          props.reloadList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function reloadList() {
    setOpen(false);
    props.reloadList();
  }

  return (
    <>
      {props.customersList.length > 0 ? (
        <ol className="column gap-4">
          {props.customersList.map((customer, index) => (
            <React.Fragment key={customer.id}>
              <li className="row align-items-center justify-content-between py-2">
                <div className="row align-items-center gap-2">
                  <span className="font-md font-medium">{customer.name}</span>
                </div>
                <div className="row gap-2">
                  <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger className="bg-transparent">
                      <PencilSimple className="icon-default" />
                    </Dialog.Trigger>
                    <DialogCustomer
                      customerData={customer}
                      reloadList={reloadList}
                    />
                  </Dialog.Root>
                  <Trash
                    className="icon-default btn-icon"
                    onClick={() => manageRemove(customer.id)}
                  />
                </div>
              </li>
              {index < props.customersList.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ol>
      ) : null}
    </>
  );
}
