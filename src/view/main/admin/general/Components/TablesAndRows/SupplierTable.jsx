import SupplierRow from "./SupplierRow";

export default function SupplierTable({ suppliersList, reload }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {suppliersList.map((supplier, index) => (
          <SupplierRow supplier={supplier} reload={reload} key={index} />
        ))}
      </tbody>
    </table>
  );
}
