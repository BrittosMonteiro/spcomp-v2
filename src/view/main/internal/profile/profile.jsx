import { CircleNotch, Eye, EyeSlash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../../../components/Common/PageTitle";
import {
  readUserById,
  updatePassword,
} from "../../../../services/usersService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../store/actions/messageBoxAction";

export default function Profile() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  async function readUserInformation() {
    setIsLoading(true);

    await readUserById(userSession.id)
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword) return;
    if (newPassword !== confirmNewPassword) return;

    setIsLoading(true);

    const updatePass = {
      idUser: userSession.id,
      newPassword,
      confirmNewPassword,
    };

    await updatePassword(updatePass)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          readUserInformation();
          setNewPassword("");
          setConfirmNewPassword("");
          handleMessageBox("success", "Senha alterada");
        } else {
          handleMessageBox("failed", "Não foi possível alterar a senha");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível alterar a senha");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    readUserInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <div className="column gap-8">
      <PageTitle title={"Perfil"} />
      <form onSubmit={handleUpdate} className="column gap-6">
        <div className="row ai-start jc-sart gap-4">
          <div className="column gap-4">
            <label htmlFor="">Nome</label>
            <input
              type={"text"}
              value={name}
              disabled
              className="border-default pa-2 font-md font-medium text-dark-1"
            />
          </div>
          <div className="column gap-4">
            <label htmlFor="">Sobrenome</label>
            <input
              type={"text"}
              value={surname}
              disabled
              className="border-default pa-2 font-md font-medium text-dark-1"
            />
          </div>
        </div>

        <div className="row ai-start jc-sart gap-4">
          <div className="column gap-4">
            <label htmlFor="">Usuário</label>
            <input
              type={"text"}
              value={username}
              disabled
              className="border-default pa-2 font-md font-medium text-dark-1"
            />
          </div>
          <div className="column gap-4">
            <label htmlFor="">Email</label>
            <input
              type={"text"}
              value={email}
              disabled
              className="border-default pa-2 font-md font-medium text-dark-1"
            />
          </div>
        </div>

        <div className="column gap-4">
          <h2 className="font-lg font-medium">Alterar a senha</h2>
          <div className="row ai-start jc-sart gap-4">
            <div className="column gap-4">
              <label htmlFor="">Nova senha</label>
              <div className="row gap-1 ai-center border-default pa-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  defaultValue={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="font-md font-medium text-dark-1"
                />
                <button
                  type="button"
                  className="flex bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <Eye className="icon-default" />
                  ) : (
                    <EyeSlash className="icon-default" />
                  )}
                </button>
              </div>
            </div>
            <div className="column gap-4">
              <label htmlFor="">Confirma a nova senha</label>
              <div className="row gap-1 ai-center border-default pa-2">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  defaultValue={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="font-md font-medium text-dark-1"
                />
                <button
                  type="button"
                  className="flex bg-transparent"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                >
                  {showConfirmNewPassword ? (
                    <Eye className="icon-default" />
                  ) : (
                    <EyeSlash className="icon-default" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              type="submit"
              className="flex bg-green-1 text-white-1 pa-2 border-radius-soft font-md font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircleNotch className="icon-default spinning" />
              ) : (
                "Alterar"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
