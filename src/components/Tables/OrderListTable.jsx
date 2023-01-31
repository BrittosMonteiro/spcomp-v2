import PageTitle from "../Common/PageTitle";
import OrderListRow from "./OrderListRow";

export default function OrderListTable({
  list,
  reloadOrdersList,
  userSession,
  displayTitle,
}) {
  return (
    <>
      {displayTitle && (
        <div className="row">
          <PageTitle title={"Orders"} />
        </div>
      )}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Data</th>
            <th>Fornecedor</th>
            {userSession.isAdmin && <th>Status</th>}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <OrderListRow
              key={index}
              order={item}
              reloadOrdersList={reloadOrdersList}
              userSession={userSession}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
