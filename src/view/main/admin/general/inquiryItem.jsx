import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageTitle from "../../../../components/Common/PageTitle";
import Card from "../../../../components/Common/Card";
import InquiryListItemTable from "./Components/TablesAndRows/InquiryListItemTable";
import { readSingleItemFromInquiryList } from "../../../../services/inquiryListService";

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
    <div className="column gap-4">
      <PageTitle title={"Analisar item"} />
      {inquiries.length > 0 ? (
        <Card>
          <InquiryListItemTable list={inquiries} />
        </Card>
      ) : null}
    </div>
  );
}
