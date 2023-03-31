import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import foodImage from "../../assets/images/meals.jpg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={foodImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
