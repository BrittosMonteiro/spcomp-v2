import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/Common/PageTitle";
import {
  readInquiryListByCompany,
  readInquiryList,
} from "../../../services/inquiryListService";
import ListInquiryDetail from "../../../components/List/ListInquiryDetail";

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
        <React.Fragment>
          {inquiries.map((inquiry, index) => (
            <div className="column" key={index}>
              {userSession.isAdmin && (
                <div className="row">
                  <h1 className="font-md font-medium bg-red-1 text-white-1 pa-1">
                    {inquiry.supplier.name}
                  </h1>
                </div>
              )}
              <ol className="my-4">
                {inquiry.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListInquiryDetail
                      idSupplier={inquiry.supplier.idSupplier}
                      item={item}
                      reloadInquiryListByCompany={reloadInquiryListByCompany}
                    />
                    {index < inquiries.length - 1 ? <hr /> : ""}
                  </React.Fragment>
                ))}
              </ol>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <>Teste</>
      )}
    </>
  );
}
