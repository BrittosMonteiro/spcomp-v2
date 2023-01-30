import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageTitle from "../../../components/Common/PageTitle";
import InquiryListItemTable from "../../../components/Tables/InquiryListItemTable";
import { readSingleItemFromInquiryList } from "../../../services/inquiryListService";

export default function InquiryItem() {
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
      {inquiries.length > 0 ? <InquiryListItemTable list={inquiries} /> : null}
    </>
  );
}
