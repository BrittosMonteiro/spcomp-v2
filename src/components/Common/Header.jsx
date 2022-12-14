import { Link } from "react-router-dom";
import {
  User,
  SignOut,
  Handshake,
  Airplane,
  DotsNine,
  Users,
} from "phosphor-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { unsetUSer } from "../../store/actions/userAction";

export default function Header() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  function logout() {
    localStorage.removeItem("loggedUser");
    dispatch(unsetUSer());
  }

  return (
    <>
      {userSession?.isLogged && (
        <header className="header py-4">
          <span className="font-medium font-md">
            Olá, {userSession.username}
          </span>
          <ul className="font-medium font-md">
            <li className="pb-1">
              <Link to="/main/">Início</Link>
            </li>
            <li className="pb-1">
              <Link to="/main/items">Itens</Link>
            </li>
            <li className="pb-1">
              <Link to="/main/inquiry">Cotações</Link>
            </li>
            <li className="pb-1">
              <Link to="/main/purchase">Compras</Link>
            </li>
            <li className="pb-1">
              <Link to="/main/stock">Estoque</Link>
            </li>
            <li className="pb-1">
              <Link to="/main/sales">Vendas</Link>
            </li>
          </ul>
          <div className="header-icons gap-3">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="bg-transparent">
                <DotsNine className="icon-md" />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-white-1 border-default border-radius-soft pa-2 gap-4 column font-medium font-md">
                  <DropdownMenu.Item>
                    <Link
                      to="/admin-route/customers"
                      className="row align-items-center gap-2 text-dark-1"
                    >
                      <Handshake className="icon-default" />
                      Clientes
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item>
                    <Link
                      to="/admin-route/suppliers"
                      className="row align-items-center gap-2 text-dark-1"
                    >
                      <Airplane className="icon-default" />
                      Fornecedores
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item>
                    <Link
                      to="/admin-route/users"
                      className="row align-items-center gap-2 text-dark-1"
                    >
                      <Users className="icon-default" />
                      Usuários
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item>
                    <Link
                      to="/main/profile"
                      className="row align-items-center gap-2 text-dark-1"
                    >
                      <User className="icon-default" />
                      Perfil
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    className="row align-items-center gap-2 text-dark-1"
                    onClick={() => logout()}
                  >
                    <SignOut className="icon-default" />
                    Sair
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </header>
      )}
    </>
  );
}
