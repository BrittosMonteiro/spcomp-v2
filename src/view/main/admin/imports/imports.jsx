import { useEffect, useState } from "react";
import Card from "../../../../components/Common/Card";
import PageTitle from "../../../../components/Common/PageTitle";
import { readImportHistory } from "../../../../services/importsHistory";
import DialogCreateImport from "./components/Dialog/DialogCreateImport";
import ImportHistoryTable from "./components/TablesAndRows/ImportHistoryTable";

export default function Imports() {
  const [open, setOpen] = useState(false);
  const [importHistoryList, setImportHistoryList] = useState([]);

  async function loadImports() {
    await readImportHistory()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setImportHistoryList(response.data);
      })
      .catch((err) => {});
  }

  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    loadImports();
  }, []);

  return (
    <div className="column gap-4">
      <div className="row jc-between ai-start">
        <PageTitle title={"Importações"} />
        <button
          type="button"
          className="action-btn border-radius-soft pa-1"
          onClick={() => setOpen(true)}
        >
          Criar pedido
        </button>
        <DialogCreateImport
          onClose={closeModal}
          open={open}
          reload={loadImports}
        />
      </div>
      <Card>
        <ImportHistoryTable list={importHistoryList} reload={loadImports} />
      </Card>
    </div>
  );
}
