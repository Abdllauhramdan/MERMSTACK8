import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
// import EditInputCom from "../EditInputCom/EditInputCom";
import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setemailError] = useState<string>("");
  const [passwordError, setpasswordError] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setloading] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const isValidate = () : boolean => {
    let isValid = true;
    if (!email) {
      setemailError("Email is required");
      isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setemailError("Invalid email address");
        isValid = false;
      };
    if(!password){
      setpasswordError("Password is required");
      isValid = false;
    } else if(password.length < 8) {
      setpasswordError("Password must be at least 8 characters long");
      isValid = false;
    }
    return isValid
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isValidate()){
      setloading(true);
      console.log(email, password);
      const data = {
        email: email,
        password: password,
      };
      axios
        .post("https://test1.focal-x.com/api/login", data)
        .then((res) => {
          console.log("login success");
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("First-Name", res.data.user.first_name);
          localStorage.setItem("Last-Name", res.data.user.last_name);
          localStorage.setItem("image", res.data.user.profile_image_url);
          setEmail("");
          setPassword("");
          setloading(false);
          toast.success('Login Success');
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          setloading(false);
          toast.error(err.response.data.msg);
        });
    }
  };




  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader auth={true} />
        </div>
      ) : (
        <div className="auth-shape" style={{ padding: "42px 0 41px" }}>
          <img src="/assets/image/Logo.png" className="mx-auto" alt="error" />
          <h1
            className="font-semibold text-primary"
            style={{ fontSize: "22px", margin: "43px 0 9px" }}>
            Sign In
          </h1>
          <p className="text-secondary font-normal text-sm">
            Enter your credentials to access your account
          </p>
          <form
            onSubmit={(e) => handleLogin(e)}
            style={{ margin: "50px 0 27px", padding: "0 30px" }}
            className="flex flex-col text-start">
            <div className="mb-5 flex flex-col">
              <InputCom
                error={emailError}
                value={email}
                label="Email"
                type="email"
                placeholder="Enter your email"
                callBackFunction={handleEmail}
              />
              {emailError && (
                <p className="text-red-500 text-sm font-meduim">
                  {emailError}{" "}
                </p>
              )}
            </div>
            <div className="flex flex-col" style={{ marginBottom: "30px" }}>
              <InputCom
                error={passwordError}
                value={password}
                label="Password"
                type="password"
                placeholder="Enter your password"
                callBackFunction={handlePassword}
              />
              {passwordError && (
                <p className="text-red-500 text-sm font-meduim">
                  {passwordError}{" "}
                </p>
              )}
            </div>
            <Button text="SIGN IN" type="submit" />
          </form>
          <h1 className="text-secondary text-sm">
            Don’t have an account?{" "}
            <NavLink
              to={"register"}
              className="text-customyellow font-semibold underline">
              Create one
            </NavLink>
          </h1>
        </div>
      )}
    </>
  );
};

export default Login;
