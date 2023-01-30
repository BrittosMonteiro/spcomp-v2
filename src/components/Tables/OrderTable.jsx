import InquiryRow from "./InquiryRow";

export default function ListOrderTable({ list, reloadList }) {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Data</th>
          <th>Qtd</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Encap</th>
          <th>Marca</th>
          <th>Cliente</th>
          <th>Vendedor</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <InquiryRow key={index} item={item} reloadList={reloadList} />
        ))}
      </tbody>
    </table>
  );
}
