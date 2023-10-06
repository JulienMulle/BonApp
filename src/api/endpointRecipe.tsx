import axios from 'axios';
import {Recipe} from '../interface/RecipeInterface';

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>('http://10.0.2.2:5000/recipes/');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRecipe = (newRecipe: FormData) => {
  fetch('http://10.0.2.2:5000/recipe/', {
    method: 'POST',
    headers: {
      'Content-Type': "multipart/form-data; ",
    },
    body: newRecipe,
  })
    .then(response =>response.json())
    .then(data =>console.log(data))
    .catch(error => console.error('erreur lors de la creation :', error));
    
}
