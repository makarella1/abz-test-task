import './Button.scss';

const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={className ? `${className} btn` : 'btn'}
    >
      {children}
    </button>
  );
};

export default Button;
