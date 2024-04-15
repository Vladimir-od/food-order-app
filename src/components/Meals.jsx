import { getMeals } from '../api/meals-api';
import { MealItem } from './MealItem';
import { Error } from './UI/Error';

export const Meals = () => {
  const { data, error, isPending, isError } = getMeals();

  if (isPending) {
    return <p className='center'>Loading...</p>;
  }
  if (isError) {
    return <Error title='Failed to fetch meals' message={error.message} />;
  }

  return (
    <ul id='meals'>
      {data?.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};
