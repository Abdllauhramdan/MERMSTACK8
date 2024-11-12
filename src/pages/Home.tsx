
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ProductsSVG from "../Components/ProductsSVG/ProductsSVG";
import { IoBookmarkOutline } from "react-icons/io5";
import LogoutSVG from "../Components/LogoutSVG/LogoutSVG";
import axios from "axios";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const Home = () => {
  const userPhoto: string = localStorage.getItem('image');
  const first: string = localStorage.getItem("First-Name");
  const last: string = localStorage.getItem("Last-Name");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () : void => setIsSidebarOpen(!isSidebarOpen);

  const handleClick = () : void => {
    axios
      .post("https://test1.focal-x.com/api/logout",[],{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      })
      .then((res) => {
        toast.success(res.data.msg);
        localStorage.removeItem("image");
        localStorage.removeItem("First-Name");
        localStorage.removeItem("Last-Name");
        localStorage.removeItem("token");
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed min-h-full md:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transform md:translate-x-0 transition-transform duration-300 lg:min-w-[20.02%] md:min-w-[200px] bg-sidebarColor px-3 z-10`}>
        <div className="flex flex-col items-center justify-between h-full py-8">
          <div className="flex flex-col items-center">
            <img
              src="/assets/image/Logo (1).png"
              alt="Logo"
              width="97px"
              className="mb-6  md:block"
            />
            <img
              src={userPhoto}
              alt="User Profile"
              width="141px"
              className="rounded-full mb-2  md:block"
            />
            <h1 className="font-bold text-lg mb-8  md:block">
              {first} {last}
            </h1>
            
            {/* النسخة الأولى من القائمة */}
            <div className="flex flex-col items-center">
              <NavLink
                to="/dashboard"
                className="flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]">
                <ProductsSVG />
                Products
              </NavLink>
              <NavLink
                to="/favorites"
                className="flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]">
                <IoBookmarkOutline />
                Favorites
              </NavLink>
              <NavLink
                to="/order"
                className="flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]">
                <IoBookmarkOutline />
                Order List
              </NavLink>
            </div>

            {/* النسخة الثانية (المعاد ترتيبها) */}
            <div className="flex flex-col items-center">
              <NavLink
                to="/order"
                className="flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]">
                <IoBookmarkOutline />
                Order List
              </NavLink>
              <NavLink
                to="/favorites"
                className="flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]">
                <IoBookmarkOutline />
                Favorites
              </NavLink>
              <NavLink
                to="/dashboard"
                className="flex items-center text-sm gap-2 mb-3 rounded w-full justify-center py-2 lg:w-[193px] md:w-[140px]">
                <ProductsSVG />
                Products
              </NavLink>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 text-sm font-medium py-2 lg:w-[193px] md:w-[140px]">
            Logout
            <LogoutSVG />
          </button>
        </div>
      </div>

      <div className="w-full pt-6 bg-anotherSidebarColor">
        <button
          className="md:hidden p-4 text-gray-700 bg-gray-200 rounded-full absolute right-3 top-4 z-20"
          onClick={handleToggleSidebar}>
          {isSidebarOpen ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
