import {
  ArrowCircleRight,
  ToggleLeft,
  ToggleRight,
  TrashSimple,
} from "phosphor-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteInquiryHistory,
  updateInquiryHistory,
} from "../../../../../services/inquiryHistoryService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../store/actions/messageBoxAction.js";

export default function AvailableInquiryListRow({
  inquiryHistory,
  reloadInquiryHistory,
  userSession,
}) {
  const dispatch = useDispatch();

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

  async function deleteFromInquiryHistory(idInquiryHistory, status) {
    if (status) {
      return handleMessageBox(
        "failed",
        "Não podemos excluir uma cotação ativa"
      );
    }

    const data = {
      idInquiryHistory,
    };

    await deleteInquiryHistory(data)
      .then((response) => {
        if (response.status === 200) {
          handleMessageBox("success", "Cotação excluída!");
          reloadInquiryHistory();
        } else {
          handleMessageBox("failed", "Não foi possível excluir!");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível excluir!");
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setInterval(() => {
      dispatch(hideMessageBox());
    }, 2500);
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
            <button
              type="button ma-0 pa-0"
              className="bg-transparent"
              onClick={() =>
                changeInquiryHistoryStatus(
                  inquiryHistory.id,
                  inquiryHistory.status
                )
              }
            >
              {inquiryHistory.status === true ? (
                <ToggleLeft
                  alt="Esta cotação está ativada"
                  className="icon-md mt-1 text-green-1"
                />
              ) : (
                <ToggleRight
                  alt="Esta cotação está desativada"
                  className="icon-md mt-1 text-red-1"
                />
              )}
            </button>
          </td>
          <td>
            <button
              type="button"
              className={`row ${
                inquiryHistory.status ? "" : "bg-red-1"
              } pa-1 text-white-1 border-radius-soft`}
              onClick={() =>
                deleteFromInquiryHistory(
                  inquiryHistory.id,
                  inquiryHistory.status
                )
              }
              disabled={inquiryHistory.status}
            >
              <TrashSimple className="icon-sm" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
