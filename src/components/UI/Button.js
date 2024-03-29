import classes from "./Button.module.css";

const Button = props => {
  return (
    <button
      disabled={props.disabled}
      className={`${classes["button"]} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
