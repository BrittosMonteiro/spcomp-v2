import {
  CaretLeft,
  CaretRight,
  ClipboardText,
  Cpu,
  CurrencyCircleDollar,
  GearSix,
  Package,
  SignOut,
} from "phosphor-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { unsetUser } from "../../store/actions/userAction";

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
      path: "/main/orders",
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

  function logout() {
    localStorage.removeItem("loggedUser");
    dispatch(unsetUser());
    navigate("/login");
  }
  return (
    <div
      className="border-radius-soft bg-dark-2 pa-4 column gap-4 jc-between"
      style={{
        width: `${open ? "275px" : ""}`,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <div className="column gap-4">
        <div className="row jc-between ai-start gap-4">
          {open && (
            <div className="column">
              <span className="font-lg font-medium text-white-1">
                {userSession.username}
              </span>
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
                <Link
                  key={index}
                  to={link.path}
                  className={`row text-white-1 font-md font-regular ${
                    open ? "jc-start gap-4" : "jc-center"
                  }`}
                >
                  {open ? (
                    <>
                      {link.icon} <span>{link.label}</span>
                    </>
                  ) : (
                    link.icon
                  )}
                </Link>
              ))}
            </div>
          </>
        ) : null}
        {userSession.role === 1 ? (
          <>
            <hr />
            <div className="column gap-4">
              {AdminRoutes.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`row text-white-1 font-md font-regular ${
                    open ? "jc-start gap-4" : "jc-center"
                  }`}
                >
                  {open ? (
                    <>
                      {link.icon} <span>{link.label}</span>
                    </>
                  ) : (
                    link.icon
                  )}
                </Link>
              ))}
            </div>
          </>
        ) : null}
        {userSession.role === 4 ? (
          <>
            <hr />
            <div className="column gap-4">
              {supplierRoutes.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`row text-white-1 font-md font-regular ${
                    open ? "jc-start gap-4" : "jc-center"
                  }`}
                >
                  {open ? (
                    <>
                      {link.icon} <span>{link.label}</span>
                    </>
                  ) : (
                    link.icon
                  )}
                </Link>
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
  );
}
