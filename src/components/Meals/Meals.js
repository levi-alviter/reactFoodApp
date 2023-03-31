import MealSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meal = props => {
  return <>
    <MealSummary />
    <AvailableMeals />
  </>;
}

export default Meal;