import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PageTitle from "../../../components/Common/PageTitle";
import {
  readInquiryListByCompany,
  readInquiryList,
} from "../../../services/inquiryListService";
import ListInquiryListSentItemsTable from "../../../components/Tables/InquiryListSentItemsTable";

export default function InquiryAvailable() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const { title, idInquiryHistory } = useParams();
  const [inquiries, setInquiries] = useState([]);

  async function loadInquiryListByCompany(data) {
    await readInquiryListByCompany(data)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setInquiries(res.data);
      })
      .catch(() => {});
  }

  async function loadInquiryList(data) {
    await readInquiryList(data)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setInquiries(res.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    if (userSession.role === 4 && idInquiryHistory) {
      loadInquiryListByCompany({
        idSupplier: userSession.token,
        idInquiryHistory,
      });
    } else {
      loadInquiryList({ idInquiryHistory });
    }
  }, [idInquiryHistory, userSession]);

  function reloadInquiryListByCompany() {
    if (userSession && idInquiryHistory) {
      const data = {
        idSupplier: userSession.token,
        idInquiryHistory,
      };
      loadInquiryListByCompany(data);
    }
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={title} />
      </div>
      {inquiries.length > 0 ? (
        <ListInquiryListSentItemsTable
          list={inquiries}
          reloadList={reloadInquiryListByCompany}
          userSession={userSession}
        />
      ) : null}
    </>
  );
}
