import { useState } from "react";
import { login } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserAction } from "../store/actions/userAction";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (!user || !password) return;

    const data = {
      username: user,
      password: password,
    };

    login(data)
      .then((res) => res.json())
      .then((doc) => {
        const user = {
          id: doc._id,
          token: "abc123",
          username: doc.username,
          viewAs: doc.viewAs,
          firstName: doc.name,
        };
        dispatch(setUserAction(user));
        persistUserState(user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  function persistUserState(user) {
    localStorage.setItem("userState", JSON.stringify(user));
  }

  return (
    <>
      <form
        onSubmit={handleLogin}
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
            defaultValue={user}
            onChange={(e) => setUser(e.target.value)}
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
          className="btn font-md font-medium pa-2 bg-red-1 text-white-1 border-radius-soft"
        >
          Acessar
        </button>
      </form>
    </>
  );
}
