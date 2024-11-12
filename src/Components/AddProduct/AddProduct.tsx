import React, { useRef, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/Slice";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const file = useRef<HTMLInputElement>(null); 
    const [image, setImage] = useState<File | null>(null); 
    const [name, setname] = useState<string>(""); 
    const [price, setprice] = useState<string>(""); 
    const [showImage, setshowImage] = useState<string>("");
    const { loading } = useSelector((state) => state.products)


    const handleBackClick = () : void => {
        navigate("/dashboard");
    };
    const handleButtonImage = () : void => {
        file.current?.click();
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
            const imageUrl = URL.createObjectURL(file);
            setshowImage(imageUrl);
        }
    }
    const handleAddClick= () : void =>{
        const data = new FormData();
        data.append('image', image);
        data.append('name', name);
        data.append('price',price);
        dispatch(addProduct(data)).then((result)=>{
            if(result.meta.requestStatus === "fulfilled"){
                toast.success("Product Added Successfully");
                navigate("/dashboard");
            }
        });   
    }

  return (
    <div className="add lg:px-16 px-6  pt-6 pb-12">
      <div className="" style={{ marginBottom: "76px" }}>
        <button
          onClick={handleBackClick}
          className="w-[40px] h-[40px] rounded-full border border-1 border-black ">
          <GrFormPrevious className="mx-auto" />
        </button>
      </div>
      <div>
        <h1
          className="lg:text-6xl md:text-3xl font-semibold"
          style={{ marginBottom: "76px" }}>
          ADD NEW ITEM
        </h1>
        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader auth={false} />{" "}
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-8">
              <div className="flex flex-col lg:w-[41.3%] w-full ">
                <div className="flex flex-col mb-16 ">
                  <label
                    className="font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary"
                    style={{ marginBottom: "16px" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    style={{ color: "rgba(205, 205, 205, 1)" }}
                    className="py-3 px-4 text-xs font-normal rounded border border-1 border-editBorderColor"
                    placeholder="Enter the product name"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary"
                    style={{ marginBottom: "16px" }}>
                    Price
                  </label>
                  <input
                    type="number"
                    style={{ color: "rgba(205, 205, 205, 1)" }}
                    className="py-3 px-4 text-xs font-normal rounded border border-1 border-editBorderColor"
                    placeholder="Enter the product price"
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:w-[55.3%] w-full">
                <label
                  className="font-medium lg:mt-0 mt-5 lg:text-[32px] md:text-[25px] text-[18px] text-secondary"
                  style={{ marginBottom: "14px" }}>
                  Image
                </label>
                {
                  <button
                    type="button"
                    className="inline-flex h-[209px] bg-photoBackGround items-center justify-center  rounded-md "
                    style={{
                      border: "2px dashed rgba(56, 78, 183, 0.3)",
                    }}
                    onClick={handleButtonImage}>
                    {showImage ? (
                      <img
                        src={showImage}
                        alt="error"
                        width={"208px"}
                        className="mx-auto h-full object-cover"
                      />
                    ) : (
                      <img
                        src={"/assets/image/Upload icon1.png"}
                        alt="error"
                        width={"120px"}
                        className="mx-auto"
                      />
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="sr-only"
                      ref={file}
                    />
                  </button>
                }
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center" style={{ marginTop: "120px" }}>
          <button
            onClick={handleAddClick}
            className="rounded font-medium text-white bg-customyellow w-[199px] h-[61px] "
            style={{ fontSize: "32px" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct