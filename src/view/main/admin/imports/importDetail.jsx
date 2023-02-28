import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleNotch } from "phosphor-react";

import PageTitle from "../../../../components/Common/PageTitle";
import Card from "../../../../components/Common/Card";
import DialogImportConfirm from "./components/Dialog/DialogImportConfirm";
import { readImportItemsController } from "../../../../controller/importController";
import ImportDetailRow from "./components/TablesAndRows/ImportDetailRow";
import { useSelector } from "react-redux";

export default function ImportDetail() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const { idImportHistory } = useParams();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(0);

  async function loadImportItems() {
    setIsLoading(true);
    const data = await readImportItemsController(idImportHistory);
    setItems(data);
    checkPendingItems();
    setIsLoading(false);
  }

  useEffect(() => {
    loadImportItems();
    // eslint-disable-next-line
  }, []);

  function checkPendingItems() {
    const pending = items.filter((e) => e.step === 6).length;
    setPendingConfirmation(pending);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div className="column gap-4">
      <PageTitle title={"Detalhes da importação"} />
      <Card>
        {items.length > 0 ? (
          <>
            {pendingConfirmation > 0 && (
              <div className="row">
                <button
                  type="type"
                  className="action-btn pa-1 border-radius-soft"
                  onClick={() => setOpen(true)}
                >
                  Confirmar todos os itens
                </button>
                <DialogImportConfirm
                  open={open}
                  onClose={closeModal}
                  items={items}
                  reloadList={loadImportItems}
                />
              </div>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>Descrição</th>
                  <th>Qtd</th>
                  <th>Encap</th>
                  <th>Tipo</th>
                  <th>Marca</th>
                  {userSession.isAdmin && <th>Preço</th>}
                  <th>Vendedor</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <ImportDetailRow
                    item={item}
                    key={index}
                    userSession={userSession}
                    reloadList={loadImportItems}
                  />
                ))}
              </tbody>
            </table>
          </>
        ) : isLoading ? (
          <div className="row gap-2 font-md font-medium">
            Carregando informações{" "}
            <CircleNotch className="icon-default spinning" />
          </div>
        ) : (
          <div className="row gap-2 font-md font-medium">
            Não há itens nessa importação
          </div>
        )}
      </Card>
    </div>
  );
}
