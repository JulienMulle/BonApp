import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipeDetailsScreen from '../screen/RecipeDetailsScreen';
import RecipesScreen from '../screen/RecipesScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function RecipesStack() {
  const StackRecipe = createNativeStackNavigator();
  return (
    <StackRecipe.Navigator screenOptions={{headerShown: false}}>
      <StackRecipe.Screen name="Recette" component={RecipesScreen} />
      <StackRecipe.Screen
        name="RecipeDetailsScreen"
        component={RecipeDetailsScreen}
      />
    </StackRecipe.Navigator>
  );
}
