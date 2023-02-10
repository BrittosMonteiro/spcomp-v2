import { XCircle } from "phosphor-react";
import { useState } from "react";
import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { createImportHistory } from "../../../../../../services/importsHistory";

export default function DialogCreateImport({ open, onClose, reload }) {
  const importTitleDefault = new Date().toISOString().split("T")[0];
  const [importName, setImportName] = useState(importTitleDefault);

  function handleImport(e) {
    e.preventDefault();
    createNewImport();
  }

  async function createNewImport() {
    const data = {
      title: importName || importTitleDefault,
    };

    await createImportHistory(data)
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          reload();
          onClose();
        }
      })
      .catch((err) => {});
  }

  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="column gap-4">
        <div className="row jc-between ai-start">
          <h1 className="font-lg font-medium">Criar importação</h1>
          <button
            type="button"
            className="flex bg-red-1 text-white-1 border-radius-soft pa-1"
            onClick={() => onClose()}
          >
            <XCircle className="icon-default" />
          </button>
        </div>
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
              className="bg-green-1 text-white-1 pa-1 border-radius-soft"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </DialogDefault>
  );
}
