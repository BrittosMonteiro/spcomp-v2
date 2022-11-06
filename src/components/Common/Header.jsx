import { Link, useNavigate } from "react-router-dom";
import { User, SignOut, LockKey, Handshake, Airplane } from "phosphor-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Header() {
  const navigate = useNavigate();
  function navigateTo(route) {
    navigate(route);
  }

  return (
    <header className="header py-4">
      <span className="font-medium font-md">Olá, Lucas</span>
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
          <DropdownMenu.Trigger>
            <LockKey className="icon-default" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-white-1 border-default border-radius-soft pa-2 gap-4 column font-medium font-md">
              <DropdownMenu.Item
                className="row align-items-center gap-2"
                onClick={() => navigateTo("/admin-route/customers")}
              >
                <Handshake className="icon-default" />
                Clientes
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="row align-items-center gap-2"
                onClick={() => navigateTo("/admin-route/suppliers")}
              >
                <Airplane className="icon-default" />
                Fornecedores
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <Link to="/main/profile" className="text-dark-3">
          <User className="icon-default" />
        </Link>
        <Link to="" className="text-dark-3">
          <SignOut className="icon-default" />
        </Link>
      </div>
    </header>
  );
}
