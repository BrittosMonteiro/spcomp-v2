import { CircleNotch } from "phosphor-react";
import { useEffect } from "react";
import { useState } from "react";
import { createOrderListItem } from "../../services/orderListService";
import { readSuppliersSimple } from "../../services/supplierService";
import DialogDefault from "./DialogDefault";

export default function DialogCreateOrder({ open, onClose, reloadOrdersList }) {
  const [supplierList, setSupplierList] = useState([]);
  const [idSupplier, setIdSupplier] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function createOrder() {
    if (!idSupplier) return;

    setIsLoading(true);

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
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    async function loadSupplierSimple() {
      await readSuppliersSimple()
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
    }

    loadSupplierSimple();
  }, []);

  return (
    <DialogDefault open={open} onClose={onClose} title={"Criar novo pedido"}>
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
          className="flex gap-2 ai-center bg-green-1 text-white-1 pa-2 font-md font-medium"
          onClick={() => createOrder()}
          title={"Criar novo pedido"}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircleNotch className="icon-default spinning" />
          ) : (
            "Criar"
          )}
        </button>
      </div>
    </DialogDefault>
  );
}
