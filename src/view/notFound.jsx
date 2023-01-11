import { useSelector } from "react-redux";
import PageTitle from "../components/Common/PageTitle";

export default function NotFound() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  let title,
    message = "";

  if (userSession.role === 4) {
    title = "Is there anybody there?";
    message = "The page you're looking for is not available :/";
  } else {
    title = "Tem alguém aí?";
    message = "A página que você está procurando não foi encontrada :/";
  }

  return (
    <>
      <div className="row">
        <PageTitle title={title} />
      </div>
      <p className="font-bold font-lg text-dark-3 text-center pa-8">
        {message}
      </p>
    </>
  );
}
