import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import Axios from "axios";

function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);
  var navigate = useNavigate();
  const { setUsername } = useContext(UserContext);
  const [tempUsername, setTempUsername] = useState(0);
  const [tempPassword, setTempPassword] = useState(0);
  const [failedLogin, setFailedLogin] = useState(0);

  const checkCredentials = () => {
    Axios.get(
      "http://localhost:3001/api/validate_user",
      { params: { id: tempUsername, ps: tempPassword } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      response.data[0] ? loginUser() : changeFailedLogin();
    });
  };

  const loginUser = () => {
    setUsername(tempUsername);
    navigate("/account/" + tempUsername);
  };

  const changeFailedLogin = () => {
    setFailedLogin(1);
  };

  return (
    <>
      <br />
      <h2>Login:</h2>
      <div className="login-form">
        {failedLogin ? <p>INCORRECT USERNAME OR PASSWORD!</p> : <p></p>}
        <label>Username </label>
        <input
          type="text"
          onChange={(e) => {
            setTempUsername(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Password </label>
        <input
          type="text"
          onChange={(e) => {
            setTempPassword(e.target.value);
          }}
        />
        <br />
        <br />
      </div>
      <button onClick={checkCredentials}>Login</button>
    </>
  );
}

// onClick={() => {
//   setUsername("benmanker");
//   navigate("/account/benmanker");
// }}

export default Login;
