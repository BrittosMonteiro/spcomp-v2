export default function PageTitle(props) {
  return (
    <div className="row ai-center jc-between">
      <h1 className="font-medium font-lg bg-red-1 text-white-1 pa-2 border-radius-soft">
        {props.title}
      </h1>
      {props.children}
    </div>
  );
}
