import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../../../components/Common/PageTitle";
import ListOrder from "../../../components/List/ListOrder";
import { readOrderListBySupplier } from "../../../services/orderListService";

export default function OrderSupplier() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [orderList, setOrderList] = useState([]);

  async function loadOrderList() {
    await readOrderListBySupplier(userSession.token)
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    loadOrderList();
  }, []);

  function reloadOrderList() {
    loadOrderList();
  }

  return (
    <>
      <div className="row">
        <PageTitle title={"Orders"} />
      </div>
      {orderList.length > 0 ? (
        <ol className="column gap-4">
          {orderList.map((order, index) => (
            <React.Fragment key={index}>
              <ListOrder
                order={order}
                reloadOrderList={reloadOrderList}
                user={userSession}
              />
              {index < orderList.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ol>
      ) : null}
    </>
  );
}
