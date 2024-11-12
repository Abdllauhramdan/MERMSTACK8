import React from "react"

interface ButtonProps {
    text: string;
    type: string;
}

const Button : React.FC<ButtonProps> = ({text,type}) => {
  return <button type={type} className="buttonColor">{text}</button>;
}

export default Button