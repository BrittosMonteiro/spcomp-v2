import OrderRow from "./OrderRow";

export default function OrderTable({ list, userSession, reloadOrderList }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Qty</th>
          <th>Description</th>
          <th>Type</th>
          <th>Encap</th>
          <th>Brand</th>
          <th>USD Price</th>
          <th>LT</th>
          <th>DC</th>
          <th>Condition</th>
          <th>{userSession.role === 4 ? "Action" : "Ação"}</th>
        </tr>
      </thead>
      <tbody>
        {list.items.map((item, index) => (
          <OrderRow
            item={item}
            key={index}
            userSession={userSession}
            reloadOrderList={reloadOrderList}
          />
        ))}
      </tbody>
    </table>
  );
}
