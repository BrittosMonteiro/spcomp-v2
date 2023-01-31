import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/Common/PageTitle";
import OrderTable from "../../../components/Tables/OrderTable";
import { readOrderList } from "../../../services/orderListService";

export default function Order() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const { idOrder } = useParams();
  const [order, setOrder] = useState([]);
  const [openPendingItems, setOpenPendingItems] = useState(true);

  let title = "Pedido";

  if (userSession.role === 4) {
    title = "Order";
  }

  async function loadOrder() {
    await readOrderList(idOrder)
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <>
      <div className="row align-items-center justify-content-between">
        <PageTitle title={title} />
        {userSession.isAdmin && (
          <button
            type="type"
            className="bg-green-1 text-white-1 pa-2 align-items-center font-md font-medium"
            title="Incluir itens pendentes"
            onClick={() => setOpenPendingItems(true)}
          >
            Incluir itens
          </button>
        )}
      </div>
      {order.idOrder ? (
        <OrderTable list={order} userSession={userSession} />
      ) : (
        <p className="ma-auto font-lg font-light">Não há itens neste pedido</p>
      )}
    </>
  );
}
