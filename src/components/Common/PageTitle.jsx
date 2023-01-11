export default function PageTitle(props) {
  return (
    <h1 className="row font-medium font-lg my-4 bg-red-1 text-white-1 pa-2">
      {props.title}
    </h1>
  );
}
