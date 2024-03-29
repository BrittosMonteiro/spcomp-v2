import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginApp } from "../../services/loginService";
import { setUser } from "../../store/actions/userAction";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { Link } from "react-router-dom";
import { ArrowCircleRight, CircleNotch } from "phosphor-react";

export default function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function manageLogin(e) {
    e.preventDefault();

    if (!username || !password) handleMessageBox("failed", "Revise os campos");

    setIsLoading(true);

    await loginApp({ username, password })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          handleMessageBox("failed", "Tente mais tarde...");
        }
      })
      .then((res) => {
        if (res.data) {
          const dataToLogin = { ...res.data, isLogged: true };
          dispatch(setUser(dataToLogin));
          localStorage.setItem("loggedUser", JSON.stringify(dataToLogin));
        } else {
          handleMessageBox("failed", "Informações incorretas");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Estamos com problemas com a conexão :/");
      })
      .finally(() => {
        setIsLoading(false);
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
      <form
        onSubmit={manageLogin}
        className="border-radius-soft border-default pa-4 ma-auto column gap-4"
      >
        <h1 className="font-lg font-medium text-dark-3">Acessar minha conta</h1>
        <div className="column gap-2">
          <label htmlFor="username" className="font-md font-medium text-dark-5">
            Usuário
          </label>
          <input
            type={"text"}
            placeholder="Usuário"
            name="username"
            id="username"
            className="border-default border-radius-soft pa-2 font-md font-medium text-dark-5"
            style={{ width: "350px" }}
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="column gap-2">
          <label htmlFor="password" className="font-md font-medium text-dark-5">
            Senha
          </label>
          <input
            type={"password"}
            placeholder="Senha"
            name="password"
            id="password"
            className="border-default border-radius-soft pa-2 font-md font-medium text-dark-5"
            style={{ width: "350px" }}
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type={"submit"}
          className="btn flex jc-center ai-center gap-2 font-md font-medium pa-2 bg-red-1 text-white-1 border-radius-soft"
          disabled={isLoading}
        >
          {isLoading ? <CircleNotch className="icon-md spinning" /> : "Acessar"}
        </button>
        <Link
          to={"/supplier/login"}
          className="row jc-between ai-center font-medium font-md text-dark-3"
        >
          Login as supplier
          <ArrowCircleRight className="icon-default" />
        </Link>
      </form>
    </>
  );
}
