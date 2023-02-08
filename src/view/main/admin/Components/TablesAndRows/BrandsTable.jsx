import BrandRow from "./BrandRow";

export default function BrandsTable({ list, reload }) {
  return (
    <>
      {list.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <BrandRow item={item} reload={reload} key={index} />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}
