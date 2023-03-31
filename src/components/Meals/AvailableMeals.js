import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { 
    fetchRequest : fetchMeals,
    isLoading : mealsLoading,
    error : mealsError
  } = useFetch();

  const processMeal = (json) => {
    let data = [];

    for (const i in json) {
      data.push({
        id: i,
        name: json[i].name,
        description: json[i].description,
        price: json[i].price
      });
    }
    setMeals(data);
  };

  useEffect(() => {
    fetchMeals(
      "https://react-http-722ec-default-rtdb.firebaseio.com/meals.json",
      processMeal
    );

    return () => {
      setMeals([]);
    };
  }, []);

  const mealsList = 
    meals?.length > 0 ?
    meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    )) : <p>There was an error</p>;

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsLoading ? <p>Loading...</p> : mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
