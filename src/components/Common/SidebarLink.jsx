import { Link } from "react-router-dom";

export default function SidebarLink({ link, pathname, open }) {
  return (
    <Link
      to={link.path}
      className={`row text-white-1 font-md pa-1 border-radius-soft font-regular ${
        open ? "jc-start gap-4" : "jc-center"
      } ${pathname === link.path && "bg-dark-3"}`}
    >
      {open ? (
        <>
          {link.icon} <span>{link.label}</span>
        </>
      ) : (
        link.icon
      )}
    </Link>
  );
}
