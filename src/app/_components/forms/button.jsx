import SVG from '@/app/_libs/svg';
import { useRouter } from 'next/navigation';

const Button = ({
  label,
  backgroundColor,
  textColor,
  borderColor,
  width,
  height,
  font,
  fullWidth,
  svgColor,
  svg,
  href,
  disabled,
  borderRadius,
  loading,
  loadingType,
  loadingColor,
  inputClassOne,
  backgroundColorSVG
}) => {
  
  const router = useRouter();

  const buttonClasses = `
    relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-full font-semibold text-lg leading-none shadow-md hover:shadow-xl focus:outline-none transition-all duration-300 
    ${fullWidth ? 'w-full' : `w-${width}px`}
    ${font ? `font-${font}` : 'font-semibold'}
    ${inputClassOne}
    ${backgroundColor ? backgroundColor : ' bg-gradient-to-r from-blue-500 to-blue-700 '}
  `;

  const buttonStyles = {
    backgroundColor: backgroundColor || 'bg-blue-500',
    color: textColor || 'text-white',
    borderColor: borderColor || 'border-blue-500',
    opacity: disabled ? '0.5' : '1',
    pointerEvents: disabled ? 'none' : 'auto',
    borderRadius: borderRadius || 'rounded-full',
  };

  return (
    <button
      className={`${buttonClasses} `}
      style={buttonStyles}
      onClick={() => (href ? router.push(href) : null)}
      disabled={disabled}
    >
      <span className="relative flex items-center gap-x-3 ">
        {loading === loadingType ? (
          <div className={`mr-3 ` + (loadingColor && loadingColor == 'black' ? ' loadingBlack ' : ' loading ')}></div>
        ) : (
          <>
            {label}
            {svg && (
              <SVG
                svg={svg}
                width={24}
                height={24}
                schemeOne={svgColor}
                backgroundColor={backgroundColorSVG}
                className="ml-2 w-6 h-6"
              />
            )}
          </>
        )}
      </span>
    </button>
  )
}

export default Button