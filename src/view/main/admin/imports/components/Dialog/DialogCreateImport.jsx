import { useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { createImportHistory } from "../../../../../../services/importsHistory";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogCreateImport({ open, onClose, reload }) {
  const dispatch = useDispatch();

  const importTitleDefault = new Date().toISOString().split("T")[0];
  const [importName, setImportName] = useState(importTitleDefault);
  const [isLoading, setIsLoading] = useState(false);

  function handleImport(e) {
    e.preventDefault();
    createNewImport();
  }

  async function createNewImport() {
    const data = {
      title: importName || importTitleDefault,
    };

    setIsLoading(true);

    await createImportHistory(data)
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          reload();
          onClose();
          handleMessageBox("success", "Importação criada");
        } else {
          handleMessageBox("failed", "Não foi possível criar a importação");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível criar a importação");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <DialogDefault open={open} onClose={onClose} title={"Criar importação"}>
      <div className="column gap-4">
        <form onSubmit={handleImport} className="column gap-4">
          <div className="row">
            <div className="column gap-2">
              <label htmlFor="importName" className="font-sm font-light">
                Nome da importação (opcional)
              </label>
              <input
                type={"text"}
                name="importName"
                id="importName"
                className="pa-2 border-default font-md font-medium"
                placeholder={`Nome padrão ${importTitleDefault}`}
                onChange={(e) => setImportName(e.target.value)}
              />
            </div>
          </div>
          <div className="row ai-start">
            <button
              type="submit"
              className="flex bg-green-1 text-white-1 pa-1 border-radius-soft font-md font-medium"
            >
              {isLoading ? (
                <CircleNotch className="icon-default spinning" />
              ) : (
                "Criar"
              )}
            </button>
          </div>
        </form>
      </div>
    </DialogDefault>
  );
}
