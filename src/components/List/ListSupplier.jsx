import { PencilSimple, Trash } from "phosphor-react";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogSupplier from "../Dialog/DialogSupplier";
import { removeSupplier } from "../../services/supplierService";

export default function ListSupplier(props) {
  const [open, setOpen] = useState(false);

  function manageRemove(id) {
    if (!id) return;

    const data = {
      id: id,
    };

    removeSupplier(data)
      .then((res) => res.json())
      .then(() => props.reloadList())
      .catch((err) => console.log(err));
  }

  function reloadList() {
    setOpen(false);
    props.reloadList();
  }

  return (
    <>
      {props.suppliersList.length > 0 ? (
        <ol className="gap-4 column">
          {props.suppliersList.map((supplier, index) => (
            <React.Fragment key={supplier.id}>
              <li className="row align-items-center justify-content-between py-2">
                <div
                  className="row align-items-center gap-2"
                  title={"Administrador"}
                >
                  <span className="font-md font-medium">{supplier.name}</span>
                </div>
                <div className="row gap-2">
                  <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger className="bg-transparent">
                      <PencilSimple className="icon-default" />
                    </Dialog.Trigger>
                    <DialogSupplier
                      supplierData={supplier}
                      reloadList={reloadList}
                    />
                  </Dialog.Root>
                  <Trash
                    className="icon-default btn-icon"
                    onClick={() => manageRemove(supplier.id)}
                  />
                </div>
              </li>

              {index < props.suppliersList.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ol>
      ) : null}
    </>
  );
}
