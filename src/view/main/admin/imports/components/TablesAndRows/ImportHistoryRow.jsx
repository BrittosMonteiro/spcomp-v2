import {
  AirplaneLanding,
  AirplaneTakeoff,
  ToggleLeft,
  ToggleRight,
  TrashSimple,
} from "phosphor-react";
import { useState } from "react";
import {
  deleteImportHistory,
  updateImportHistory,
} from "../../../../../../services/importsHistory";
import DialogImportHistoryOrders from "../Dialog/DialogImportHistoryOrders";

export default function ImportHistoryRow({ item, reload }) {
  const [open, setOpen] = useState(false);

  async function updateImportItem() {
    const data = {
      idImportHistory: item.idImportHistory,
      data: {
        status: !item.status,
      },
    };

    await updateImportHistory(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reload();
        }
      })
      .catch((err) => {});
  }

  async function deleteImport() {
    await deleteImportHistory({ idImportHistory: item.idImportHistory })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reload();
        }
      })
      .catch();
  }

  async function hasImportArrived() {}

  function closeModal() {
    setOpen(false);
  }

  return (
    <tr>
      <td>
        <button
          type="button"
          className="bg-transparent font-sm font-medium"
          onClick={() => setOpen(true)}
        >
          {item.title}
        </button>
        <DialogImportHistoryOrders
          idImportHistory={item.idImportHistory}
          onClose={closeModal}
          open={open}
        />
      </td>
      <td>{item.createdAt}</td>
      <td>
        <button
          type="button"
          className="flex bg-transparent"
          onClick={() => updateImportItem()}
        >
          {item.status ? (
            <button className="flex bg-green-1 text-white-1 pa-1 border-radius-soft">
              <ToggleLeft className="icon-default" />
            </button>
          ) : (
            <button className="flex bg-red-1 text-white-1 pa-1 border-radius-soft">
              <ToggleRight className="icon-default" />
            </button>
          )}
        </button>
      </td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => deleteImport()}
          >
            <TrashSimple className="icon-sm" />
          </button>
          <button
            type="button"
            className="bg-green-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => hasImportArrived()}
          >
            {item.hasArrived ? (
              <AirplaneLanding
                alt="Confirmar chegada da importação"
                className="icon-sm"
              />
            ) : (
              <AirplaneTakeoff
                alt="Confirmar chegada da importação"
                className="icon-sm"
              />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
