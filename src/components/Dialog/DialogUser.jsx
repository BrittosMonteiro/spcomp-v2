import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/users";

export default function DialogUser(props) {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const [status, setStatus] = useState(null);
  // const [viewAs, setViewAs] = useState(null);

  useEffect(() => {
    if (props.userData) {
      setId(props.userData.id);
      setName(props.userData.name);
      setSurname(props.userData.surname);
      setEmail(props.userData.email);
      setPassword(props.userData.password);
      // setStatus(props.userData.status);
      // setViewAs(props.userData.viewAs);
    }
  }, [props.userData]);

  function handleUser(e) {
    e.preventDefault();
    if (!name || !surname || !email) return;

    const user = {
      name,
      surname,
      email,
      password,
    };

    if (!id) {
      createUser(user)
        .then((res) => res.json())
        .then(() => {
          props.reloadList();

          setId(null);
          setName(null);
          setSurname(null);
          setEmail(null);
          setPassword(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      user.id = id;
      updateUser(user)
        .then((res) => res.json())
        .then(() => {
          props.reloadList();

          setId(null);
          setName(null);
          setSurname(null);
          setEmail(null);
          setPassword(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay">
          <Dialog.Content className="dialog">
            <Dialog.Title className="font-medium font-lg">
              {id ? "Informações do" : "Adicionar"} usuário
            </Dialog.Title>
            <form onSubmit={handleUser}>
              <div className="row align-item-center gap-4 mt-4">
                <div className="column gap-2 text-dark-3 font-medium font-sm">
                  <label htmlFor="user_name">Nome</label>
                  <input
                    type={"text"}
                    name="user_name"
                    id="user_name"
                    defaultValue={name}
                    placeholder="Nome"
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="column gap-2 text-dark-3 font-medium font-sm">
                  <label htmlFor="user_surname">Sobrenome</label>
                  <input
                    type={"text"}
                    name="user_surname"
                    id="user_surname"
                    defaultValue={surname}
                    placeholder="Sobrenome"
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>
              <div className="row align-item-center gap-4 mt-4">
                <div className="column gap-2 text-dark-3 font-medium font-sm">
                  <label htmlFor="user_email">Email</label>
                  <input
                    type={"email"}
                    name="user_email"
                    id="user_email"
                    defaultValue={email}
                    placeholder="Email"
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="column gap-2 text-dark-3 font-medium font-sm">
                  {!id ? (
                    <>
                      <label htmlFor="user_password">Senha</label>
                      <input
                        type={"password"}
                        name="user_password"
                        id="user_password"
                        defaultValue={password}
                        placeholder="Senha"
                        className="border-default pa-2 border-radius-soft font-medium font-md"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </>
                  ) : null}
                </div>
              </div>

              <hr className="my-4" />
              <div className="row justify-content-between align-items-center">
                <Dialog.Close className="font-medium font-md text-red-1 bg-transparent">
                  Fechar
                </Dialog.Close>
                <button
                  type={"submit"}
                  className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
                >
                  {id ? "Atualizar" : "Concluir"}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </>
  );
}
