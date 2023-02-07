import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { readStockList } from "../../../../services/stockService.js";

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

  return ;
}
