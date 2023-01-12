import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Icons
import {
  ArchiveBox,
  CheckCircle,
  Copy,
  DotsThreeVertical,
  PencilSimple,
  Question,
  ShoppingCart,
  Tag,
  TrashSimple,
  WarningCircle,
} from "phosphor-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

//Components
import DialogItem from "../Dialog/DialogItem";

//Services
import {
  createInquiryItem,
  deleteInquiryItem,
} from "../../services/inquiryItemService";
import { deleteItem } from "../../services/itemService";
import { addItemToPurchaseList } from "../../services/purchaseService";
import { deleteItemFromPurchaseList } from "../../services/purchaseService";
import { deleteStockItem, postStockItem } from "../../services/stockService";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function ListItem({ item, hasLink, reloadList }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function setInquiryItem(item) {
    item.status = "Pendente";
    item.step = 1;
    item.quantity = 0;
    item.unitPrice = 0;
    item.unitSalePrice = 0;
    item.unitPurchasePrice = 0;
    item.idUser = userSession.token;
    item.nameUser = userSession.username;

    createInquiryItem(item)
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
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", true, "Nao foi possível remover");
      });
  }

  async function deleteFromItemInquiry(data) {
    await deleteInquiryItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item removido");
        reloadList();
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

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Texto copiado");
  }

  return (
    <li className="column py-4 gap-2">
      <div className="row justify-content-between">
        <div className="row gap-4">
          <div className="column gap-1">
            <span className="font-light font-sm">Quantity</span>
            {item.quantity ? (
              <span className="font-medium font-md">{item.quantity}</span>
            ) : (
              "-"
            )}
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Description</span>
            <div className="row gap-2">
              {hasLink && userSession.isAdmin ? (
                <Link
                  to={`/admin-route/inquiry/item/${item.id}`}
                  className="font-medium font-md text-dark-3"
                >
                  {item.description}
                </Link>
              ) : (
                <span className="font-medium font-md">{item.description}</span>
              )}
              <button type="button" className="bg-transparent">
                <Copy
                  alt="Copar texto"
                  className="icon-default"
                  onClick={() => copyText(item.description)}
                />
              </button>
            </div>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Type</span>
            <span className="font-medium font-md">{item.type}</span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Encap</span>
            <span className="font-medium font-md">{item.encap}</span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Brand</span>
            <span className="font-medium font-md">{item.brand}</span>
          </div>
        </div>
        <div className="row align-items-center gap-4">
          <div className="row gap-2">
            {item.unitPurchasePrice && item.unitSalePrice ? (
              <CheckCircle
                alt="Item cotado"
                className="icon-default text-green-1"
              />
            ) : null}
            {item.quantity <= 0 && (
              <WarningCircle
                alt="Informar a quantidade"
                className="icon-default text-orange-1"
              />
            )}
            <button
              type="button"
              className="bg-transparent"
              onClick={() => setOpen(true)}
            >
              <PencilSimple className="icon-default" />
            </button>
            <DialogItem
              item={item}
              onClose={closeModal}
              reloadList={reloadList}
              open={open}
              idUser={userSession.token}
            />

            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="bg-transparent">
                <DotsThreeVertical className="icon-default" />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-white-1 border-default border-radius-soft pa-2 gap-4 column font-medium font-md">
                  {item.step !== 1 && (
                    <DropdownMenu.Item
                      className="row align-items-center gap-2"
                      onClick={() => setInquiryItem(item)}
                    >
                      <Question className="icon-default" /> Cotar
                    </DropdownMenu.Item>
                  )}

                  {item.step >= 1 &&
                  item.quantity > 0 &&
                  item.unitPurchasePrice &&
                  item.unitSalePrice &&
                  (item.idUser === userSession.token || userSession.isAdmin) ? (
                    <DropdownMenu.Item
                      className="row align-items-center gap-2"
                      onClick={() => setPurchaseItem(item)}
                    >
                      <ShoppingCart className="icon-default" /> Solicitar compra
                    </DropdownMenu.Item>
                  ) : null}

                  {item.step === 2 && item.status === "Concluído" && (
                    <DropdownMenu.Item
                      className="row align-items-center gap-2"
                      onClick={() => moveToStock(item)}
                    >
                      <ArchiveBox className="icon-default" /> Mover para estoque
                    </DropdownMenu.Item>
                  )}

                  {item.step === 3 && (
                    <DropdownMenu.Item className="row align-items-center gap-2">
                      <Tag className="icon-default" /> Criar pedido
                    </DropdownMenu.Item>
                  )}

                  {item.idUser === userSession.token || userSession.isAdmin ? (
                    <DropdownMenu.Item
                      className="row align-items-center gap-2"
                      onClick={() => removeItem(item)}
                    >
                      <TrashSimple className="icon-default" /> Remover
                    </DropdownMenu.Item>
                  ) : null}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
      {item.idUser && item.idUser !== userSession.token ? (
        <div className="row">
          <span className="font-sm font-light">
            Vendedor: <span className="font-bold">{item.nameUser}</span>
          </span>
        </div>
      ) : null}
    </li>
  );
}
