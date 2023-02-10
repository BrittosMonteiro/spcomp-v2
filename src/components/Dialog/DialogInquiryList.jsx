import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { createInquiryHistory } from "../../services/inquiryHistoryService";
import { createInquiryList } from "../../services/inquiryListService";
import { updateInquiryItemStep } from "../../services/inquiryItemService";

export default function DialogInquiry({
  open,
  onClose,
  pending,
  changeTab,
  suppliersList,
}) {
  const dispatch = useDispatch();

  function closeModal(e) {
    const elementId = e.target.id === "overlay" || e.target.id === "btn_close";
    if (elementId) onClose();
  }

  const selectedSuppliers = [];

  function selectSupplier(supplier) {
    const pos = selectedSuppliers.findIndex(
      (e) => e.idSupplier === supplier.idSupplier
    );

    if (pos === -1) {
      selectedSuppliers.push(supplier);
    } else {
      selectedSuppliers.splice(pos, 1);
    }
  }

  async function sendInquiry(e) {
    e.preventDefault();

    if (!selectedSuppliers) {
      handleMessageBox("failed", "Selecione ao menos um fornecedor");
      return;
    }

    const title = new Date().toISOString().split("T")[0];

    await createInquiryHistory({ title, selectedSuppliers })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((res) => {
        const data = {
          idInquiryHistory: res.data,
          selectedSuppliers: selectedSuppliers,
          items: pending,
        };
        createInquiry(data);
      })
      .catch(() => {
        handleMessageBox("Failed", "Nao foi possível criar a cotação!");
      })
      .finally(() => {
        onClose();
      });
  }

  async function createInquiry(data) {
    await createInquiryList(data)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then(() => {
        changeTab(2);
        updateItemStep();
      })
      .catch(() => {
        handleMessageBox("Failed", "Nao foi possível criar a cotação!");
      });
  }

  async function updateItemStep() {
    const data = {
      pending,
      step: 2,
    };
    await updateInquiryItemStep(data)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Cotação criada com sucesso!");
      })
      .catch(() => {});
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <>
      {open && (
        <div className="overlay" id="overlay" onClick={(e) => closeModal(e)}>
          <div className="dialog">
            <form onSubmit={sendInquiry} className="column gap-4">
              <h1 className="font-medium font-lg">Escolher fornecedores</h1>
              <p className="font-sm font-light">
                Os itens pendentes serão enviados aos fornecedores selecionados
                para que estes preencham com seus preços
              </p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Selecionar</th>
                    <th>Fornecedor</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliersList.map((supplier, index) => (
                    <tr key={index}>
                      <td>
                        <div className="row jc-start">
                          <input
                            type={"checkbox"}
                            onClick={() => selectSupplier(supplier)}
                            className="jc-start"
                          />
                        </div>
                      </td>
                      <td>{supplier.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row jc-between">
                <button
                  className="font-medium font-md bg-red-1 text-white-1 pa-2 border-radius-soft"
                  type="button"
                  id="btn_close"
                  onClick={(e) => closeModal(e)}
                >
                  Cancelar
                </button>
                <button
                  className="font-medium font-md bg-green-1 text-white-1 pa-2 border-radius-soft"
                  type="submit"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
