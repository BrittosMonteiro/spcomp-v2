import { CircleNotch } from "phosphor-react";
import { useState } from "react";
import { updateOrderAddItems } from "../../services/orderListService";
import DialogDefault from "./DialogDefault";

export default function DialogAddNewItemToOrder({
  open,
  idOrder,
  onClose,
  reloadOrderList,
  pendingItems,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addItemToSelected(id) {
    const pos = selectedItems.indexOf(id);
    if (pos === -1) {
      selectedItems.push(id);
    } else {
      selectedItems.splice(pos, 1);
    }

    setSelectedItems(selectedItems);
  }

  async function addItemsToOrder() {
    setIsLoading(true);

    await updateOrderAddItems({ idOrder, items: selectedItems })
      .then((responseCreate) => {
        if (responseCreate.status === 200) {
          reloadOrderList();
          onClose();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row">
        <h1 className="font-lg font-medium">Itens pendentes</h1>
      </div>
      <table className="table">
        <tbody>
          {pendingItems.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onClick={() => addItemToSelected(item.idInquiryItem)}
                />
              </td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>USD {item.unitPurchasePrice}</td>
              <td>R$ {item.unitSalePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <button
          type="button"
          className="flex gap-2 ai-center bg-green-1 text-white-1 pa-2 font-md font-medium"
          onClick={() => addItemsToOrder()}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircleNotch className="icon-default spinning" />
          ) : (
            "Adicionar"
          )}
        </button>
      </div>
    </DialogDefault>
  );
}
