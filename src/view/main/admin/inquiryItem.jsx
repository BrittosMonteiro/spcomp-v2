import { ArrowCircleUpRight } from "phosphor-react";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../../../components/Common/PageTitle";
import ListInquiryDetail from "../../../components/List/ListInquiryDetail";
import { readSingleItemFromInquiryList } from "../../../services/inquiryListService";

export default function InquiryItem() {
  // const userSession = useSelector((state) => {
  //   return state.login;
  // });
  const { idInquiryItem } = useParams();
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (idInquiryItem) {
      readSingleItemFromInquiryList({ idInquiryItem })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((res) => {
          setInquiries(res.data);
        })
        .catch(() => {});
    }
  }, [idInquiryItem]);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Analisar item"} />
      </div>
      {inquiries.length > 0 ? (
        <ol className="column my-4 gap-4">
          {inquiries.map((inquiry, index) => (
            <div className="column" key={index}>
              <div className="row">
                <div className="row align-items-center bg-red-1 text-white-1 pa-1 gap-1">
                  <span className="font-light font-md align-items-center">
                    {inquiry.supplier.name}
                  </span>
                  <span className="row font-sm font-medium bg-white-1 text-dark-3 pa-1 border-radius-soft align-items-center gap-1">
                    <span>{`Cotação: ${inquiry.inquiryHistory.title}`}</span>
                    <Link
                      className="text-dark-3"
                      to={`/inquiry/list/available/${inquiry.inquiryHistory.idInquiryHistory}/${inquiry.inquiryHistory.title}`}
                    >
                      <ArrowCircleUpRight className="icon-default" />
                    </Link>
                  </span>
                </div>
              </div>
              {inquiry.items.map((item, index) => (
                <ListInquiryDetail
                  key={index}
                  idSupplier={inquiry.supplier.idSupplier}
                  item={item}
                  btnChoosePrice={true}
                />
              ))}
              <hr />
            </div>
          ))}
        </ol>
      ) : // <table className="table">
      //   <thead>
      //     <th>Supplier</th>
      //     <th>Quantity</th>
      //     <th>Description</th>
      //     <th>Type</th>
      //     <th>Encap</th>
      //     <th>Brand</th>
      //     <th>Price</th>
      //     <th>Lead time</th>
      //     <th>Condição</th>
      //     <th>DC</th>
      //     <th>Outros</th>
      //     <th>Ação</th>
      //   </thead>
      //   <tbody>
      //     {inquiries.map((item) => (
      //       <>
      //         <tr>
      //           <td>{item.supplier.name}</td>
      //           {item.items.map((detail) => (
      //             <>
      //               <td>{detail.quantity}</td>
      //               <td>{detail.description}</td>
      //               <td>{detail.type}</td>
      //               <td>{detail.encap}</td>
      //               <td>{detail.brand}</td>
      //               <td>{`USD ${detail.unitPurchasePrice}`}</td>
      //               <td></td>
      //               <td></td>
      //               <td></td>
      //               <td></td>
      //               <td>
      //                 {userSession.isAdmin ? (
      //                   <button
      //                     type="button"
      //                     className="bg-green-1 text-white-1 pa-2"
      //                     style={{ overflow: "hidden" }}
      //                   >
      //                     Escolher
      //                   </button>
      //                 ) : null}
      //               </td>
      //             </>
      //           ))}
      //         </tr>
      //       </>
      //     ))}
      //   </tbody>
      // </table>
      null}
    </>
  );
}
