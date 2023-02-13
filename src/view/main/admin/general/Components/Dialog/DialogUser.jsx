import { XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import {
  createUser,
  updateUser,
} from "../../../../../../services/usersService";

export default function DialogUser({ open, onClose, reload, user }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState(0);
  const [role, setRole] = useState(0);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setStatus(user.status);
      setRole(user.role);
    }
  }, [user]);

  const statusOptions = [
    {
      key: true,
      value: "Ativo",
    },
    {
      key: false,
      value: "Desativado",
    },
  ];

  const roleOptions = [
    {
      key: 1,
      value: "Administrador",
    },
    {
      key: 2,
      value: "Vendedor",
    },
    {
      key: 3,
      value: "Comprador",
    },
    {
      key: 4,
      value: "Fornecedor",
    },
  ];

  function handleUser(e) {
    e.preventDefault();
    if (!name || !surname) return;

    const userData = {
      name,
      surname,
      status,
      role,
    };

    console.log(userData);

    if (user?.id) {
      const data = {
        idUser: user.id,
        data: { ...userData },
      };
      updateCurrentUser(data);
    } else {
      createNewUser(userData);
    }
  }

  async function createNewUser(userData) {
    await createUser(userData)
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          clearFields();
          reload();
          onClose();
        }
      })
      .catch((err) => {});
  }

  async function updateCurrentUser(userData) {
    await updateUser(userData)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          clearFields();
          onClose();
          reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearFields() {
    setName(null);
    setSurname(null);
    setStatus(null);
    setRole(null);
  }

  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-medium font-lg">
          {user?.id ? "Informações do" : "Adicionar"} usuário
        </h1>
        <button
          type="button"
          className="flex bg-red text-white-1 pa-1 border-radius-soft"
        >
          <XCircle className="icon-default" />
        </button>
      </div>
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
              {statusOptions.map((status, index) => (
                <option key={index} value={status.key}>
                  {status.value}
                </option>
              ))}
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
              {roleOptions.map((role, index) => (
                <option key={index} value={role.key}>
                  {role.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row jc-between ai-center">
          <button
            type={"submit"}
            className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
          >
            {user?.id ? "Atualizar" : "Concluir"}
          </button>
        </div>
      </form>
    </DialogDefault>
  );
}
