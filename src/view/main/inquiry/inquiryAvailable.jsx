import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/Common/PageTitle";
import {
  readInquiryListByCompany,
  readInquiryList,
} from "../../../services/inquiryListService";
import ListSupplierResponse from "../../../components/List/ListSupplierResponse";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../store/actions/messageBoxAction.js";

export default function InquiryAvailable() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const { title, idInquiryHistory } = useParams();
  const [companies, setCompanies] = useState([]);

  async function loadInquiryListByCompany(data) {
    await readInquiryListByCompany(data)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setCompanies(res.inquiryList);
        } else {
          handleMessageBox("failed", "Item could not be loaded");
        }
      })
      .catch((err) => {
        handleMessageBox("failed", "Item could not be loaded");
      });
  }

  async function loadInquiryList(data) {
    await readInquiryList(data)
      .then((res) => res.json())
      .then((res) => {
        setCompanies(res.inquiryList);
      })
      .catch(() => {
        handleMessageBox("failed", "Item could not be loaded");
      });
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

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setInterval(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={title} />
      </div>
      {companies.length > 0 ? (
        <React.Fragment>
          {companies.map((company) => (
            <ol className="my-4" key={company.idInquiryList}>
              {userSession.isAdmin ? (
                <div className="row">
                  <h1 className="font-light font-md bg-red-1 text-white-1 pa-1">
                    {company.nameSupplier}
                  </h1>
                </div>
              ) : null}
              {company.items.map((item) => (
                <>
                  <ListSupplierResponse
                    idInquiryList={company.idInquiryList}
                    supplierId={userSession.token}
                    item={item}
                    reloadInquiryListByCompany={reloadInquiryListByCompany}
                  />
                  <hr />
                </>
              ))}
            </ol>
          ))}
        </React.Fragment>
      ) : null}
    </>
  );
}
