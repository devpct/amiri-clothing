import React from 'react'

interface InputProps {
    label: string;
    placeholder: string;
    value: any;
    onChange: any;
}

const InputProps: React.FC<InputProps> = ({ label, placeholder, value, onChange }) => {
    return (
      <>
      <div>
        <label  className="text-base font-medium text-gray-900">{label}</label>
        <div className="mt-2.5">
            <input
                type="text"
                placeholder={placeholder}
                className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                value={value}
                onChange={onChange}
                required
                />
        </div>
      </div>
      </>
    )
}

export default InputProps
