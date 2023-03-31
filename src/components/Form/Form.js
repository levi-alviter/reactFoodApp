import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { useContext, useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import Button from "../UI/Button";
import CartContext from "../../store/cart-context";
import useFetch from "../../hooks/useFetch";
import classes from "./Form.module.css";
const noEmptyString = (value) => value.trim() !== "";

const Form = (props) => {
  const cartCtx = useContext(CartContext);
  useEffect(() => {
    props.closeCart();
  }, []);

  const { 
    fetchRequest : uploadOrder,
    isLoading : orderLoading,
    error: orderError
   } = useFetch();

  const {
    value: nameValue,
    isValid: nameIsValid,
    isInvalid: nameIsInvalid,
    insertValue: nameInsert,
    touched: nameTouched,
    reset: nameReset
  } = useValidation(noEmptyString);

  const {
    value: adrsValue,
    isValid: adrsIsValid,
    isInvalid: adrsIsInvalid,
    insertValue: adrsInsert,
    touched: adrsTouched,
    reset: adrsReset
  } = useValidation(noEmptyString);

  const nameClass = nameIsInvalid
    ? `${classes["form-input"]} ${classes["is-invalid"]}`
    : `${classes["form-input"]}`;
  const adrsClass = adrsIsInvalid
    ? `${classes["form-input"]} ${classes["is-invalid"]}`
    : `${classes["form-input"]}`;

  const resetForm = () => {
    nameReset();
    adrsReset();
  };
  
  const closeModals = () => {
    props.onClose();
    props.closeCart();
  };
  const closeOrderFormHandler = event => {
    props.openCart();
    props.onClose();
  };

  let formIsValid = false;

  if (nameIsValid && adrsIsValid) {
    formIsValid = true;
  }

  const printOrder = (json) => {
    for (const i in json) {
      console.log(json[i]);
    }
  };
  
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    };

    uploadOrder('https://react-http-722ec-default-rtdb.firebaseio.com/orders.json', printOrder, "POST", {
      name: nameValue,
      adrs: adrsValue,
      order: cartCtx.items
    });
    if (orderError) {
      const closeDelay = setTimeout(() => {
        closeModals();
        clearTimeout(closeDelay);
      }, 1000);
      return;
    }
    resetForm();
    closeModals();
    cartCtx.resetItems();
  };

  return (
    <>
        <Modal>
          { 
            orderLoading ? <p>Order is uploading!</p> :
            !orderError ?
              <form onSubmit={formSubmitHandler} className={classes["form"]}>
              <Input
                label="Enter your name"
                className={classes["input-box"]}
                input={{
                  id: "name",
                  value: nameValue,
                  onChange: nameInsert,
                  onBlur: nameTouched,
                  className: nameClass
                }}
              />
              <Input
                id="adrs"
                label="Enter your address"
                input={{
                  id: "adrs",
                  value: adrsValue,
                  onChange: adrsInsert,
                  onBlur: adrsTouched,
                  className: adrsClass
                }}
              />
              <div className={classes["button-box"]}>
                <Button
                  onClick={closeModals}
                >Cancel</Button>
                <Button
                  onClick={closeOrderFormHandler}
                >Close</Button>
                <Button
                  disabled={!formIsValid}
                  type="submit"
                  className={classes["center"]}
                >
                  Submit
                </Button>
              </div>
            </form> :
            <p>There was an error!</p>
          } 
      </Modal>
    </>
  );
};

export default Form;
