import { setInquiryList } from "../../services/inquiryService";
import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function DialogInquiry({ open, onClose, pending }) {
  const dispatch = useDispatch();
  function closeModal(e) {
    const elementId = e.target.id === "overlay";
    if (elementId) onClose();
  }

  function sendInquiry(e) {
    e.preventDefault();

    const title = new Date().toISOString().split("T")[0];

    const inquiry = { title, items: pending() };

    setInquiryList(inquiry)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          handleMessageBox("success", "Cotação criada com sucesso!");
        } else {
          handleMessageBox("Failed", "Nao foi possível criar a cotação!");
        }
        onClose();
      })
      .catch(() => {
        handleMessageBox("Failed", "Nao foi possível criar a cotação!");
      })
      .finally(() => {
        onClose();
      });
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
