import { ArrowCircleRight } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import { readInquiryHistory } from "../../services/inquiryHistoryService";

export default function SupplierResponse() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [inquiryHistory, setInquiryHistory] = useState([]);

  async function loadInquiryHistory() {
    await readInquiryHistory()
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setInquiryHistory(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadInquiryHistory();
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Pending items"} />
      </div>
      <ol>
        {inquiryHistory.map((inquiry, index) => (
          <React.Fragment key={index}>
            <li className="row align-items-center justify-content-between">
              <span className="font-black font-md">{inquiry.title}</span>
              <Link
                to={`/inquiry/available/${inquiry.id}/${inquiry.title}`}
                className="row gap-2 font-light font-sm bg-green-1 pa-1 border-radius-soft text-white-1 align-items-center"
              >
                {userSession.role === 4
                  ? "Check full list"
                  : "Visualizar cotação"}
                <ArrowCircleRight className="icon-default" />
              </Link>
            </li>
            <hr className="my-4" />
          </React.Fragment>
        ))}
      </ol>
    </>
  );
}
