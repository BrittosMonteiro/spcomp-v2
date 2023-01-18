import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Copy,
  DotsThreeVertical,
  PencilSimple,
  Question,
  TrashSimple,
} from "phosphor-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import DialogItem from "../Dialog/DialogItem";

import { createInquiryItem } from "../../services/inquiryItemService";
import { deleteItem } from "../../services/itemService";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function ListItem({ item, reloadList }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function createInquiry(item) {
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

  async function deleteItemFromList(data) {
    await deleteItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item removido");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", true, "Nao foi possível remover");
      });
  }

  function closeModal() {
    setOpen(false);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", true, "Texto copiado");
  }

  function handleMessageBox(color, display, message) {
    dispatch(displayMessageBox({ color, display, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <li className="column py-4 gap-2">
      <div className="row justify-content-between">
        <div className="row gap-4">
          <div className="column gap-1">
            <span className="font-light font-sm">Description</span>
            <div className="row gap-2">
              {userSession.isAdmin ? (
                <Link
                  to={`/admin/inquiry/item/${item.id}`}
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
            <span className="font-medium font-md">{item.type.description}</span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Encap</span>
            <span className="font-medium font-md">
              {item.encap.description}
            </span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Brand</span>
            <span className="font-medium font-md">
              {item.brand.description}
            </span>
          </div>
        </div>
        <div className="row align-items-center gap-4">
          <div className="row gap-2">
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
                  <DropdownMenu.Item
                    className="row align-items-center gap-2"
                    onClick={() => createInquiry(item)}
                  >
                    <Question className="icon-default" /> Cotar
                  </DropdownMenu.Item>

                  {userSession.isAdmin && (
                    <DropdownMenu.Item
                      className="row align-items-center gap-2"
                      onClick={() => deleteItemFromList(item)}
                    >
                      <TrashSimple className="icon-default" /> Remover
                    </DropdownMenu.Item>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </li>
  );
}
