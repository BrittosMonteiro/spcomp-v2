import {
  ArrowCircleRight,
  ToggleLeft,
  ToggleRight,
  TrashSimple,
} from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { updateInquiryHistory } from "../../../../../services/inquiryHistoryService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../store/actions/messageBoxAction.js";
import DialogDeleteInquiryList from "../../../internal/items/Components/Dialog/DialogDeleteInquiryList";

export default function AvailableInquiryListRow({
  inquiryHistory,
  reloadInquiryHistory,
  userSession,
}) {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);

  async function changeInquiryHistoryStatus(idInquiryHistory, currentStatus) {
    const data = {
      idInquiryHistory,
      data: {
        status: !currentStatus,
      },
    };

    await updateInquiryHistory(data)
      .then((response) => {
        if (response.status === 200) {
          handleMessageBox("success", "Visibilidade alterada");
          reloadInquiryHistory();
        } else {
          handleMessageBox("failed", "Não foi possível alterar a visibilidade");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Problemas aos alterar. Tente mais tarde!");
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setInterval(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }

  function closeModal() {
    setOpenDelete(false);
  }

  return (
    <tr>
      <td>
        <Link
          to={`/supplier/inquiry-list/available/${inquiryHistory.id}/${inquiryHistory.title}`}
          className="row gap-2 text-dark-3 ai-center"
        >
          {inquiryHistory.title}
          <ArrowCircleRight className="icon-default" />
        </Link>
      </td>
      {userSession.isAdmin && (
        <>
          <td>
            {inquiryHistory.status === true ? (
              <button
                type="button"
                className="flex bg-green-1 text-white-1 pa-1 border-radius-soft"
                onClick={() =>
                  changeInquiryHistoryStatus(
                    inquiryHistory.id,
                    inquiryHistory.status
                  )
                }
              >
                <ToggleLeft
                  alt="Esta cotação está ativada"
                  className="icon-default"
                />
              </button>
            ) : (
              <button
                type="button"
                className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
                onClick={() =>
                  changeInquiryHistoryStatus(
                    inquiryHistory.id,
                    inquiryHistory.status
                  )
                }
              >
                <ToggleRight
                  alt="Esta cotação está desativada"
                  className="icon-default"
                />
              </button>
            )}
          </td>
          <td>
            <button
              type="button"
              className={`row ${
                inquiryHistory.status ? "" : "bg-red-1"
              } pa-1 text-white-1 border-radius-soft`}
              onClick={() => setOpenDelete(true)}
              disabled={inquiryHistory.status}
            >
              <TrashSimple className="icon-sm" />
            </button>
            <DialogDeleteInquiryList
              inquiryHistory={inquiryHistory}
              onClose={closeModal}
              open={openDelete}
              reload={reloadInquiryHistory}
            />
          </td>
        </>
      )}
    </tr>
  );
}
