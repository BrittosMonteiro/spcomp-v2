import EncapsRow from "./EncapsRow";

export default function EncapsTable({ list, reload }) {
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
              <EncapsRow key={index} item={item} reload={reload} />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}
