import { useState } from "react";
import Header from "./components/Layout/Header";
import Meal from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CardProvider";
import Form from "./components/Form/Form";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);
  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);
  const showFormHandler = () => setFormIsShown(true);
  const hideFormHandler = () => setFormIsShown(false);

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} openForm={showFormHandler} />
      )}
      {formIsShown && (
        <Form onClose={hideFormHandler} closeCart={hideCartHandler} openCart={showCartHandler} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meal />
      </main>
    </CartProvider>
  );
}

export default App;
