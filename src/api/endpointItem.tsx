import axios from 'axios';
import {Item} from '../interface/ItemInterfaces';

export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get<Item[]>('http://10.0.2.2:5000/items/');
    return response.data;
  } catch (error) {
    console.log(error, 'erreur dans le chargement');
    throw error;
  }
};

export const createItem = (name: string) => {
  fetch('http://10.0.2.2:5000/item/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: name}),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erreur lors de la demande :', error));
};

export const editItem = (id: number | undefined, editedItem: string) => {
  fetch(`http://10.0.2.2:5000/item/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: editedItem}),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('ici la promesse', data))
    .catch(error => console.error('Erreur :', error));
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
