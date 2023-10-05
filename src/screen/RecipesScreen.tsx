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

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: item.picture }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderRecipe}
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
  },
  recipeCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 15,
  },
});

export default RecipesScreen;
