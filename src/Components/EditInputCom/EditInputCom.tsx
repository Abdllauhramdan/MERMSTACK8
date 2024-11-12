import React from "react";

interface EditInputComProps {
  label: string;
  type: string;
  placeholder: string;
  callBackFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string;
  width?: string; 
}

const EditInputCom: React.FC<EditInputComProps> = ({ label, type, placeholder, callBackFunction, value, error, width = "100%" }) => {
  return (
    <div className={`flex flex-col mb-6 ${width ? `w-[${width}]` : ''}`}>
      {label && (
        <label htmlFor={label} className="text-secondary text-sm mb-2.5 font-medium">
          {label}
        </label>
      )}
      <input
        className={`py-3 px-4 font-medium rounded-md border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? "border-red-500" : "border-customGray"
        }`}
        value={value}
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        onChange={callBackFunction}
      />
      {error && <span className="text-red-500 text-xs mt-2">{error}</span>}
    </div>
  );
};

export default EditInputCom;
