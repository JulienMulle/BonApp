import React, {FC, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text, FlatList, RefreshControl
} from "react-native";
// @ts-ignore
import Picture from '../assets/noImage.jpg';

import {Recipe} from '../interface/RecipeInterface';
import {getRecipes} from '../api/endpointRecipe';
import RecipeCard from '../components/recipe/RecipeCard';
const {width} = Dimensions.get('screen');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.8;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const RecipesScreen: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  const loadRecipes = async () => {
    const recipesList: Recipe[] = await getRecipes();
    console.log(recipesList);
    setRecipes(recipesList);
  };
  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({item})=> (<RecipeCard recipe={item}/>)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default RecipesScreen;
