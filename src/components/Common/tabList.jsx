import React from "react";
import { useSelector } from "react-redux";

export default function TabList({ tab, tabList, changeTab }) {
  const userSession = useSelector((state) => {
    return state.login;
  });

  return (
    <ol className="row w-full gap-4">
      {tabList.map((option, index) => (
        <React.Fragment key={index}>
          {((!option.isAdmin || option.isAdmin) && userSession.isAdmin) ||
          (!option.isAdmin && !userSession.isAdmin) ? (
            <li>
              <button
                type="button"
                className={`font-md font-medium pa-1 border-radius-soft ${
                  tab === index
                    ? "bg-red-1 text-white-1"
                    : "bg-transparent text-dark-3"
                }`}
                onClick={() => changeTab(index)}
              >
                {option.label}
              </button>
            </li>
          ) : null}
        </React.Fragment>
      ))}
    </ol>
  );
}
