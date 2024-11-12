import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { getProduct } from "../../redux/Slice";
import { GrFormPrevious } from "react-icons/gr";
import Loader from "../Loader/Loader";

const ShowProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products , error , loading } = useSelector(state => state.products);
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getProduct(id))
    },[id]);
    const handleBackClick = () : void => {
      navigate("/dashboard");
    }
  return (
    <div className="show lg:px-16 px-6 pt-6 pb-12">
      <div className="" style={{ marginBottom: "76px" }}>
        <button
          onClick={handleBackClick}
          className="w-[40px] h-[40px] rounded-full border border-1 border-black ">
          <GrFormPrevious className="mx-auto" />
        </button>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : error ? (
          <h1 className="w-full h-full flex justify-center items-center text-3xl font-semibold">
            {error}
          </h1>
        ) : (
          <div>
            <h1 className="lg:text-6xl md:text-3xl font-semibold mb-10">
              {products.name}
            </h1>
            {products.image_url ? (
              <img
                src={products.image_url}
                alt="error"
                width={"373px"}
                className="mx-auto max-h-[373px] rounded-2xl mb-10"
              />
            ) : (
              <img
                src="/assets/image/image 2.png"
                alt="error"
                width={"373px"}
                className="mx-auto rounded-2xl mb-10"
              />
            )}
            <div className="flex justify-between flex-wrap">
              <h1 className="lg:text-6xl md:text-3xl mb-[45px] font-semibold flex items-center gap-6">
                price :
                <span className="font-medium text-productSpanColor lg:text-[40px] md:text-[25px] self-end">
                  {products.price}$
                </span>
              </h1>
              <h1 className="lg:text-6xl md:text-3xl mb-[45px] font-semibold flex items-center gap-6">
                Added At:
                <span className="font-medium text-productSpanColor lg:text-[40px] md:text-[25px] self-end">
                  {new Date(products.created_at).toLocaleDateString()}
                </span>
              </h1>
            </div>
            <h1 className="lg:text-6xl md:text-3xl font-semibold mb-10 flex items-center gap-6 justify-center">
              updated at :
              <span className="font-medium text-productSpanColor lg:text-[40px] md:text-[25px] self-end">
                {new Date(products.updated_at).toLocaleDateString()}{" "}
              </span>{" "}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowProduct