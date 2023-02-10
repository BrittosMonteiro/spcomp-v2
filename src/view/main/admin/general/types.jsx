import { useEffect, useState } from "react";
import { readType } from "../../../../services/typeService";
import DialogType from "./Components/Dialog/DialogType";
import TypesTable from "./Components/TablesAndRows/TypesTable";

export default function Types() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  async function loadTypes() {
    await readType()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setList(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    loadTypes();
  }, []);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <div className="row jc-between ai-start">
        <button
          type="button"
          className="action-btn border-radius-soft pa-1 font-sm font-medium"
          onClick={() => setOpen(true)}
        >
          Adicionar tipo
        </button>
        <DialogType
          open={open}
          onClose={closeModal}
          reload={loadTypes}
          title={"Novo tipo"}
        />
      </div>
      <TypesTable list={list} reload={loadTypes} onClose={closeModal} />
    </>
  );
}
