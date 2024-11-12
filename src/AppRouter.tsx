import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Auth from "./pages/auth";
import Home from "./pages/Home";
import Products from "./Components/Products/Products";
import ShowProduct from "./Components/ShowProduct/ShowProduct";
import EditCom from "./Components/EditProduct/EditProduct";
import AddProduct from "./Components/AddProduct/AddProduct";
import NotFound from "./Components/NotFound/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
      <Route
        path="/dashboard"
        element={<Home />}>
        <Route index element={<Products />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="product/:id" element={<ShowProduct />} />
        <Route path="product/edit/:id" element={<EditCom />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
