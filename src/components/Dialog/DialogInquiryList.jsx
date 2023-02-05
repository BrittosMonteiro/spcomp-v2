import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { createInquiryHistory } from "../../services/inquiryHistoryService";
import { createInquiryList } from "../../services/inquiryListService";
import { updateInquiryItemStep } from "../../services/inquiryItemService";

export default function DialogInquiry({ open, onClose, pending, changeTab }) {
  const dispatch = useDispatch();

  function closeModal(e) {
    const elementId = e.target.id === "overlay" || e.target.id === "btn_close";
    if (elementId) onClose();
  }

  async function sendInquiry(e) {
    e.preventDefault();

    const title = new Date().toISOString().split("T")[0];

    await createInquiryHistory({ title })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((res) => {
        const data = {
          idInquiryHistory: res.data,
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
            <form onSubmit={sendInquiry}>
              <h1 className="font-medium font-lg">Enviar itens pendentes?</h1>
              <p className="my-4 font-light">
                Os itens pendentes serão separados para que os fornecedores
                preencham com seus preços
              </p>
              <hr className="my-4" />
              <div className="row justify-content-between">
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
