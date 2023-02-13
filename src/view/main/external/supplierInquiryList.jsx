import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  readInquiryHistory,
  readActiveInquiryHistory,
} from "../../../services/inquiryHistoryService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../store/actions/messageBoxAction.js";
import AvailableInquiryListTable from "./Components/TablesAndRows/availableInquiryListTable";
import PageTitle from "../../../components/Common/PageTitle";
import Card from "../../../components/Common/Card";

export default function SupplierResponse() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [inquiryHistory, setInquiryHistory] = useState([]);

  async function loadInquiryHistoryByCompany() {
    await readActiveInquiryHistory(userSession.token)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  function reloadInquiryHistory() {
    if (userSession.isAdmin) {
      loadInquiryHistory();
    } else {
      loadInquiryHistoryByCompany();
    }
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setInterval(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }

  return (
    <div className="column gap-4">
      {userSession.role === 4 && (
        <div className="row">
          <PageTitle title={"Inquiries list"} />
        </div>
      )}
      {inquiryHistory.length > 0 ? (
        <Card>
          <AvailableInquiryListTable
            inquiryHistoryList={inquiryHistory}
            reloadInquiryHistory={reloadInquiryHistory}
            userSession={userSession}
          />
        </Card>
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">
            {userSession.role === 4
              ? "There is no inquiries available"
              : "Não há cotações disponíveis"}
          </p>
        </div>
      )}
    </div>
  );
}
