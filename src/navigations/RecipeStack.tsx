import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipeDetailsScreen from '../screen/RecipeDetailsScreen';
import RecipesScreen from '../screen/RecipesScreen';

export default function RecipesStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RecipesScreen" component={RecipesScreen} />
      <Stack.Screen
        name="RecipeDetailsScreen"
        component={RecipeDetailsScreen}
      />
    </Stack.Navigator>
  );
}
