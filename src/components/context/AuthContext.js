import { createContext, useReducer } from "react";

export const AuthContext = createContext({});

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: {
          email: action.user.email,
          isAuth: true,
        },
      };

    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

const AuthContextComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;
