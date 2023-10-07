import axios from 'axios';
import {Recipe} from '../interface/RecipeInterface';

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>('http://10.0.2.2:5000/recipes/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecipe = async (id: number): Promise<Recipe> => {
  try {
    const response = await axios.get<Recipe>(
      `http://10.0.2.2:5000/recipe/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createRecipe = (newRecipe: FormData) => {
  fetch('http://10.0.2.2:5000/recipe/', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: newRecipe,
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  });
};

export const deleteRecipe = (id: number) => {
  console.log(id);
  fetch(`http://10.0.2.2:5000/recipe/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  });
};

export const associateItemWithRecipe = (itemId: number, recipeId: number) => {
  fetch(`http://10.0.2.2:5000/item/${itemId}/associateRecipe/${recipeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  });
};

export const deleteItemAssociationWithRecipe = (
  itemId: number,
  recipeId: number,
) => {
  fetch(
    `http://10.0.2.2:5000/item/${itemId}/deleteAssociationRecipe/${recipeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  });
};
