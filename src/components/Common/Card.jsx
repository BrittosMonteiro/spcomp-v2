export default function Card(props) {
  return (
    <div
      className="column pa-4 border-radius-soft gap-4"
      style={{ boxShadow: "0em 0em 0.2em rgba(0,0,0, 0.4)" }}
    >
      {props.children}
    </div>
  );
}
