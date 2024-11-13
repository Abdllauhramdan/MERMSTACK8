import React from "react";

interface InputFieldProps {
    label: string;
    value: string;
    setValue: (value: string) => void;
    type?: string;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, setValue, type = "text", placeholder }) => {
    return (
        <div className="flex flex-col mb-8">
            <label className="font-medium text-lg text-secondary mb-4">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="py-3 px-4 text-xs font-normal rounded border border-editBorderColor text-gray-700"
            />
        </div>
    );
};

export default InputField;
