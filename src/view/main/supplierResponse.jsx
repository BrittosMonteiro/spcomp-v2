import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../../components/Common/PageTitle";
import ListSupplierResponse from "../../components/List/ListSupplierResponse";
import { getInquiryListByCompany } from "../../services/inquiryService";

export default function SupplierResponse() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [inquiries, setInquiries] = useState([]);

  async function loadList() {
    await getInquiryListByCompany(userSession.token)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setInquiries(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadList();
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Pending items"} />
      </div>
      {inquiries.length > 0 ? (
        <>
          {inquiries.map((inquiry) => (
            <ol className="my-4" key={inquiry.id}>
              <h1 className="font-bold font-lg">{inquiry.title}</h1>
              {inquiry.items.map((item, index) => (
                <React.Fragment key={index}>
                  <ListSupplierResponse
                    inquiryId={inquiry.id}
                    supplierId={userSession.token}
                    item={item}
                  />
                  <hr />
                </React.Fragment>
              ))}
            </ol>
          ))}
        </>
      ) : null}
    </>
  );
}
