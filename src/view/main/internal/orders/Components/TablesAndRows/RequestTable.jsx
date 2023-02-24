import { useEffect, useState } from "react";

import RequestRow from "./RequestRow";
import { readRequest } from "../../../../../../services/requestService";

export default function RequestTable({ userSession }) {
  const [requests, setRequest] = useState([]);
  const [contentMessage, setContentMessage] = useState();

  async function loadRequests() {
    setContentMessage("Carregando informações");

    await readRequest()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setRequest(res.data);
      })
      .catch(() => {})
      .finally(() => {
        if (requests.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há solicitação de pedido");
        }
      });
  }

  useEffect(() => {
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {requests.length > 0 ? (
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
            {requests.map((request, index) => (
              <RequestRow
                key={index}
                request={request}
                userSession={userSession}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          <p className="font-md font-medium">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
