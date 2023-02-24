import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Copy, PencilSimple, Share, TrashSimple } from "phosphor-react";

import { createInquiryItem } from "../../../../../../services/inquiryItemService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";
import DialogItem from "../../../../../../components/Dialog/DialogItem.jsx";
import DialogDeleteItem from "../Dialog/DialogDeleteItem";

export default function ItemTableRow({
  item,
  reloadList,
  changeTab,
  brandList,
  encapList,
  typeList,
}) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  async function createInquiry(item) {
    const data = {
      idItem: item.item.id,
      idUser: userSession.token,
      leadtime: "",
      datacode: "",
      condition: "",
    };
    await createInquiryItem(data)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Item enviado para cotação");
        // navigate("/main/inquiry");
        changeTab(1);
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível enviar para cotação");
      });
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Texto copiado");
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  function closeModal() {
    setOpen(false);
    setOpenDelete(false);
  }
  return (
    <tr>
      <td>
        <div className="row">
          <div className="row gap-2">
            <button
              type="button"
              onClick={() => copyText(item.item.description)}
              className="row align-items-center bg-transparent"
            >
              <Copy className="icon-sm" />
            </button>
            {item.item.description}
          </div>
        </div>
      </td>
      <td>{item.item.type.description}</td>
      <td>{item.item.encap.description}</td>
      <td>{item.item.brand.description}</td>
      <td className="gap-2">
        <div className="row align-items-center justify-content-between gap-1">
          <button
            className="row align-items-center bg-green-1 text-white-1 pa-1 border-radius-soft"
            type="button"
            title="Cotar item"
            onClick={() => createInquiry(item)}
          >
            <Share className="icon-sm" />
          </button>
          {userSession.isAdmin && (
            <>
              <button
                className="row align-items-center bg-blue-1 text-white-1 pa-1 border-radius-soft"
                type="button"
                title="Editar item"
                onClick={() => setOpen(true)}
              >
                <PencilSimple className="icon-sm" />
              </button>
              <DialogItem
                item={item.item}
                onClose={closeModal}
                reloadList={reloadList}
                open={open}
                idUser={userSession.token}
                brandList={brandList}
                encapList={encapList}
                typeList={typeList}
              />

              <button
                className="row align-items-center bg-red-1 text-white-1 pa-1 border-radius-soft"
                type="button"
                title="Apagar item"
                onClick={() => setOpenDelete(true)}
              >
                <TrashSimple className="icon-sm" />
              </button>
              <DialogDeleteItem
                item={item}
                onClose={closeModal}
                open={openDelete}
                reload={reloadList}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
