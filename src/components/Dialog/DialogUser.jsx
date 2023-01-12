import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/users";

export default function DialogUser(props) {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [status, setStatus] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (props.userData) {
      setId(props.userData.id);
      setName(props.userData.name);
      setSurname(props.userData.surname);
      setStatus(props.userData.status);
      setRole(props.userData.role);
    }
  }, [props.userData]);

  function handleUser(e) {
    e.preventDefault();
    if (!name || !surname) return;

    const user = {
      name,
      surname,
      status,
      role,
    };

    if (!id) {
      createUser(user)
        .then((res) => res.json())
        .then(() => {
          setId(null);
          setName(null);
          setSurname(null);
          props.reloadList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      user.id = id;
      updateUser(user)
        .then((res) => res.json())
        .then(() => {
          setId(null);
          setName(null);
          setSurname(null);
          props.reloadList();
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
                  <label htmlFor="user_status">Escolher status</label>
                  <select
                    name="user_status"
                    id="user_status"
                    defaultValue={status}
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Escolher status</option>
                    <option value={true}>Ativo</option>
                    <option value={false}>Desativado</option>
                  </select>
                </div>
                <div className="column gap-2 text-dark-3 font-medium font-sm">
                  <label htmlFor="user_role">Função</label>
                  <select
                    name="user_role"
                    id="user_role"
                    defaultValue={role}
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Escolher</option>
                    <option value={1}>Administrador</option>
                    <option value={2}>Vendedor</option>
                    <option value={3}>Comprador</option>
                    <option value={4}>Fornecedor</option>
                  </select>
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
