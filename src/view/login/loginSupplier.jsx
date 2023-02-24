import { ArrowCircleRight, CircleNotch } from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, redirect } from "react-router-dom";
import { loginSupplier } from "../../services/loginService";

import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { setUser } from "../../store/actions/userAction";

export default function LoginSupplierView() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function manageLogin(e) {
    e.preventDefault();

    if (!username || !password) {
      handleMessageBox("failed", true, "Revise os campos");
    }

    setIsLoading(true);

    loginSupplier({ username, password })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          const dataToLogin = { ...res.data, isLogged: true };
          dispatch(setUser(dataToLogin));
          localStorage.setItem("loggedUser", JSON.stringify(dataToLogin));
          redirect("/supplier/response");
        } else {
          handleMessageBox("failed", true, "Wrong credentials");
        }
      })
      .catch(() => {
        handleMessageBox(
          "failed",
          true,
          "We're facing problems with connection :/"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleMessageBox(color, display, message) {
    dispatch(displayMessageBox({ color, display, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <form
      onSubmit={manageLogin}
      className="border-radius-soft border-default pa-4 ma-auto column gap-4"
    >
      <h1 className="font-lg font-medium text-dark-3">Access my account</h1>
      <div className="column gap-2">
        <label htmlFor="username" className="font-md font-medium text-dark-5">
          Username
        </label>
        <input
          type={"text"}
          placeholder="Username"
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
          Password
        </label>
        <input
          type={"password"}
          placeholder="Password"
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
      >
        {isLoading ? <CircleNotch className="icon-md spinning" /> : "Access"}
      </button>
      <Link
        to={"/login"}
        className="row jc-between ai-center font-medium font-md text-dark-3"
      >
        Login as employee
        <ArrowCircleRight className="icon-default" />
      </Link>
    </form>
  );
}
