import { useEffect, useState } from "react";

import { readType } from "../../../../services/typeService";
import DialogType from "./Components/Dialog/DialogType";
import TypesTable from "./Components/TablesAndRows/TypesTable";

export default function Types() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");

  async function loadTypes() {
    setContentMessage("Carregando informações");

    await readType()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setList(response.data);
      })
      .catch(() => {
        setContentMessage("Não foi possível carregar. Tente mais tarde");
      })
      .finally(() => {
        if (list.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há tipos cadastrados");
        }
      });
  }

  useEffect(() => {
    loadTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {list.length > 0 ? (
        <TypesTable list={list} reload={loadTypes} onClose={closeModal} />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
