import { useState } from "react";
import { AuthContext } from "./authContext";
import cookie from "react-cookies";

const AuthProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(cookie.load("cookie_user_token") || "");
  const [userData, setUserData] = useState(
    cookie.load("cookie_user_data") || ""
  );

  const [emp_ID, setEmp_ID] = useState("")

  const expire = new Date();
  expire.setDate(expire.getDate() + 7);

  // ----------------get user data after login-----------------
  const handleUserData = (user_data) => {
    cookie.save("cookie_user_data", user_data, { path: "/", expires: expire });
    setUserData(user_data);
  };

  // ------------get user Token------------------
  const handleToken = (user_token) => {
    cookie.save("cookie_user_token", user_token, { path: "/", expires: expire });
    setToken(user_token);

  };

  // ----------------------Users logout--------------------
  const handleUserLogout = () => {
    if (token) {
      cookie.remove("cookie_user_token", { path: "/" })
      cookie.remove("cookie_user_data", { path: "/" })
      setToken("")
      setUserData("")

    }
  }


  return (
    <AuthContext.Provider
      value={{ handleToken, handleUserData, handleUserLogout, token, userData, setUserData, isLoading, setIsLoading, setEmp_ID, emp_ID }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
