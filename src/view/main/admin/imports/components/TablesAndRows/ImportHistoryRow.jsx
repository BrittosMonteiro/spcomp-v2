import { ToggleLeft, ToggleRight, TrashSimple } from "phosphor-react";
import { updateImportHistory } from "../../../../../../services/importsHistory";

export default function ImportHistoryRow({ item, reload }) {
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

  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.createdAt}</td>
      <td>
        <button
          type="button"
          className="flex bg-transparent"
          onClick={() => updateImportItem()}
        >
          {item.status ? (
            <ToggleLeft className="icon-default text-green-1" />
          ) : (
            <ToggleRight className="icon-default text-red-1" />
          )}
        </button>
      </td>
      <td>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
        >
          <TrashSimple className="icon-default" />
        </button>
      </td>
    </tr>
  );
}
