import React from "react";
import InquiryListSentItemsRow from "./InquiryListSentItemRow";

export default function InquiryListSentItemsTable({
  list,
  reloadList,
  userSession,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Supplier</th>
          <th>Qty</th>
          <th>Description</th>
          <th>Type</th>
          <th>Encap</th>
          <th>Brand</th>
          <th>USD Price</th>
          <th>LT</th>
          <th>DC</th>
          <th>Condition</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((prices, index) => (
          <React.Fragment key={index}>
            {prices.prices.map((price, index) => (
              <InquiryListSentItemsRow
                key={index}
                item={prices}
                price={price}
                reloadList={reloadList}
                userSession={userSession}
              />
            ))}
            {index < list.length - 1 ? (
              <tr>
                <td colSpan={11}></td>
              </tr>
            ) : null}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
