import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className="bg-custom-gradient px-3 flex justify-center items-center w-full min-h-[100vh] py-16">
        <Outlet />
      </div>
    </>
  );
}

export default Auth