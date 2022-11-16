import PageTitle from "../components/Common/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserAction,
  removeUserAction,
} from "../store/actions/userAction.js";

import { add, sub } from "../store/actions/counterAction.js";

export default function Index() {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.userReducer;
  });

  const total = useSelector((state) => {
    return state.counterReducer;
  });

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Dashboard"} />
        {`Total: ${total} - Usuário: ${user.username}`}
      </div>
      <button
        onClick={() =>
          dispatch(
            setUserAction({
              username: "brittosmonteiro",
              token: "abc123def456",
            })
          )
        }
      >
        Ativar
      </button>
      <button onClick={() => dispatch(removeUserAction())}>Remover</button>

      <button onClick={() => dispatch(add())}>Somar</button>
      <button onClick={() => dispatch(sub())}>Subtrair</button>
    </>
  );
}
