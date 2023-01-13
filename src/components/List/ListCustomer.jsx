import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PencilSimple, Trash } from "phosphor-react";
import { deleteCustomer } from "../../services/customerService";
import DialogCustomer from "../Dialog/DialogCustomer";
import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function ListCustomers({ reloadList, customersList }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  async function manageRemove(id) {
    if (id) {
      const data = {
        idCustomer: id,
      };

      await deleteCustomer(data)
        .then((response) => {
          if (response.status === 200) {
            handleMessageBox("success", "Cliente removido");
            reloadList();
          } else {
            handleMessageBox("failed", "Não foi possível remover o cliente");
          }
        })
        .catch(() => {
          handleMessageBox("failed", "Não foi possível remover o cliente");
        });
    }
  }

  function reload() {
    setOpen(false);
    reloadList();
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <>
      {customersList.length > 0 ? (
        <ol className="column gap-4">
          {customersList.map((customer, index) => (
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
                      reloadList={reload}
                    />
                  </Dialog.Root>
                  <Trash
                    className="icon-default btn-icon"
                    onClick={() => manageRemove(customer.id)}
                  />
                </div>
              </li>
              {index < customersList.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ol>
      ) : (
        <div className="mx-auto">
          <p className="font-lg font-light">Não há clientes cadastrados</p>
        </div>
      )}
    </>
  );
}
