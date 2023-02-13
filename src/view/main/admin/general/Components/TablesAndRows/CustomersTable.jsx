import CustomerRow from "./CustomerRow";

export default function CustomersTable({ customersList, reload }) {
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
        {customersList.map((customer, index) => (
          <CustomerRow key={index} customer={customer} reload={reload} />
        ))}
      </tbody>
    </table>
  );
}
