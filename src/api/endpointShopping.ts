import axios from 'axios';
import {Shopping} from '../interface/Interface';

export const getAllShopping = async (): Promise<Shopping[]> => {
  try {
    const response = await axios.get<Shopping[]>(
      'http://10.0.2.2:5000/shopping/',
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShopping = async (id: number): Promise<Shopping> => {
  try {
    const response = await axios.get(`http://10.0.2.2:5000/shopping/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createdShopping = async (
  newShopping: Shopping,
): Promise<Shopping> => {
  try {
    const response = await fetch('http://10.0.2.2:5000/shopping/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newShopping.title,
        date: newShopping.date,
        isActive: newShopping.isActive,
      }),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la requête ${newShopping} :`, error);
    throw error;
  }
};

export const editedShopping = async (
  id: number,
  shopping: {title: string; date: Date; isActive: boolean},
): Promise<Shopping> => {
  try {
    const response = await fetch(`http://10.0.2.2:5000/shopping/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: shopping.title,
        date: shopping.date,
        isActive: shopping.isActive,
      }),
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

export const deleteShopping = async (id: number): Promise<Shopping> => {
  try {
    const response = await axios.delete(`http://10.0.2.2:5000/shopping/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const associateItem = async (
  shoppingId: number,
  itemId: number,
): Promise<Shopping> => {
  try {
    const response = await fetch(
      `http://10.0.2.2:5000/shopping/${shoppingId}/associateItem/${itemId}`,
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
    console.error(`Erreur lors de la requête ajout de ${itemId} :`, error);
    throw error;
  }
};

export const addedQuantity = async (
  shoppingId: number,
  itemId: number,
  quantity: number,
): Promise<Shopping> => {
  console.log('action', shoppingId, itemId, quantity);
  try {
    const response = await fetch(
      `http://10.0.2.2:5000/shopping/${shoppingId}/Item/${itemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: itemId,
          shoppingId: shoppingId,
          quantity: Number(quantity),
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Failed to add quantity to item.');
    }
    const updatedShopping: Shopping = await response.json();
    return updatedShopping;
  } catch (error) {
    console.error(
      'Error adding quantity to item:',
      shoppingId,
      itemId,
      quantity,
    );
    throw error;
  }
};

export const deleteAssociation = async (
  shoppingId: number,
  itemId: number,
): Promise<Shopping> => {
  try {
    const response = await fetch(
      `http://10.0.2.2:5000/shopping/${shoppingId}/associateItem/${itemId}`,
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
