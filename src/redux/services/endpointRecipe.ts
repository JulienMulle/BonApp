import axios from 'axios';
import {Recipe} from '../../interface/Interface';

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
export const createRecipe = async (newRecipe: FormData) => {
  try {
    const response = await fetch('http://10.0.2.2:5000/recipe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: newRecipe,
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    throw error;
  }
};

export const editeRecipe = async (id: number, editedRecipe: FormData) => {
  try {
    const response = await fetch(`http://10.0.2.2:5000/recipe/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: editedRecipe,
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    throw error;
  }
};
export const deleteRecipe = async (id: number) => {
  try {
    const response = await axios.delete(`http://10.0.2.2:5000/recipe/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'élément:", error);
    throw error;
  }
};

export const associateItemWithRecipe = async (
  itemId: number,
  recipeId: number,
) => {
  try {
    const response = await fetch(
      `http://10.0.2.2:5000/item/${itemId}/associateRecipe/${recipeId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    throw error;
  }
};

export const deleteItemAssociationWithRecipe = async (
  itemId: number,
  recipeId: number,
) => {
  try {
    const response = await fetch(
      `http://10.0.2.2:5000/item/${itemId}/deleteAssociationRecipe/${recipeId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    throw error;
  }
};
