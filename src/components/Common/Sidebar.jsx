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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar() {
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
      icon: <Cpu className="icon-default" />,
    },
    {
      path: "/main/orders",
      label: "Pedidos",
      icon: <ClipboardText className="icon-default" />,
    },
    {
      path: "/main/stock",
      label: "Estoque",
      icon: <Package className="icon-default" />,
    },
    {
      path: "/main/sales",
      label: "Vendas",
      icon: <CurrencyCircleDollar className="icon-default" />,
    },
  ];

  const AdminRoutes = [
    {
      path: "/admin/general",
      label: "Administrador",
      icon: <GearSix className="icon-default" />,
    },
  ];
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
              <CaretLeft className="icon-default" />
            ) : (
              <CaretRight className="icon-default" />
            )}
          </button>
        </div>
        <hr />
        <div className="column gap-4">
          {internalRoutes.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`row text-white-1 ${
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
        <hr />
        <div className="column gap-4">
          {AdminRoutes.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`row text-white-1 ${
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
      </div>
      <div className="column">
        <div
          className={`row text-white-1 ${
            open ? "jc-start gap-4" : "jc-center"
          }`}
        >
          {open ? (
            <>
              <SignOut className="icon-default" /> <span>Sair</span>
            </>
          ) : (
            <button className="bg-transparent jc-center text-white-1">
              <SignOut className="icon-default" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
