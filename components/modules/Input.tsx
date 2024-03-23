import React from 'react'

interface InputProps {
    label?: string;
    placeholder?: string;
    value?: any;
    onChange?: any;
    InputOff?: boolean; 
}

const Input: React.FC<InputProps> = ({ label, placeholder, value, onChange, InputOff = false }) => {
    return (
      <>
      <div>
        <label  className="text-base font-medium">{label}</label>
        <div className="mt-2.5">
            <input
                disabled={InputOff}
                type="text"
                placeholder={placeholder}
                className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:caret-blue-600 ${InputOff ? 'cursor-not-allowed text-gray-500 bg-gray-30 ' : ''}`}
                value={value}
                onChange={onChange}
                required
                />
        </div>
      </div>
      </>
    )
}

export default Input;
