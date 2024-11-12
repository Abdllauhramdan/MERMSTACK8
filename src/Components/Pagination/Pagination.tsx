import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, setPage } from "../../redux/Slice";

const PaginationCom = () => {
  const { totalPages , currentPage } = useSelector((state) => state.products);
  const dispatch = useDispatch();


  const handlePageChange = (number) : void => {
    dispatch(setPage(number));
  };
  const handlePrevClick = () : void =>{
    dispatch(prevPage())
  };

  const handleNextClick = () : void =>{
    dispatch(nextPage());
    };

     const renderPages = () : number[]=> {
       const pages = [];

       if(totalPages === 0){
        pages.push(1);
        return pages;
       }

       if(totalPages === 1 || totalPages === 2 || totalPages === 3){
        for (let index = 1; index <= totalPages; index++) {
          pages.push(index);
        }
        return pages;
       }
       if(currentPage <= totalPages - 3){
        for (let index = currentPage; index < currentPage + 3; index++) {
        pages.push(index);
       }
       pages.push("...");
       pages.push(totalPages);
       }else{
          pages[0] = 1;
          pages[1] = "...";
          for (let index = totalPages - 2; index <= totalPages; index++) {
            pages.push(index);
          }
       }

       return pages;
     };

  return (
    <div
      className="pagination flex items-center mt-20 mb-6"
      style={{ gap: "5px", marginBottom: "116px" }}>
      <button
        onClick={handlePrevClick}
        className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] bg-white rounded-full"
        style={{
          border: "1px solid rgba(241, 241, 241, 1)",
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}>
        <GrFormPrevious className="mx-auto" />
      </button>
      {renderPages().map((page, index) => (
        <button
          key={index}
          className={`w-[40px] h-[40px] md:w-[60px] md:h-[60px] font-semibold ${
            page === "..." ? "rounded-lg" : "rounded-full"
          } ${
            page === currentPage ? "text-white bg-customyellow" : "bg-white"
          }`}
          style={{
            fontSize: "13px",
            border:
              page === "..."
                ? ""
                : page === currentPage
                ? ""
                : "1px solid rgba(241, 241, 241, 1)",
            cursor: page === "..." ? "default" : "pointer",
          }}
          onClick={() => typeof page === "number" && handlePageChange(page)}>
          {page}
        </button>
      ))}
      <button
        onClick={handleNextClick}
        className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] bg-white rounded-full"
        style={{
          border: "1px solid rgba(241, 241, 241, 1)",
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}>
        <GrFormNext className="mx-auto" />
      </button>
    </div>
  );
};

export default PaginationCom;
