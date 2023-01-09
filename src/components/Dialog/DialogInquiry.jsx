export default function DialogInquiry({ open, onClose, pending }) {
  function closeModal(e) {
    const elementId = e.target.id === "overlay";
    if (elementId) onClose();
  }

  function sendInquiry(e) {
    e.preventDefault();
    
    const title = new Date().toISOString().split("T")[0]

    onClose();
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
