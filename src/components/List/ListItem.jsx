import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Icons
import {
  ArchiveBox,
  DotsThreeVertical,
  PencilSimple,
  Question,
  ShoppingCart,
  Tag,
  TrashSimple,
} from "phosphor-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

//Components
import DialogItem from "../Dialog/DialogItem";

//Services
import {
  addItemToInquiryList,
  deleteItemFromInquiryList,
} from "../../services/inquiryService";
import { deleteItem } from "../../services/itemService";
import { addItemToPurchaseList } from "../../services/purchaseService";
import { deleteItemFromPurchaseList } from "../../services/purchaseService";
import { deleteStockItem, postStockItem } from "../../services/stockService";
import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function ListItem({ item }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function setInquiryItem(item) {
    item.status = "Pendente";
    item.step = 1;
    item.quantity = 0;
    item.unitPrice = 0;
    item.unitSalePrice = 0;
    item.unitPurchasePrice = 0;

    addItemToInquiryList(item)
      .then(() => {
        navigate("/main/inquiry");
        handleMessageBox("success", true, "Item enviado para cotação");
      })
      .catch(() => {
        handleMessageBox(
          "success",
          true,
          "Não foi possível mover para cotação"
        );
      });
  }

  async function setPurchaseItem(item) {
    if (!item.quantity || !item.unitPurchasePrice || !item.unitSalePrice)
      return;

    item.step = 2;

    await addItemToPurchaseList(item)
      .then(() => {
        navigate("/main/purchase");
        handleMessageBox("success", true, "Item movido para compras");
      })
      .catch(() => {
        handleMessageBox("failed", true, "Não foi possível mover para compras");
      });
  }

  async function moveToStock(item) {
    item.step = 3;
    item.status = "Reservado";
    await postStockItem(item)
      .then(() => {
        navigate("/stock");
        handleMessageBox("success", true, "Item movido para o estoque");
      })
      .catch(() => {
        handleMessageBox(
          "failed",
          true,
          "Não foi possível mover para o estoque"
        );
      });
  }

  function removeItem(item) {
    const data = {
      id: item.id,
    };

    switch (item.step) {
      case 1:
        deleteFromItemInquiry(data);
        break;
      case 2:
        deleteFromItemPurchase(data);
        break;
      case 3:
        deleteFromItemStock(data);
        break;
      default:
        deleteFromItemList(data);
        break;
    }
  }

  async function deleteFromItemList(data) {
    await deleteItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item removido");
      })
      .catch(() => {
        handleMessageBox("failed", true, "Nao foi possível remover");
      });
  }

  async function deleteFromItemInquiry(data) {
    await deleteItemFromInquiryList(data)
      .then(() => {
        handleMessageBox("success", true, "Item removido");
      })
      .catch(() => {
        handleMessageBox("failed", true, "Nao foi possível remover");
      });
  }

  async function deleteFromItemPurchase(data) {
    await deleteItemFromPurchaseList(data)
      .then(() => {
        handleMessageBox("success", true, "Item removido");
      })
      .catch(() => {
        handleMessageBox("failed", true, "Nao foi possível remover");
      });
  }

  async function deleteFromItemStock(data) {
    await deleteStockItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item removido");
      })
      .catch(() => {
        handleMessageBox("failed", true, "Nao foi possível remover");
      });
  }

  function handleMessageBox(color, display, message) {
    dispatch(displayMessageBox({ color, display, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <li>
      <div className="row justify-content-between align-items-center pa-2 border-radius-soft border-default">
        <div className="row gap-4">
          <div className="column gap-2">
            <div className="row gap-2">
              <span className="font-medium font-md">{item.description}</span>-
              <span className="font-medium font-md">{item.brand}</span>
            </div>
            <div className="row gap-4">
              {item.quantity ? (
                <>
                  <span className="font-medium font-md">
                    Quantidade: {item.quantity}
                  </span>{" "}
                  -{" "}
                </>
              ) : null}
              <span className="font-medium font-md">Tipo: {item.type}</span>-
              <span className="font-medium font-md">Enc.: {item.encap}</span>-
              <span className="font-medium font-md">
                IPI: {item.ipi ? item.ipi : "-"}
              </span>
              -
              <span className="font-medium font-md">
                Peso: {item.weight ? item.weight : "-"}
              </span>
              {item.status ? (
                <>
                  -
                  <span className="font-medium font-md">
                    Status: {item.status}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-transparent"
            onClick={() => setOpen(true)}
          >
            <PencilSimple className="icon-default" />
          </button>
          <DialogItem item={item} onClose={closeModal} open={open} />

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="bg-transparent">
              <DotsThreeVertical className="icon-default" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className="bg-white-1 border-default border-radius-soft pa-2 gap-4 column font-medium font-md">
                {item.step !== 1 ? (
                  <DropdownMenu.Item
                    className="row align-items-center gap-2"
                    onClick={() => setInquiryItem(item)}
                  >
                    <Question className="icon-default" /> Cotar
                  </DropdownMenu.Item>
                ) : null}
                {item.step >= 1 ? (
                  <DropdownMenu.Item
                    className="row align-items-center gap-2"
                    onClick={() => setPurchaseItem(item)}
                  >
                    <ShoppingCart className="icon-default" /> Solicitar compra
                  </DropdownMenu.Item>
                ) : null}

                {item.step === 2 && item.status === "Concluído" ? (
                  <DropdownMenu.Item
                    className="row align-items-center gap-2"
                    onClick={() => moveToStock(item)}
                  >
                    <ArchiveBox className="icon-default" /> Mover para estoque
                  </DropdownMenu.Item>
                ) : null}

                {item.step === 3 ? (
                  <DropdownMenu.Item className="row align-items-center gap-2">
                    <Tag className="icon-default" /> Criar pedido
                  </DropdownMenu.Item>
                ) : null}
                <DropdownMenu.Item
                  className="row align-items-center gap-2"
                  onClick={() => removeItem(item)}
                >
                  <TrashSimple className="icon-default" /> Remover
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </li>
  );
}
