import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    type = 'button',
    onClick,
    disabled = false,
    to = null,
    className = '',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = 'btn';

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        danger: 'btn-danger',
        text: 'bg-transparent hover:bg-gray-100 text-gray-700'
    };

    const sizes = {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-6 py-3',
        large: 'text-lg px-8 py-4'
    };

    const classes = `
    ${baseStyles} 
    ${variants[variant] || variants.primary} 
    ${sizes[size] || sizes.medium} 
    ${fullWidth ? 'w-full flex' : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
