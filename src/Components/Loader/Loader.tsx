
const Loader = ({auth}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-8 h-8  rounded-full animate-ping ${
          auth ? "bg-black" : "bg-customyellow"
        } `}></div>
    </div>
  );
}

export default Loader