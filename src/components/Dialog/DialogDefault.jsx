export default function DialogDefault(props) {
  function closeModal(e) {
    const elementId = e.target.id === "overlay";
    if (elementId) props.onClose();
  }

  return (
    <>
      {props.open && (
        <div className="overlay" id="overlay" onClick={(e) => closeModal(e)}>
          <div className="dialog gap-4">{props.children}</div>
        </div>
      )}
    </>
  );
}
