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

      {list.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Supplier</th>
              <th>View</th>
              {userSession.isAdmin && (
                <>
                  <th>Status</th>
                  <th>Delete</th>
                </>
              )}
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
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">Não há pedidos</p>
        </div>
      )}
    </>
  );
}
