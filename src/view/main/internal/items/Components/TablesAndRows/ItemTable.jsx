import ItemRow from "./ItemRow";

export default function ItemTable({ list, reloadList, changeTab }) {
  return (
    <table className="table">
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
          <ItemRow
            key={index}
            item={item}
            reloadList={reloadList}
            changeTab={changeTab}
          />
        ))}
      </tbody>
    </table>
  );
}
