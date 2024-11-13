import React, { useRef, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/Slice";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import InputField from "../InputField"; // استيراد عنصر الإدخال القابل لإعادة الاستخدام

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement>(null); 
    const [image, setImage] = useState<File | null>(null); 
    const [name, setName] = useState<string>(""); 
    const [price, setPrice] = useState<string>(""); 
    const [previewImage, setPreviewImage] = useState<string>("");
    const { loading } = useSelector((state) => state.products);

    const handleBackClick = () : void => navigate("/dashboard");

    const handleButtonImage = () : void => fileRef.current?.click();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImage(selectedFile);
            setPreviewImage(URL.createObjectURL(selectedFile));
        }
    };

    const handleAddClick= () : void => {
        const data = new FormData();
        data.append('image', image!);
        data.append('name', name);
        data.append('price', price);

        dispatch(addProduct(data)).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("Product Added Successfully");
                navigate("/dashboard");
            }
        });   
    };

    return (
        <div className="add lg:px-16 px-6 pt-6 pb-12">
            <button
                onClick={handleBackClick}
                className="w-[40px] h-[40px] rounded-full border border-1 border-black">
                <GrFormPrevious className="mx-auto" />
            </button>
            <h1 className="lg:text-6xl md:text-3xl font-semibold my-12">
                ADD NEW ITEM
            </h1>
            {loading ? (
                <div className="flex justify-center items-center"><Loader auth={false} /></div>
            ) : (
                <div className="flex flex-wrap gap-x-8">
                    <div className="flex flex-col lg:w-[41.3%] w-full">
                        <InputField label="Name" value={name} setValue={setName} placeholder="Enter the product name" />
                        <InputField label="Price" value={price} setValue={setPrice} type="number" placeholder="Enter the product price" />
                    </div>
                    <div className="flex flex-col lg:w-[55.3%] w-full">
                        <label className="font-medium lg:text-[32px] md:text-[25px] text-[18px] text-secondary mb-4">Image</label>
                        <button
                            type="button"
                            className="h-[209px] bg-photoBackGround items-center justify-center rounded-md border-dashed border-2 border-editBorderColor"
                            onClick={handleButtonImage}>
                            {previewImage ? (
                                <img src={previewImage} alt="Product" className="mx-auto h-full object-cover" width="208px" />
                            ) : (
                                <img src="/assets/image/Upload icon1.png" alt="Upload" className="mx-auto" width="120px" />
                            )}
                            <input type="file" onChange={handleImageChange} className="sr-only" ref={fileRef} />
                        </button>
                    </div>
                </div>
            )}
            <div className="flex justify-center mt-20">
                <button
                    onClick={handleAddClick}
                    className="rounded font-medium text-white bg-customyellow w-[199px] h-[61px] text-2xl">
                    Save
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
