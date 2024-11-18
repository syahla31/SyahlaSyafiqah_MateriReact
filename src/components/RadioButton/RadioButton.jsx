import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RadioButton({ 
  options, 
  defaultValue, 
  onChange,
  direction = 'horizontal',
  size = 'medium',
  variant = 'default'
}) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);
  const [hoveredValue, setHoveredValue] = useState(null);

  const handleSelectionChange = (value) => {
    setSelected(value);
    onChange(value);
  };

  const getVariantStyles = () => {
    const variants = {
      default: {
        active: 'bg-blue-400 border-blue-400',
        inactive: 'border-gray-300',
        text: {
          active: 'text-gray-900',
          inactive: 'text-gray-600'
        },
        hover: 'hover:border-blue-300'
      },
      pastel: {
        active: 'bg-gradient-to-r from-pink-300 to-blue-300 border-blue-300',
        inactive: 'border-gray-200',
        text: {
          active: 'text-gray-800',
          inactive: 'text-gray-500'
        },
        hover: 'hover:border-pink-200'
      },
      modern: {
        active: 'bg-indigo-500 border-indigo-500',
        inactive: 'border-gray-300',
        text: {
          active: 'text-gray-900',
          inactive: 'text-gray-600'
        },
        hover: 'hover:border-indigo-300'
      }
    };
    return variants[variant] || variants.default;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        outer: 'w-3 h-3',
        inner: 'w-1.5 h-1.5',
        text: 'text-sm',
        padding: 'p-1'
      },
      medium: {
        outer: 'w-4 h-4',
        inner: 'w-2 h-2',
        text: 'text-base',
        padding: 'p-1.5'
      },
      large: {
        outer: 'w-5 h-5',
        inner: 'w-2.5 h-2.5',
        text: 'text-lg',
        padding: 'p-2'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <div className={`flex gap-4 ${direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            group flex items-center cursor-pointer gap-2
            relative transition-all duration-200 ease-in-out
            ${sizeStyles.padding} rounded-lg
            hover:bg-gray-50
          `}
          onMouseEnter={() => setHoveredValue(option.value)}
          onMouseLeave={() => setHoveredValue(null)}
        >
          <input
            type="radio"
            name="customRadio"
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelectionChange(option.value)}
            className="hidden"
          />
          <div
            className={`
              relative ${sizeStyles.outer} rounded-full 
              flex items-center justify-center border-2
              transition-all duration-200 ease-in-out
              ${selected === option.value ? variantStyles.active : variantStyles.inactive}
              ${hoveredValue === option.value ? variantStyles.hover : ''}
            `}
          >
            {selected === option.value && (
              <span 
                className={`
                  ${sizeStyles.inner} rounded-full bg-white
                  transform scale-0 group-hover:scale-100
                  transition-transform duration-200 ease-in-out
                `}
              />
            )}
          </div>
          <span
            className={`
              ${sizeStyles.text}
              transition-colors duration-200 ease-in-out
              ${selected === option.value 
                ? variantStyles.text.active 
                : variantStyles.text.inactive}
              group-hover:text-gray-900
            `}
          >
            {option.label}
          </span>
          
          {/* Optional description */}
          {option.description && (
            <span className="text-sm text-gray-500 ml-2">
              {option.description}
            </span>
          )}
          
          {/* Ripple effect on click */}
          {selected === option.value && (
            <span 
              className="absolute inset-0 rounded-lg bg-current opacity-0 
                         animate-ripple pointer-events-none"
            />
          )}
        </label>
      ))}
    </div>
  );
}

RadioButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ).isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'pastel', 'modern'])
};

// Add this to your global CSS or Tailwind config
const styles = `
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0.2;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .animate-ripple {
    animation: ripple 0.6s linear;
  }
`;