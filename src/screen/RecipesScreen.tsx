import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Recipe} from '../interface/RecipeInterface';
import {getRecipes} from '../api/endpointRecipe';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeForm from '../components/recipe/RecipeForm';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeleteModal from '../components/DeleteModal';

const RecipesScreen: FC = () => {
  const [searchRecipe, setSearchRecipe] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isRecipeFormVisible, setIsRecipeFormVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe>({
    category: [],
    description: '',
    id: 0,
    items: [],
    picture: undefined,
    title: '',
  });
  const onRefresh = () => {
    setRefreshing(true);
    loadRecipes();
    setRefreshing(false);
  };
  const searchFilter = (title: string): void => {
    if (title) {
      const newRecipeList: Recipe[] = searchRecipe.filter(recipe => {
        const recipeSearch: string = recipe.title ? recipe.title : '';
        return recipeSearch.indexOf(title) > -1;
      });
      setRecipes(newRecipeList);
      setSearch(title);
    } else {
      setRecipes(searchRecipe);
      searchFilter('');
    }
  };
  const loadRecipes = async () => {
    const recipesList: Recipe[] = await getRecipes();
    setRecipes(recipesList);
    setSearchRecipe(recipesList);
  };
  const openDeleteRecipeModal = (recipe: Recipe) => {
    setIsDeleteModalVisible(true);
    setRecipe(recipe);
  };
  const closeModal = () => {
    loadRecipes();
    setIsRecipeFormVisible(false);
    setIsDeleteModalVisible(false);
  };
  const updateScreen = async () => {
    loadRecipes();
    setIsRecipeFormVisible(false);
  };
  const alphaNumericSort = (a: Recipe, b: Recipe) => {
    return a.title?.toLowerCase() < b.title?.toLowerCase()
      ? -1
      : a.title?.toLowerCase() > b.title?.toLowerCase()
      ? 1
      : 0;
  };
  const sortedRecipes = [...recipes].sort(alphaNumericSort);
  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={search}
        placeholder={'Recherche'}
        onChangeText={title => searchFilter(title)}
      />
      <FlatList
        data={sortedRecipes}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <RecipeCard
            recipe={item}
            openDeleteModal={() => openDeleteRecipeModal(item)}
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
        <RecipeForm
          onClose={closeModal}
          isRecipeFormVisible
          onUpdateRecipes={updateScreen}
        />
      )}
      {isDeleteModalVisible && (
        <DeleteModal
          recipe={recipe}
          isDeleteModalVisible
          onClose={closeModal}
        />
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
