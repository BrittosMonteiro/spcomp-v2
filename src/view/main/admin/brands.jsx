import { useEffect, useState } from "react";
import { readBrands } from "../../../services/brandService";
import BrandsTable from "./Components/TablesAndRows/BrandsTable";
import DialogBrand from "./Components/Dialog/DialogBrand";

export default function Brands() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  async function loadBrands() {
    await readBrands()
      .then((responseRead) => {
        if (responseRead) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setList(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    loadBrands();
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
      <BrandsTable list={list} reload={loadBrands} />
    </>
  );
}
