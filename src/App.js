import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import RouteConfig from "./RouteConfig";
import { useDispatch, useSelector } from "react-redux";
import { glogin, logout } from "./actions/auth";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth0();
  let remainingTime = 0;

  //token validity handling
  useEffect(() => {
    setTimeout(() => {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const expirationTime = decodedToken.exp;
        remainingTime = (expirationTime - currentTime) * 1000;
        const logoutTimeout = setTimeout(() => {
          dispatch(logout(navigate));
          window.location.reload();
        }, remainingTime);
        return () => clearTimeout(logoutTimeout);
      }
    }, 1000);
    setTimeout(() => {
      if (user && remainingTime >= 0) {
        const password = user.sub.split("|")[1];
        const name = user.given_name + " " + user.family_name;
        dispatch(
          glogin(
            { email: user.email, password: password, username: name },
            navigate
          )
        );
      }
    }, [3000]);
  }, [user]);

  return (
    <div className="App">
      <RouteConfig />
    </div>
  );
}

export default App;
