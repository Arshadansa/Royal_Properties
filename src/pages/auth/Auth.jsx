import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { glogin, login, signup } from "../../actions/auth.js";

import { Facebook, GitHub, Google } from "@mui/icons-material";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Log In
    </button>
  );
};

const Auth = () => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [Switch, setSwitch] = useState(false);
  const renderContent = () => {
    return (
      <div className="flex justify-center text-center">
        {action === "login" ? (
          <>
            <LoginForm />
          </>
        ) : (
          <>
            <SignupForm />
          </>
        )}
      </div>
    );
  };
  var variant = "outlined";
  console.log(variant);
  return (
    <div className="pt-6">
      <div>
        {Switch ? (
          <>
            <div id="login/signup">
              <Button
                variant={`${variant}`}
                onClick={() => {
                  navigate("/auth/login");
                  setSwitch(false);
                  variant = "contained";
                }}
              >
                Log in
              </Button>
              &nbsp;
              <Button
                variant="contained"
                onClick={() => {
                  setSwitch(true);
                  navigate("/auth/signup");
                }}
                id="userRegister"
              >
                Register
              </Button>
            </div>
          </>
        ) : (
          <>
            <div id="login/signup">
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/auth/login");
                  setSwitch(false);
                }}
              >
                Log in
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                onClick={() => {
                  setSwitch(true);
                  navigate("/auth/signup");
                }}
              >
                Register
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="pt-4 mb-8">{renderContent()}</div>
      <ToastContainer />
    </div>
  );
};

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    console.log("login called ---------------------");
    e.preventDefault();
    try {
      dispatch(login({ email: loginEmail, password: loginPassword }, navigate));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
      <h2 className="p-3 text-3xl font-bold text-pink-400">Royal Properties</h2>
      <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
      <h3 className="text-xl font-semibold text-blue-400 pt-2">Sign In!</h3>
      <div className="flex space-x-2 m-4 items-center justify-center">
        <div className="socialIcon">
          <Google /> <LoginButton />
        </div>
      </div>
      {/* Inputs */}
      <div className="flex flex-col items-center justify-center">
        <input
          type="email"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Email"
          name="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
          name="password"
        ></input>
        <button
          className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in"
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
      <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
      <p className="text-blue-400 mt-4 text-sm">Don't have an account?</p>
      <Link to="/auth/signup">
        <p className="text-blue-400 mb-4 text-sm font-medium cursor-pointer">
          Create a New Account?
        </p>
      </Link>
    </div>
  );
};

const SignupForm = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = (e) => {
    console.log("signup called ---------------------");
    e.preventDefault();
    try {
      dispatch(
        signup(
          {
            email: registerEmail,
            password: registerPassword,
            username: registerName,
          },
          navigate
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-400 text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
      <h2 className="p-3 text-3xl font-bold text-white">Royal Properties</h2>
      <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
      <h3 className="text-xl font-semibold text-white pt-2">Create Account!</h3>
      <div className="flex space-x-2 m-4 items-center justify-center">
        <div className="socialIcon border-white">
          <Google className="text-white" />
        </div>
      </div>
      {/* Inputs */}
      <div className="flex flex-col items-center justify-center mt-2">
        <input
          type="text"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1  focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Name"
          onChange={(e) => setRegisterName(e.target.value)}
        ></input>
        <input
          type="email"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1  focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1  focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        ></input>

        <button
          className="rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in"
          type="submit"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
      <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
      <p className="text-white mt-4 text-sm">Already have an account?</p>
      <Link to="/auth/login">
        <p className="text-white mb-4 text-sm font-medium cursor-pointer">
          Sign In to your Account?
        </p>
      </Link>
    </div>
  );
};

export default Auth;
