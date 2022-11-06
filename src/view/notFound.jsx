import PageTitle from "../components/Common/PageTitle";

export default function NotFound() {
  return (
    <>
      <div className="row">
        <PageTitle title={"Tem alguém aí?"} />
      </div>
      <p className="font-bold font-lg text-dark-3 text-center pa-8">
        A página que você está procurando não foi encontrada :/
      </p>
    </>
  );
}
