import { XCircle } from "phosphor-react";
import { useEffect } from "react";
import { useState } from "react";
import { createOrderListItem } from "../../services/orderListService";
import { readSuppliersSimple } from "../../services/supplierService";
import DialogDefault from "./DialogDefault";

export default function DialogCreateOrder({ open, onClose, reloadOrdersList }) {
  const [supplierList, setSupplierList] = useState([]);
  const [idSupplier, setIdSupplier] = useState("");

  async function createOrder() {
    if (!idSupplier) return;

    await createOrderListItem({ idSupplier })
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          return responseCreate.json();
        }
      })
      .then(() => {
        reloadOrdersList(1);
        onClose();
      })
      .catch((err) => {});
  }

  useEffect(() => {
    readSuppliersSimple()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setSupplierList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium text-dark-1">Criar novo pedido</h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <div className="column gap-2">
        <label htmlFor="supplier_order" className="font-sm font-regular">
          Fornecedor
        </label>
        <select
          name="supplier_order"
          id="supplier_order"
          className="border-default pa-2 font-md font-medium border-radius-soft"
          defaultValue={idSupplier}
          onChange={(e) => setIdSupplier(e.target.value)}
        >
          <option>Escolher fornecedor</option>
          {supplierList.map((sup) => (
            <option value={sup.idSupplier} key={sup.idSupplier}>
              {sup.name}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <button
          type="button"
          className="bg-green-1 text-white-1 pa-2 font-md font-medium"
          onClick={() => createOrder()}
          title={"Criar novo pedido"}
        >
          Criar
        </button>
      </div>
    </DialogDefault>
  );
}
