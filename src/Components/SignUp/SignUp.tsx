import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import EditInputCom from "../EditInputCom/EditInputCom";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

interface ErrorState {
  email?: string;
  password?: string;
  confirm?: string;
  first?: string;
  last?: string;
  image?: string;
}

const SignUp = () => {
    const [email, setemail] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [confirm, setconfirm] = useState<string>('');
    const [first, setfirst] = useState<string>('');
    const [last, setlast] = useState<string>('');
    const [image, setimage] = useState<File | string>("");
    const [previewImage, setPreviewImage] = useState('');
    const [error, setError] = useState<ErrorState>({});
    const [loading, setloading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleClick = () : void => {
        fileInputRef.current.click();
    }
    const handleFile = (e : React.ChangeEvent<HTMLInputElement>) =>{
      const file = e.target.files[0];
      if(file){
        const url = URL.createObjectURL(file);
        setPreviewImage(url);
      }
      setimage(file);
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setemail(e.target.value)
    }
    const handlePassword= (e: React.ChangeEvent<HTMLInputElement>) => {
      setpassword(e.target.value)
    }
    const handleconfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
      setconfirm(e.target.value)
    }
    const handlefirst = (e: React.ChangeEvent<HTMLInputElement>) => {
      setfirst(e.target.value)
    }
    const handlelast = (e: React.ChangeEvent<HTMLInputElement>) => {
      setlast(e.target.value)
    }


    const isValidate = () :boolean  =>{
      const errors : ErrorState = {};
      if(!email || !/\S+@\S+\.\S+/.test(email)){
        errors.email = "Enter Valid email address";
      }
      if(!password || password.length < 8){
        errors.password =
          "Password is required and must be at least 8 characters long";
      }
      if(!confirm || confirm.length < 8){
        errors.confirm =
          "confirm password is required and must be at least 8 characters long";
      }
      if(password !== confirm){
        errors.confirm = "Password and confirm password must be same";
      }
      if(!first){
        errors.first = "First name is required";
      }
      if(!last){
        errors.last = "Last name is required";
      }
      if(!image){
        errors.image = "Image is required";
      }
      setError(errors);

      return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(isValidate()){
        setloading(true);
        const user_name: string = first + "_" + last;
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile_image", image);
        formData.append("first_name", first);
        formData.append("last_name", last);
        formData.append("user_name", user_name);
        formData.append("password_confirmation", confirm);
        axios
          .post("https://test1.focal-x.com/api/register", formData)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("First-Name", res.data.data.user.first_name);
            localStorage.setItem("Last-Name", res.data.data.user.last_name);
            localStorage.setItem("image", res.data.data.user.profile_image_url);
            setemail("");
            setpassword("");
            setconfirm("");
            setfirst("");
            setlast("");
            setimage("");
            setPreviewImage("");
            setloading(false);
            toast.success("Register Success")
            navigate("/dashboard");
          })
          .catch((err) => {
            setloading(false);
            console.log(err.response.data.msg);
            toast.error(err.response.data.msg);
          });
      
      }
    }
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader auth={true} />
        </div>
      ) : (
        <div className="auth-shape" style={{ padding: "42px 0 20px" }}>
          <img src="/assets/image/Logo.png" className="mx-auto" alt="error" />
          <h1
            className="font-semibold text-primary"
            style={{ fontSize: "22px", margin: "42px 0 8px" }}>
            Sign up
          </h1>
          <p className="text-secondary font-normal text-sm">
            Fill in the following fields to create an account.
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ margin: "24px 0", padding: "0 21px 0 30px" }}
            className="flex flex-col text-start">
            <label
              style={{ marginBottom: "8px" }}
              htmlFor=""
              className="text-secondary text-sm font-medium">
              Name
            </label>
            <div className="mb-4 md:flex md:flex-wrap md:space-x-6">
              <div className="md:flex-1 w-full md:mb-0 mb-2">
                <InputCom
                  error={error.first}
                  callBackFunction={handlefirst}
                  value={first}
                  label=""
                  type="text"
                  placeholder="First Name"
                />
                {error.first && (
                  <p className="text-red-500  text-sm font-meduim">
                    {error.first}{" "}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <InputCom
                  callBackFunction={handlelast}
                  value={last}
                  error={error.last}
                  label=""
                  type="text"
                  placeholder="Last Name"
                />
                {error.last && (
                  <p className="text-red-500 text-sm font-meduim">
                    {error.last}{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <InputCom
                callBackFunction={handleEmail}
                value={email}
                error={error.email}
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              {error.email && (
                <p className="text-red-500 text-sm font-meduim">
                  {error.email}{" "}
                </p>
              )}
            </div>
            <label
              style={{ marginBottom: "8px" }}
              htmlFor=""
              className="text-secondary mb-2.5 text-sm font-medium">
              Password
            </label>
            <div className="mb-4 md:flex md:flex-wrap md:space-x-6">
              <div className="md:flex-1 w-full md:mb-0 mb-2">
                <InputCom
                  callBackFunction={handlePassword}
                  value={password}
                  error={error.password}
                  label=""
                  type="password"
                  placeholder="Password"
                />
                {error.password && (
                  <p className="text-red-500 text-sm font-meduim">
                    {error.password}{" "}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <InputCom
                  callBackFunction={handleconfirm}
                  value={confirm}
                  error={error.confirm}
                  label=""
                  type="password"
                  placeholder="Confirm Password"
                />
                {error.confirm && (
                  <p className="text-red-500 text-sm font-meduim">
                    {error.confirm}{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                style={{ marginBottom: "17px" }}
                className="text-secondary text-sm font-medium">
                Profile Image
              </label>
              <button
                type="button"
                className="inline-flex bg-photoBackGround items-center justify-center w-[100px] h-[100px] rounded"
                style={{
                  border: error.image
                    ? "2px dashed red"
                    : "2px dashed rgba(56, 78, 183, 0.3)",
                  marginBottom: "15px",
                }}
                onClick={handleClick}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Selected Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <img src="/assets/image/Upload icon.png" alt="Upload Icon" />
                )}
                <input
                  ref={fileInputRef}
                  className="sr-only"
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => handleFile(e)}
                />
              </button>
              {error.image && (
                <p className="text-red-500 text-sm font-meduim">
                  {error.image}{" "}
                </p>
              )}
            </div>
            <Button type="submit" text="SIGN UP" />
          </form>
          <h1 className="text-secondary text-sm">
            Don’t have an account?{" "}
            <NavLink
              to={"/"}
              className="text-customyellow underline font-semibold ">
              Sign in
            </NavLink>
          </h1>
        </div>
      )}
    </>
  );
};

export default SignUp;
