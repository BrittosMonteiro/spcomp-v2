import ItemRow from "./ItemRow";

export default function ListItemTable({ list, reloadList }) {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Encap</th>
          <th>Marca</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <ItemRow key={index} item={item} reloadList={reloadList} />
        ))}
      </tbody>
    </table>
  );
}
