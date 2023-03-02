import { CircleNotch } from "phosphor-react";
import { useEffect, useState } from "react";
import Card from "../../../../components/Common/Card";

import PageTitle from "../../../../components/Common/PageTitle";
import { readStockListController } from "../../../../controller/stockController";

export default function Stock() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [open, setOpen] = useState(false);

  async function loadImportItems() {
    setIsLoading(true);
    const data = await readStockListController();
    setItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadImportItems();
  }, []);

  return (
    <div className="column gap-4">
      <PageTitle title={"Estoque"} />
      <Card>
        {items.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Description</th>
                <th>Tipo</th>
                <th>Encap</th>
                <th>Marca</th>
                <th>USD Venda</th>
                <th>Vendedor</th>
                <th>Cliente</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr>
                  <td>{item.item.quantity}</td>
                  <td>{item.item.description}</td>
                  <td>{item.item.type}</td>
                  <td>{item.item.encap}</td>
                  <td>{item.item.brand}</td>
                  <td>-</td>
                  <td>{item.user.username}</td>
                  <td>-</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : isLoading ? (
          <div className="row gap-2">
            Carregando estoque <CircleNotch className="icon-default spinning" />
          </div>
        ) : (
          "Não há itens em estoque"
        )}
      </Card>
    </div>
  );
}
