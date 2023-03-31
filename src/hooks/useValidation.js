import { useReducer } from "react";

const initialState = {
  value: "",
  isValid: false,
  isTouched: false,
  isInvalid: false,
};

const valueReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      const valid = state.validator(action.value);
      return {
        value: action.value,
        isValid: valid,
        isTouched: state.isTouched,
        isInvalid: !valid && state.isTouched,
        validator: state.validator,
      };
    break;
    case "IS_TOUCHED":
      return {
        ...state,
        isTouched: true,
        isInvalid: !state.isValid && true,
      };
    break;
    case "RESET":
      return {
        ...initialState,
        validator: state.validator,
      };
    break;
  }
};

const useValidation = (validator) => {
  const [value, valueDispatch] = useReducer(valueReducer, {
    ...initialState,
    validator,
  });

  const insertValue = (event) => {
    valueDispatch({
      type: 'INPUT',
      value: event.target.value
    });
  };

  const touched = () => valueDispatch({type: 'IS_TOUCHED'});

  const reset = () => valueDispatch({type: 'RESET'});

  return {
    value: value.value,
    isValid: value.isValid,
    isInvalid: value.isInvalid,
    insertValue,
    touched,
    reset, 
  };

};

export default useValidation;
