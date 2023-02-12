import { useEffect, useState } from "react";

import { readEncap } from "../../../../services/encapService";
import DialogEncap from "./Components/Dialog/DialogEncap";
import EncapsTable from "./Components/TablesAndRows/EncapsTable";

export default function Encaps() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  function closeModal() {
    setOpen(false);
  }

  async function loadEncaps() {
    await readEncap()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setList(res.data))
      .catch(() => {});
  }

  useEffect(() => {
    loadEncaps();
  }, []);

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
      <EncapsTable list={list} reload={loadEncaps} />
    </>
  );
}
