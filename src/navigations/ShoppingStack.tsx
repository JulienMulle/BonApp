import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingListScreen from '../screen/ShoppingListScreen';
import ShoppingDetailsScreen from '../screen/ShoppingDetailsScreen';

export default function ShoppingStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ShoppingDetailsScreen"
        component={ShoppingDetailsScreen}
      />
      <Stack.Screen name="ShoppingListScreen" component={ShoppingListScreen} />
    </Stack.Navigator>
  );
}
