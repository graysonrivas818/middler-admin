import { useEffect, useRef } from "react"
import SVG from "@/app/_libs/svg"

const InputFieldText = ({
  inputType,
  label,
  value,
  dispatch,
  changeValue,
  changeObjectValue,
  idx,
  index,
  items,
  type,
  labelShow,
  labelClassOne,
  inputClassOne,
  inputClassTwo,
  inputClassThree,
  labelClassTwo,
  id,
  dropdown,
  setDropdown,
  validation,
  validationMethod,
  required,
  readOnly,
  edit,
  changeEdit
}) => {  
  
  return (
    <div 
      className="relative"
    >
      {labelShow &&
        <label 
          htmlFor={id}
          className={`
            block 
            text-sm 
            font-medium 
            text-gray-700 
            py-1.5
            dark:text-gray-300
            ${labelClassOne} 
            ${labelClassTwo}
          `}
        >
          {label}
        </label>
      }
      <input 
        id={id}
        name={id}
        type={inputType}
        className={`
          appearance-none 
          block w-full 
          px-3 
          py-2 
          border 
          border-gray-300 
          dark:border-gray-600 
          rounded-md 
          shadow-sm 
          placeholder-gray-400 
          focus:outline-none 
          focus:ring-color-1 
          focus:border-color-1 
          sm:text-sm 
          dark:bg-gray-700 
          dark:text-gray-100
          ${inputClassOne}
          ${inputClassTwo}
          ${inputClassThree}
        `}
        placeholder=""
        value={value}
        onChange={(e) => 
          validation 
          ? 
          (   
            validationMethod(id),
            dispatch( 
              changeObjectValue 
              ? 
              changeObjectValue({ idx, value: e.target.value, index, items, type }) 
              : 
              changeValue({ value: e.target.value, type: type})),
            setDropdown(dropdown)
          )
          :
          (
            dispatch( 
              changeObjectValue 
              ? 
              changeObjectValue({ idx, value: e.target.value, index, items, type }) 
              : 
              changeValue({ value: e.target.value, type: type})),
            setDropdown(dropdown)
          )
        }
      />
    </div>
  )
}

export default InputFieldText
