import { XCircle } from "phosphor-react";

export default function DialogDefault(props) {
  function closeModal(e) {
    const elementId = e.target.id === "overlay";
    if (elementId) props.onClose();
  }

  return (
    <>
      {props.open && (
        <div className="overlay" id="overlay" onClick={(e) => closeModal(e)}>
          <div className="dialog gap-4">
            <div className="row jc-between ai-start">
              <h1 className="font-lg font-medium text-dark-1">{props.title}</h1>
              <button
                type="button"
                className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
                onClick={() => props.onClose()}
              >
                <XCircle className="icon-default" />
              </button>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
