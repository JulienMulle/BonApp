import axios from 'axios';
import {Item} from '../interface/Interface';

export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>('http://10.0.2.2:5000/items/');
    return response.data;
  } catch (error) {
    console.log(error, 'erreur dans le chargement');
    throw error;
  }
};

export const createItem = async (name: string) => {
  try {
    const response = await fetch('http://10.0.2.2:5000/item/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name}),
    });
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    return response.json();
  } catch (error) {
    console.error('Erreur lors de la demande :', error);
    throw error;
  }
};

export const editItem = async (updatedItem: Item) => {
  try {
    const response = await fetch(
      `http://10.0.2.2:5000/item/${updatedItem.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: updatedItem.name}),
      },
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id: number): Promise<Item> => {
  try {
    const response = await axios.delete<Item>(
      `http://10.0.2.2:5000/item/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'élément:", error);
    throw error;
  }
};
