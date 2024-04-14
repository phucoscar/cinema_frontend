import { Navigate, Outlet } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";
import { useContext } from "react";

const RefreshUrl = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <></>;
};

const ProtectedMain = () => {

  const auth = useContext(AuthContextProvider);
  const user = auth?.userState
  const login = user?.isLogin

  return !login ? <RefreshUrl /> : <Outlet />;
};

export default ProtectedMain;