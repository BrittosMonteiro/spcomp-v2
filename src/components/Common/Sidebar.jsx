import {
  AirplaneInFlight,
  CaretLeft,
  CaretRight,
  ClipboardText,
  Cpu,
  CurrencyCircleDollar,
  GearSix,
  Package,
  SignOut,
  User,
} from "phosphor-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { unsetUser } from "../../store/actions/userAction";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [open, setOpen] = useState(true);

  const roles = [
    {},
    { label: "Administrador" },
    { label: "Vendedor" },
    { label: "Comprador" },
    { label: "Supplier" },
  ];

  const internalRoutes = [
    {
      path: "/main/items",
      label: "Itens",
      icon: <Cpu className="icon-default" alt="Itens" />,
    },
    {
      path: "/main/order",
      label: "Pedidos",
      icon: <ClipboardText className="icon-default" alt="Pedidos" />,
    },
    {
      path: "/main/stock",
      label: "Estoque",
      icon: <Package className="icon-default" alt="Estoque" />,
    },
    {
      path: "/main/sales",
      label: "Vendas",
      icon: <CurrencyCircleDollar className="icon-default" alt="Vendas" />,
    },
  ];

  const AdminRoutes = [
    {
      path: "/admin/general",
      label: "Administrador",
      icon: <GearSix className="icon-default" alt="Administrador" />,
    },
    {
      path: "/admin/imports/list",
      label: "Importação",
      icon: <AirplaneInFlight />,
    },
  ];

  const supplierRoutes = [
    {
      path: "/supplier/inquiry-list",
      label: "Inquiries",
      icon: <Cpu className="icon-default" alt="Inquiries" />,
    },
    {
      path: "/supplier/order-requests",
      label: "Orders",
      icon: <ClipboardText className="icon-default" alt="Orders" />,
    },
  ];

  const profileRoute = {
    path: "/main/profile",
    label: "Perfil",
    icon: <User className="icon-default" alt="Perfil" />,
  };

  function logout() {
    localStorage.removeItem("loggedUser");
    dispatch(unsetUser());
    navigate("/login");
  }

  const pathname = window.location.pathname;
  return (
    <>
      {userSession.isLogged && (
        <div
          className={`bg-dark-2 pa-4 column gap-4 jc-between sidebar ${
            open && "sidebar-open"
          }`}
        >
          <div className="column gap-4">
            <div className="row jc-between ai-start gap-4">
              {open && (
                <div className="column">
                  <Link
                    to={"/main/profile"}
                    className="font-lg font-medium text-white-1"
                  >
                    {userSession.username}
                  </Link>
                  <span
                    className="font-sm font-light text-dark-7"
                    style={{ fontStyle: "italic" }}
                  >
                    {roles[userSession.role].label}
                  </span>
                </div>
              )}

              <button
                className="row bg-red-1 text-white-1 border-radius-soft pa-1"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <CaretLeft
                    className="icon-default"
                    alt={userSession.role === 4 ? "Close" : "Fechar"}
                  />
                ) : (
                  <CaretRight
                    className="icon-default"
                    alt={userSession.role === 4 ? "Open" : "Abrir"}
                  />
                )}
              </button>
            </div>
            {userSession.role >= 1 && userSession.role <= 3 ? (
              <>
                <hr />
                <div className="column gap-4">
                  {internalRoutes.map((link, index) => (
                    <SidebarLink
                      link={link}
                      open={open}
                      pathname={pathname}
                      key={index}
                    />
                  ))}
                </div>
              </>
            ) : null}
            {userSession.role >= 1 && userSession.role <= 3 ? (
              <>
                <hr />
                <div className="column gap-4">
                  {userSession.role === 1 && (
                    <>
                      {AdminRoutes.map((link, index) => (
                        <SidebarLink
                          link={link}
                          open={open}
                          pathname={pathname}
                          key={index}
                        />
                      ))}
                    </>
                  )}

                  {userSession.role >= 1 && userSession.role <= 3 && !open && (
                    <SidebarLink
                      link={profileRoute}
                      open={open}
                      pathname={pathname}
                    />
                  )}
                </div>
              </>
            ) : null}
            {userSession.role === 4 ? (
              <>
                <hr />
                <div className="column gap-4">
                  {supplierRoutes.map((link, index) => (
                    <SidebarLink
                      link={link}
                      open={open}
                      pathname={pathname}
                      key={index}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div className="column">
            <div
              className={`row text-white-1 ${
                open ? "jc-start gap-4" : "jc-center"
              }`}
            >
              <button
                type="button"
                className="row ai-center gap-4 bg-transparent jc-center text-white-1 font-md font-regular"
                onClick={() => logout()}
              >
                <SignOut
                  className="icon-default"
                  alt={userSession.role === 4 ? "Sign out" : "Sair"}
                />
                {open ? (
                  <>
                    <span>Sair</span>
                  </>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
