import React, {FC, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeForm from '../components/recipe/RecipeForm';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeleteModal from '../components/DeleteModal';
import {rootState} from '../redux/store';
import {fetchRecipes} from '../redux/actions/RecipesActions';
import {
  openFormModal,
  selectRefreshing,
  setSearch
} from "../redux/selectors/RecipeSelector";
import {
  filteredRecipesByTitle,
  selectIsdeleteModal,
  selectIsFormVisible,
  selectSortedRecipes,
} from '../redux/selectors/RecipeSelector';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const RecipesScreen: FC = () => {
  const dispatch = useAppDispatch();
  const refreshing = useAppSelector((state: rootState) => selectRefreshing(state));
  const isFormVisible = useAppSelector((state: rootState) =>
    selectIsFormVisible(state),
  );
  const isDeleteModalVisible = useAppSelector((state: rootState) =>
    selectIsdeleteModal(state),
  );
  const filteredRecipe = useAppSelector((state: rootState) => state.recipe.search);
  const sortedRecipes = useAppSelector(selectSortedRecipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={filteredRecipe}
        placeholder={'Recherche'}
        onChangeText={title => dispatch(setSearch(title))}
      />
      <FlatList
        data={filteredRecipesByTitle(sortedRecipes, filteredRecipe)}
        keyExtractor={item => (item ? item.id.toString() : 'undefined')}
        numColumns={2}
        renderItem={({item}) => (item ? <RecipeCard recipe={item} /> : null)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => dispatch(fetchRecipes())}
          />
        }
      />
      <TouchableOpacity
        onPress={() => dispatch(openFormModal())}
        style={styles.add}>
        <Icon name="plus-circle" size={30} />
      </TouchableOpacity>
      {isFormVisible && <RecipeForm />}
      {isDeleteModalVisible && <DeleteModal recipe={sortedRecipes.id} />}
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
