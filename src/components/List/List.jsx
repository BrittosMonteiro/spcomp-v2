import React from "react";
import ListItem from "./ListItem";

export default function List({ list, hasLink, reloadList, customers }) {
  return (
    <>
      {list.length > 0 ? (
        <ul
          className="gap-4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {list.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                item={item}
                hasLink={hasLink}
                reloadList={reloadList}
                customers={customers}
              />

              {index === 0 || index < list.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ul>
      ) : null}
    </>
  );
}
