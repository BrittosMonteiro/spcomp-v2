import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import {
  createUser,
  updateUser,
} from "../../../../../../services/usersService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogUser({ open, onClose, reload, user }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState(0);
  const [role, setRole] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    const userData = {
      name,
      surname,
      status,
      role,
    };

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
          handleMessageBox("success", "Usuário criado com sucesso");
        } else {
          handleMessageBox("failed", "Não foi possível criar o usuário");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível criar o usuário");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function updateCurrentUser(userData) {
    await updateUser(userData)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          clearFields();
          onClose();
          reload();
          handleMessageBox("success", "Usuário alterado com sucesso");
        } else {
          handleMessageBox("failed", "Não foi possível alterar o usuário");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível alterar o usuário");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function clearFields() {
    setName(null);
    setSurname(null);
    setStatus(null);
    setRole(null);
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <DialogDefault
      open={open}
      onClose={onClose}
      title={`${user?.id ? "Informações do" : "Adicionar"} usuário`}
    >
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
            className="flex font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
          >
            {isLoading ? (
              <CircleNotch className="icon-default spinning" />
            ) : (
              <>{user?.id ? "Atualizar" : "Criar"}</>
            )}
          </button>
        </div>
      </form>
    </DialogDefault>
  );
}
