import { useEffect, useState } from "react";

import { readBrands } from "../../../../services/brandService";
import BrandsTable from "./Components/TablesAndRows/BrandsTable";
import DialogBrand from "./Components/Dialog/DialogBrand";

export default function Brands() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");

  async function loadBrands() {
    setContentMessage("Carregando informações");

    await readBrands()
      .then((responseRead) => {
        if (responseRead) {
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
          setContentMessage("Não há marcas cadastradas");
        }
      });
  }

  useEffect(() => {
    loadBrands();
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
          Adicionar marca
        </button>
        <DialogBrand
          open={open}
          onClose={closeModal}
          reload={loadBrands}
          title={"Nova marca"}
        />
      </div>
      {list.length > 0 ? (
        <BrandsTable list={list} reload={loadBrands} />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
