import UserRow from "./UserRow";

export default function UsersTable({ usersList, reload }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Admin</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user, index) => (
          <UserRow key={index} user={user} reload={reload} />
        ))}
      </tbody>
    </table>
  );
}
