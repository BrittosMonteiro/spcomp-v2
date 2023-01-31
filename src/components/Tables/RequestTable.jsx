import RequestRow from "./RequestRow";

export default function RequestTable({ list, reloadRequestList }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Fornecedor</th>
          <th>Qtd</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Encap</th>
          <th>Marca</th>
          <th>USD Compra</th>
          <th>R$ Venda</th>
          <th>Vendedor</th>
          <th>Cliente</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.map((request, index) => (
          <RequestRow key={index} request={request} />
        ))}
      </tbody>
    </table>
  );
}
