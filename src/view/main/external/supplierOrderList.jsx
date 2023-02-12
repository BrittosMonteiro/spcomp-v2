import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../../components/Common/Card";
import OrderListTable from "../../../components/Tables/OrderListTable";
import { readOrderListBySupplier } from "../../../services/orderListService";

export default function SupplierOrderList() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    readOrderListBySupplier(userSession.token)
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setOrdersList(response.data);
      })
      .catch((err) => {});
  }, [userSession]);

  return (
    <>
      {ordersList.length > 0 ? (
        <Card>
          <OrderListTable
            list={ordersList}
            userSession={userSession}
            displayTitle={true}
          />
        </Card>
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">There's no order</p>
        </div>
      )}
    </>
  );
}
