import { useEffect, useState } from "react";

import { readEncap } from "../../../../services/encapService";
import DialogEncap from "./Components/Dialog/DialogEncap";
import EncapsTable from "./Components/TablesAndRows/EncapsTable";

export default function Encaps() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");

  async function loadEncaps() {
    setContentMessage("Carregando informações");

    await readEncap()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setList(res.data))
      .catch(() => {
        setContentMessage("Não foi possível carregar. Tente mais tarde");
      })
      .finally(() => {
        if (list.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há encapsulamentos cadastrados");
        }
      });
  }

  useEffect(() => {
    loadEncaps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <div className="row">
        <button
          type="button"
          className="action-btn pa-1 border-radius-soft font-sm font-medium"
          onClick={() => setOpen(true)}
        >
          Adicionar encapsulamento
        </button>
        <DialogEncap
          open={open}
          onClose={closeModal}
          title={"Novo encapsulamento"}
          reload={loadEncaps}
        />
      </div>
      {list.length > 0 ? (
        <EncapsTable list={list} reload={loadEncaps} />
      ) : (
        <div className="row">
          <p className="font-md font-medium">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
