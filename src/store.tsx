import makeStore from "./makeStore";

interface State {
  expression: string;
}

type Action = {
  type: "SET_EXPRESSION";
  payload: string;
};

export const { StoreProvider, useDispatch, useStore } = makeStore<
  State,
  Action
>(
  (state, action) => {
    switch (action.type) {
      case "SET_EXPRESSION":
        return {
          ...state,
          expression: action.payload,
        };
      default:
        return state;
    }
  },
  {
    expression: "",
  }
);
