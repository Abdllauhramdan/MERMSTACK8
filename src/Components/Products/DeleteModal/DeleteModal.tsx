interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 px-6 z-50 flex justify-center items-center deleteModale bg-black bg-opacity-50 backdrop-blur-[10px]">
      <div
        className="bg-white lg:w-[948px] md:w-[80%] max-w-[100%] h-[321px] px-3 flex justify-center items-center flex-col"
        style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: "20px",
          boxShadow: "2px 5px 10px 0px rgba(0, 0, 0, 0.1)",
        }}>
        <h1 className="font-semibold mb-20" style={{ fontSize: "22px" }}>
          Are you sure you want to delete the product?
        </h1>
        <div className="flex gap-10">
          <button
            onClick={onConfirm}
            className="md:w-[199px] md:h-[61px] w-[90px] h-[60px] bg-customyellow text-white font-medium text-center rounded"
            style={{ fontSize: "32px" }}>
            YES
          </button>
          <button
            onClick={onClose}
            className="md:w-[199px] md:h-[61px] w-[90px] h-[60px] bg-customyellow text-white font-medium text-center rounded"
            style={{ fontSize: "32px" }}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
