import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/Common/PageTitle";
import ListSupplierResponse from "../../../components/List/ListSupplierResponse";
import { readSingleItemFromInquiryList } from "../../../services/inquiryListService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../store/actions/messageBoxAction";

export default function InquiryItem() {
  const { idInquiryItem } = useParams();
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (idInquiryItem) {
      readSingleItemFromInquiryList({ idInquiryItem })
        .then((res) => res.json())
        .then((res) => {
          setCompanies(res.data);
        })
        .catch(() => {
          handleMessageBox("failed", "Não foi possível encontrar o item");
        });
    }
  }, [idInquiryItem]);

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setInterval(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Analisar item"} />
      </div>
      {companies.length > 0 ? (
        <React.Fragment>
          {companies.map((company) => (
            <ol className="my-4" key={company.idInquiryList}>
              <div className="row">
                <h1 className="font-light font-md bg-red-1 text-white-1 pa-1">
                  {company.nameSupplier}
                </h1>
              </div>
              {company.item.map((item) => (
                <React.Fragment key={item.idInquiryItem}>
                  <ListSupplierResponse
                    idInquiryList={company.idInquiryList}
                    idSupplier={company.idSupplier}
                    nameSupplier={company.nameSupplier}
                    supplierId={userSession.token}
                    item={item}
                    btnChoosePrice={true}
                  />
                  <hr />
                </React.Fragment>
              ))}
            </ol>
          ))}
        </React.Fragment>
      ) : null}
    </>
  );
}
