import React, { useRef } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {

  return <div className={`${classes.input} ${props.className}`}>
    <label htmlFor={props.input.id}>{props.label}</label>
    {/* ...props.input para pasar todas las props que recibimos
    de un elemento padre a otro elemento hijo*/}
    <input ref={ref} {...props.input}/>
  </div>;
});

export default Input;
