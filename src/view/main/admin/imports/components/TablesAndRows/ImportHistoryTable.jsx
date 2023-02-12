import ImportHistoryRow from "./ImportHistoryRow";

export default function ImportHistoryTable({ list, reload }) {
  return (
    <>
      {list.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Importação</th>
              <th>Criada em</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <ImportHistoryRow key={index} item={item} reload={reload} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          <p className="font-md font-medium">Não há importações criadas</p>
        </div>
      )}
    </>
  );
}
