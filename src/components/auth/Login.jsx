import React, { useState } from "react";
import { loginUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserReducer } from "../../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    if (!response) {
      navigate("/failure");
    } else {
      console.log(response);
      dispatch(loginUserReducer(response));
      navigate("/success");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
