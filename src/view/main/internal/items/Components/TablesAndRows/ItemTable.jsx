import ItemRow from "./ItemRow";

export default function ItemTable({
  list,
  reloadList,
  changeTab,
  brandList,
  encapList,
  typeList,
}) {
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
            brandList={brandList}
            encapList={encapList}
            typeList={typeList}
          />
        ))}
      </tbody>
    </table>
  );
}
