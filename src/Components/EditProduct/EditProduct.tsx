import { GrFormPrevious } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../redux/Slice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import EditInputCom from "../ EditInputCom/ EditInputCom"; // Importing reusable Input Component

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null); // Improved typing for file input ref
  const { products, loading } = useSelector((state: any) => state.products); // Adjusted selector
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('/assets/image/image 2.png');
  const [image, setImage] = useState<File | string>('');
  const [loadingAfterSave, setLoadingAfterSave] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProduct(id));
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (products) {
      setName(products.name || '');
      setPrice(products.price || '');
      setPreviewImage(products.image_url || '/assets/image/image 2.png');
    }
  }, [products]);

  const handleBackClick = () => navigate("/dashboard");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImage(file);
    }
  };

  const handleEditClick = async () => {
    setLoadingAfterSave(true);
    const data = new FormData();
    data.append('name', name);
    data.append('price', price);
    data.append("_method", "PUT");
    if (image) {
      data.append("image", image);
    }

    const result = await dispatch(updateProduct({ data, id }));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product updated successfully");
      setLoadingAfterSave(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="show lg:px-16 px-6 pt-6 pb-12">
      <div style={{ marginBottom: "76px" }}>
        <button
          onClick={handleBackClick}
          className="w-[40px] h-[40px] rounded-full border border-1 border-black">
          <GrFormPrevious className="mx-auto" />
        </button>
      </div>
      <div>
        <h1 className="lg:text-6xl md:text-3xl font-semibold" style={{ marginBottom: "76px" }}>
          EDIT ITEM
        </h1>
        {loading || loadingAfterSave ? (
          <div className="flex justify-center items-center h-full">
            <Loader auth={false} />
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-x-8">
              <div className="flex flex-col lg:w-[41.3%] w-full">
                <InputCom
                  label="Name"
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  error=""
                  callBackFunction={(e) => setName(e.target.value)}
                />
                <InputCom
                  label="Price"
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  error=""
                  callBackFunction={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col lg:w-[55.3%] w-full">
                <label
                  className="font-medium lg:text-[32px] md:text-[25px] text-[18px] lg:mt-0 mt-5 text-secondary"
                  style={{ marginBottom: "14px" }}>
                  Image
                </label>
                <button
                  type="button"
                  className="inline-flex h-[209px] bg-photoBackGround items-center justify-center rounded-md"
                  style={{ border: "2px dashed rgba(56, 78, 183, 0.3)" }}
                  onClick={() => fileRef.current?.click()}>
                  <img
                    src={previewImage}
                    alt="Product Preview"
                    width="208px"
                    className="mx-auto h-full object-cover"
                  />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="sr-only"
                    ref={fileRef}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center" style={{ marginTop: "120px" }}>
          <button
            onClick={handleEditClick}
            className="rounded font-medium text-white w-[199px] h-[61px]"
            style={{ backgroundColor: "#FEAF00", fontSize: "32px" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
