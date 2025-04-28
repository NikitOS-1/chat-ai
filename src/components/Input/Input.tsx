import "./style.scss"
import React from "react";

interface InputProps {
    type?: string;
    placeholder: string;
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    disabled: boolean
    className?: string
}

export const Input = (
    {type = "text", placeholder, value, onChange, onKeyDown, className, disabled}: InputProps) => {
    return <input className={`${className} input`}
                  type={type} placeholder={placeholder} value={value}
                  onChange={onChange} onKeyDown={onKeyDown} disabled={disabled}/>
}