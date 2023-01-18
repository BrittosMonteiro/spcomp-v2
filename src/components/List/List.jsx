import React from "react";
import ListInquiry from "./ListInquiry";
import ListItem from "./ListItem";

export default function List({ list, reloadList, level, customers }) {
  return (
    <>
      {list.length > 0 ? (
        <ul
          className="gap-4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {list.map((item, index) => (
            <React.Fragment key={index}>
              {level === 1 && (
                <ListItem item={item.item} reloadList={reloadList} />
              )}

              {level === 2 && (
                <ListInquiry
                  item={item.item}
                  reloadList={reloadList}
                  customers={customers}
                />
              )}

              {index === 0 || index < list.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ul>
      ) : null}
    </>
  );
}
