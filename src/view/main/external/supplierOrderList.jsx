import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PageTitle from "../../../components/Common/PageTitle";
import Card from "../../../components/Common/Card";
import OrderListTable from "../../../components/Tables/OrderListTable";
import { readOrderListBySupplier } from "../../../services/orderListService";

export default function SupplierOrderList() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    readOrderListBySupplier(userSession.id)
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
    <div className="column gap-4">
      <PageTitle title={"Orders"} />
      <Card>
        {ordersList.length > 0 ? (
          <OrderListTable list={ordersList} userSession={userSession} />
        ) : (
          <div className="row">
            <p className="font-md font-medium">There's no order available</p>
          </div>
        )}
      </Card>
    </div>
  );
}
