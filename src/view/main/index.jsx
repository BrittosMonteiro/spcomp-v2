import { useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../../components/Common/PageTitle";
import { readInquiryItemQtyByUser } from "../../services/inquiryItemService";

export default function Index() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [inquiryItemQty, setInquiryItemQty] = useState(0);

  async function loadInquiryItemsQuantity() {
    await readInquiryItemQtyByUser({ idUser: userSession.token })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setInquiryItemQty(res.data);
      })
      .catch((err) => {});
  }

  function loadPurchaseItemsQuantity() {}

  function loadStockItemsQuantity() {}

  function loadSalesItemQuantity() {}

  loadInquiryItemsQuantity();
  loadPurchaseItemsQuantity();
  loadSalesItemQuantity();
  loadStockItemsQuantity();
  return (
    <div className="column gap-4">
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Dashboard"} />
      </div>
      <div className="row justify-content-between gap-4">
        <div className="box bg-red-1 text-white-1 border-radius-soft">
          <div className="column ma-6">
            <span className="font-lg font-bold">{inquiryItemQty}</span>
            <span className="font-lg font-light">Itens cotados</span>
          </div>
        </div>
        <div className="box bg-red-1 text-white-1 border-radius-soft">
          <div className="column ma-6">
            <span className="font-lg font-bold">{inquiryItemQty}</span>
            <span className="font-lg font-light">Itens em pedidos</span>
          </div>
        </div>
        <div className="box bg-red-1 text-white-1 border-radius-soft">
          <div className="column ma-6">
            <span className="font-lg font-bold">{inquiryItemQty}</span>
            <span className="font-lg font-light">Itens em estoque</span>
          </div>
        </div>
        <div className="box bg-red-1 text-white-1 border-radius-soft">
          <div className="column ma-6">
            <span className="font-lg font-bold">{inquiryItemQty}</span>
            <span className="font-lg font-light">Itens em vendas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
