import ListItem from "./ListItem";

export default function List(props) {
  return (
    <>
      {props.list.length > 0 ? (
        <ul
          className="gap-4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {props.list.map((item, index) => (
            <ListItem item={item} key={index} />
          ))}
        </ul>
      ) : null}
    </>
  );
}
