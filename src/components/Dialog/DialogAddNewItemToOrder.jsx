import { useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import { updateOrderAddItems } from "../../services/orderListService";
import DialogDefault from "./DialogDefault";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function DialogAddNewItemToOrder({
  open,
  idOrder,
  onClose,
  reloadOrderList,
  pendingItems,
}) {
  const dispatch = useDispatch();

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
          handleMessageBox("success", "Item incluído");
        } else {
          handleMessageBox("failed", "Não foi possível incluir o item");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível incluir o item");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <DialogDefault open={open} onClose={onClose} title={"Itens pendentes"}>
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
