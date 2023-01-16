import {
  ArrowCircleRight,
  DownloadSimple,
  ToggleLeft,
  ToggleRight,
  Trash,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import {
  readInquiryHistory,
  readActiveInquiryHistory,
  updateInquiryHistory,
  deleteInquiryHistory,
} from "../../services/inquiryHistoryService";
import { inquiryListDownload } from "../../services/inquiryListService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction.js";

export default function SupplierResponse() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  let title = "Pending inquiries";

  if (userSession.isAdmin) {
    title = "Cotações pendentes";
  }

  const [inquiryHistory, setInquiryHistory] = useState([]);

  async function loadInquiryHistoryByCompany() {
    await readActiveInquiryHistory()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          handleMessageBox("failed", "Items could not be loaded.");
        }
      })
      .then((res) => {
        setInquiryHistory(res.data);
      })
      .catch(() => {});
  }

  async function loadInquiryHistory() {
    await readInquiryHistory()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          handleMessageBox("failed", "Items could not be loaded.");
        }
      })
      .then((res) => {
        setInquiryHistory(res.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (userSession.isAdmin) {
      loadInquiryHistory();
    } else {
      loadInquiryHistoryByCompany();
    }
  }, [userSession]);

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
          handleMessageBox("failed", "Visibilidade alterada");
          loadInquiryHistory();
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
          loadInquiryHistory();
        } else {
          handleMessageBox("failed", "Não foi possível excluir!");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível excluir!");
      });
  }

  async function downloadInquiryList(idInquiryHistory, title) {
    await inquiryListDownload({ idInquiryHistory, title })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={title} />
      </div>
      <ol>
        {inquiryHistory.map((inquiry, index) => (
          <React.Fragment key={index}>
            <li className="row align-items-center justify-content-between">
              <div className="row align-items-center gap-2">
                {userSession.isAdmin ? (
                  <>
                    <button
                      type="button ma-0 pa-0"
                      className="bg-transparent"
                      onClick={() =>
                        changeInquiryHistoryStatus(inquiry.id, inquiry.status)
                      }
                    >
                      {inquiry.status === true ? (
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
                  </>
                ) : null}
                <span className="font-black font-md">{inquiry.title}</span>
                {userSession.isAdmin ? (
                  <button
                    type="button"
                    onClick={() =>
                      downloadInquiryList(inquiry.id, inquiry.title)
                    }
                    className="bg-transparent"
                  >
                    <DownloadSimple className="icon-default" />
                  </button>
                ) : null}
              </div>
              <div className="row align-items-center gap-2">
                <Link
                  to={`/inquiry/list/available/${inquiry.id}/${inquiry.title}`}
                  className="row gap-2 font-light font-sm bg-green-1 pa-1 border-radius-soft text-white-1 align-items-center"
                >
                  {userSession.role === 4
                    ? "Check full list"
                    : "Visualizar cotação"}
                  <ArrowCircleRight className="icon-default" />
                </Link>
                {userSession.isAdmin ? (
                  <button
                    className={`pa-1 font-sm border-radius-soft ${
                      inquiry.status === true ? "bg-white-1" : "bg-red-1"
                    }`}
                    onClick={() =>
                      deleteFromInquiryHistory(inquiry.id, inquiry.status)
                    }
                    disabled={inquiry.status}
                  >
                    <Trash
                      className={`icon-sm ${
                        inquiry.status === true ? "bg-grey-1" : "text-white-1"
                      }`}
                    />
                  </button>
                ) : null}
              </div>
            </li>
            <hr className="my-4" />
          </React.Fragment>
        ))}
      </ol>
    </>
  );
}
