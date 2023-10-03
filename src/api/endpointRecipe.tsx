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
