import React, {FC, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeForm from '../components/recipe/RecipeForm';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeleteModal from '../components/DeleteModal';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';
import {fetchRecipes} from '../redux/actions/RecipesActions';
import {
  openFormModal,
  selectRefreshing, selectViewDetails,
  setSearch
} from "../redux/selectors/RecipeSelector";
import {
  filteredRecipesByTitle,
  selectIsdeleteModal,
  selectIsFormVisible,
  selectSortedRecipes,
} from '../redux/selectors/RecipeSelector';
import RecipeDetailsModal from "../components/recipe/RecipeDetailsModal";

const RecipesScreen: FC = () => {
  const dispatch = useDispatch();
  const refreshing = useSelector((state: rootState) => selectRefreshing(state));
  const isFormVisible = useSelector((state: rootState) =>
    selectIsFormVisible(state),
  );
  const isDeleteModalVisible = useSelector((state: rootState) =>
    selectIsdeleteModal(state),
  );
  const viewDetails = useSelector((state:rootState)=> selectViewDetails(state)
  );
  const filteredRecipe = useSelector((state: rootState) => state.recipe.search);
  const sortedRecipes = useSelector(selectSortedRecipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchRecipes());
    }, [dispatch]),
  );
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
      {isDeleteModalVisible && <DeleteModal />}
      {viewDetails && <RecipeDetailsModal />}
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
