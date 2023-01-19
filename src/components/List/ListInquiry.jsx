import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Copy, PencilSimple, TrashSimple, RepeatOnce } from "phosphor-react";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import DialogInquiry from "../Dialog/DialogInquiry";
import {
  createInquiryItem,
  deleteInquiryItem,
} from "../../services/inquiryItemService";

export default function ListInquiry({ item, reloadList, customers }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [open, setOpen] = useState(false);

  async function duplicateInquiryItem(item) {
    const data = {
      idItem: item.item.id,
      idUser: userSession.token,
    };
    await createInquiryItem(data)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Item duplicado");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível duplicar o item");
      });
  }

  async function deleteItemFromList(idInquiryItem) {
    await deleteInquiryItem(idInquiryItem)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Item removido");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível remover o item");
      });
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Texto copiado");
  }

  function closeModal() {
    setOpen(false);
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));

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
                  to={`/admin/inquiry/item/${item.item.id}`}
                  className="font-medium font-md text-dark-3"
                >
                  {item.item.description}
                </Link>
              ) : (
                <span className="font-medium font-md">
                  {item.item.description}
                </span>
              )}
              <button type="button" className="bg-transparent">
                <Copy
                  alt="Copar texto"
                  className="icon-default"
                  onClick={() => copyText(item.item.description)}
                />
              </button>
            </div>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Type</span>
            <span className="font-medium font-md">
              {item.item.type.description}
            </span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Encap</span>
            <span className="font-medium font-md">
              {item.item.encap.description}
            </span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Brand</span>
            <span className="font-medium font-md">
              {item.item.brand.description}
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

            <DialogInquiry
              item={item}
              onClose={closeModal}
              open={open}
              reloadList={reloadList}
              customers={customers}
              userSession={userSession}
            />

            <button
              type="button"
              className="bg-transparent"
              onClick={() => duplicateInquiryItem(item)}
            >
              <RepeatOnce alt="Cotar novamente" className="icon-default" />
            </button>

            {(userSession.isAdmin || item.user.id === userSession.token) && (
              <button
                type="button"
                className="bg-transparent"
                onClick={() => deleteItemFromList(item)}
              >
                <TrashSimple alt="Remover item" className="icon-default" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="row align-items-center font-sm">
        <span>Criado em: {item.createdAt}</span>
        {(userSession.isAdmin || userSession.token !== item.user.id) && (
          <>
            &nbsp;por&nbsp;
            <span className="font-black">{item.user.username}</span>
          </>
        )}
      </div>
    </li>
  );
}