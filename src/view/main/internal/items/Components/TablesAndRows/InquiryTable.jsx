import InquiryTableRow from "./InquiryRow";

export default function InquiryTable({ list, reloadList }) {
  return (
    <table className="table">
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
          <InquiryTableRow key={index} item={item} reloadList={reloadList} />
        ))}
      </tbody>
    </table>
  );
}
