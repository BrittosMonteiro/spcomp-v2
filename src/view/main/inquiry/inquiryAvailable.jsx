import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/Common/PageTitle";
import { readInquiryListByCompany } from "../../../services/inquiryListService";
import ListSupplierResponse from "../../../components/List/ListSupplierResponse";

export default function InquiryAvailable() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const { title, idInquiryHistory } = useParams();
  const [idInquiryList, setIdInquiryList] = useState("");
  const [items, setItems] = useState([]);

  async function loadInquiryListByCompany(data) {
    await readInquiryListByCompany(data)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setItems(res.inquiryList);
          setIdInquiryList(res.idInquiryList);
        } else {
          console.log(res.errorMessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (userSession && idInquiryHistory) {
      const data = {
        idSupplier: userSession.token,
        idInquiryHistory,
      };
      loadInquiryListByCompany(data);
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
      {items.length > 0 ? (
        <ol className="my-4">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {item.description}
              <ListSupplierResponse
                idInquiryList={idInquiryList}
                supplierId={userSession.token}
                item={item}
                reloadInquiryListByCompany={reloadInquiryListByCompany}
              />
              <hr />
            </React.Fragment>
          ))}
        </ol>
      ) : null}
    </>
  );
}
