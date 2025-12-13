const Modal = ({ children, show, onClose, setUpdating }) => {
  if (!show) return null;
  return (
    <>
      <div className="inset-0 backdrop-blur-sm bg-black/50 fixed flex items-center justify-center">
        <div className="max-h-[90vh] bg-white w-full p-6 relative max-w-lg overflow-y-scroll rounded-lg">
          {/* Close button */}
          <button
            className="absolute right-4 top-4 text-2xl text-gray-500"
            onClick={() => {
              onClose();
              setUpdating(false);
            }}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
