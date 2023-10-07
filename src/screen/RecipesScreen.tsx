import React, {FC, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Recipe} from '../interface/RecipeInterface';
import {getRecipes} from '../api/endpointRecipe';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeForm from '../components/recipe/RecipeForm';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RecipesScreen: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe>({
    category: [],
    description: '',
    id: 0,
    items: [],
    picture: undefined,
    title: '',
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isRecipeFormVisible, setIsRecipeFormVisible] =
    useState<boolean>(false);
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  const loadRecipes = async () => {
    const recipesList: Recipe[] = await getRecipes();
    console.log(recipesList);
    setRecipes(recipesList);
  };

  const openModal = (recipe: Recipe) => {
    setIsRecipeFormVisible(true);
    setRecipe(recipe);
  };
  const closeModal = () => {
    loadRecipes();
    setIsRecipeFormVisible(false);
  };
  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <RecipeCard
            recipe={item}
            openModal={() => openModal(recipe)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        onPress={() => setIsRecipeFormVisible(!isRecipeFormVisible)}
        style={styles.add}>
        <Icon name="plus-circle" size={30} />
      </TouchableOpacity>
      {isRecipeFormVisible && (
        <RecipeForm recipe={recipe} onClose={closeModal} isRecipeFormVisible />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '92%',
  },
  add: {
    alignItems: 'center',
  },
});

export default RecipesScreen;
