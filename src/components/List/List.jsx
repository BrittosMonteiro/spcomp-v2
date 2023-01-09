import React from "react";
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
            <React.Fragment key={index}>
              <ListItem item={item} />

              {index === 0 || index < props.list.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ul>
      ) : null}
    </>
  );
}
