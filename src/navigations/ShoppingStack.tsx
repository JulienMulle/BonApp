import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingListScreen from '../screen/ShoppingListScreen';
import ShoppingDetailsScreen from '../screen/ShoppingDetailsScreen';

export default function ShoppingStack() {
  const StackShopping = createStackNavigator();
  return (
    <StackShopping.Navigator screenOptions={{headerShown: false}}>
      <StackShopping.Screen
        name="ShoppingDetailsScreen"
        component={ShoppingDetailsScreen}
      />
      <StackShopping.Screen
        name="ShoppingListScreen"
        component={ShoppingListScreen}
      />
    </StackShopping.Navigator>
  );
}
