import RequestRow from "./RequestRow";

export default function RequestTable({ list, userSession, reloadRequestList }) {
  return (
    <>
      {list.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              {userSession.isAdmin && <th>Fornecedor</th>}
              <th>Qtd</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Encap</th>
              <th>Marca</th>
              {userSession.isAdmin && <th>USD Compra</th>}
              <th>R$ Venda</th>
              <th>Vendedor</th>
              <th>Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {list.map((request, index) => (
              <RequestRow
                key={index}
                request={request}
                userSession={userSession}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">Não há solicitações</p>
        </div>
      )}
    </>
  );
}
