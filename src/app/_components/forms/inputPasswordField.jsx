import SVG from '@/app/_libs/svg'

const InputFieldPassword = ({
  inputType,
  label,
  value,
  dispatch,
  changeValue,
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
  showPassword,
  setShowPassword,
  SVGColor
}) => {
  
  return (
    <div className="relative">
      {labelShow &&
        <label 
          htmlFor="hs-floating-input-email" 
          className={`
            block 
            text-sm 
            font-medium 
            text-gray-700 
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
        type={type}
        className={`
          appearance-none 
          block
          w-full 
          px-3 
          py-2 
          border 
          border-gray-300 
          dark:border-gray-600 
          rounded-md 
          shadow-sm 
          placeholder-gray-400 
          focus:outline-none 
          focus:ring-indigo-500 
          focus:border-indigo-500 
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
            dispatch(changeValue({ value: e.target.value, type: inputType})),
            setDropdown(dropdown)
          )
          :
          (
            dispatch(changeValue({ value: e.target.value, type: inputType})),
            setDropdown(dropdown)
          )
        }
      />
      <div 
        className="absolute top-[50%] right-3 hover:cursor-pointer"
        onClick={() => (showPassword == id ? setShowPassword('') : setShowPassword(id))}
      >
        { showPassword == id 
          &&
          <SVG
            svg={'eyeClosed'}
            alt="Eye Closed"
            width={20}
            height={20}
            schemeOne={SVGColor}
          />
        }
        { showPassword !== id &&
          <SVG
            svg={'eye'}
            alt="Eye"
            width={20}
            height={20}
            schemeOne={SVGColor}
          />
        }
      </div>
    </div>
  )
}

export default InputFieldPassword
