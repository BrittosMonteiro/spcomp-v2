import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PageTitle from "../../../components/Common/PageTitle";
import { readStockList } from "../../../services/stockService.js";
import ListOrder from "../../../components/List/ListOrder";

export default function Stock() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    readStockList()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((res) => {
        setStockItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Estoque"} />
      </div>
      {stockItems.length > 0 ? (
        <ol className="column gap-4">
          {stockItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListOrder order={item} user={userSession} />
              {index < stockItems.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ol>
      ) : null}
    </>
  );
}
