import TypesRow from "./TypesRow";

export default function TypesTable({ list, reload, onClose }) {
  return (
    <>
      {list.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <TypesRow key={index} item={item} reload={reload} />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}
