import OrdersRow from "./OrdersRow";

export default function OrdersTable({
  list,
  emptyMessage,
  isAttached,
  idImportHistory,
  reload,
}) {
  return (
    <>
      {list.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Criado em</th>
              <th>Pedido</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <OrdersRow
                key={index}
                item={item}
                isAttached={isAttached}
                idImportHistory={idImportHistory}
                reload={reload}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          <p className="font-md font-medium">{emptyMessage}</p>
        </div>
      )}
    </>
  );
}
