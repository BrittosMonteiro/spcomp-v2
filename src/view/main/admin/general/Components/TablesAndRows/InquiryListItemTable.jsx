import InquiryListItemRow from "./InquiryListItemRow";

export default function InquiryListItemTable({ list }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Cotação</th>
          <th>Fornecedor</th>
          <th>Qtd</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Encap</th>
          <th>Marca</th>
          <th>USD compra</th>
          <th>LT</th>
          <th>DC</th>
          <th>Condição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <InquiryListItemRow item={item} key={index} />
        ))}
      </tbody>
    </table>
  );
}
