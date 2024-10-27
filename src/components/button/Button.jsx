import styles from './Button.module.css';

const Button = ({
                  text,
                  type,
                  color = 'primary',
                  disabled,
                  handleClick,
                  style,
                }) => {

  // use style prop to overwrite default styling

  return (
    <button
      type={type}
      className={`${styles.buttonWrapper} ${styles[color]}`}
      style={style}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;