import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../../../components/Common/PageTitle";
import ListOrder from "../../../components/List/ListOrder";
import { readOrder } from "../../../services/orderService";

export default function Imports() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [orders, setOrders] = useState([]);

  function loadList() {
    readOrder()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadList();
  }, []);

  function reloadList() {
    loadList();
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Pedidos"} />
      </div>
      {orders.length > 0 ? (
        <ol className="column gap-8">
          {orders.map((order, index) => (
            <React.Fragment key={order.idOrder}>
              <ListOrder
                order={order}
                reloadOrderList={reloadList}
                user={userSession}
              />
              {index === 0 || index < orders.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ol>
      ) : null}
    </>
  );
}
