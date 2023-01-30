import InquiryTableRow from "./InquiryRow";

export default function ListInquiryTable({ list, reloadList }) {
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
          <InquiryTableRow key={index} item={item} reloadList={reloadList} />
        ))}
      </tbody>
    </table>
  );
}
