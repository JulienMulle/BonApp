import React, {FC, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {
  openAssociationModal,
  openedIsEdit,
  openFormModal,
  selectIsAssociationModal,
  selectIsFormVisible,
  setRecipe,
} from '../redux/selectors/RecipeSelector';
import {
  fetchRecipe,
  fetchRecipes,
  removeAssociation,
} from '../redux/actions/RecipesActions';
import {useNavigation} from '@react-navigation/native';
import {clearEditedRecipe} from '../redux/selectors/RecipeSelector';
import {rootState} from '../redux/store';
import ItemTile from '../components/item/ItemTile';
import AssociationWithItem from '../components/recipe/AssociationWithItem';
import RecipeForm from '../components/recipe/RecipeForm';

const RecipeDetailsModal: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const recipeDetails = useSelector(
    (state: rootState) => state.recipe.recipeDetails,
  );
  const isEdited = useSelector((state: rootState) =>
    selectIsFormVisible(state),
  );
  const isAssociate = useSelector((state: rootState) =>
    selectIsAssociationModal(state),
  );
  const returnToRecipeScreen = () => {
    navigation.goBack();
    dispatch(fetchRecipes());
    dispatch(clearEditedRecipe());
  };
  const deleteAssociation = async (id: number) => {
    dispatch(removeAssociation({itemId: id, recipeId: recipeDetails.id}));
    dispatch(fetchRecipe(recipeDetails.id));
  };
  const editedRecipe = () => {
    dispatch(openedIsEdit());
    dispatch(setRecipe(recipeDetails));
    dispatch(openFormModal());
  };

  useEffect(() => {
    recipeDetails;
  });

  return (
    <SafeAreaView>
      {!isEdited && (
        <ScrollView>
          <View style={styles.modalView}>
            <View style={styles.containerButton}>
              <TouchableOpacity onPress={() => returnToRecipeScreen()}>
                <Icon size={20} name="times-circle" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editedRecipe()}>
                <Icon size={20} name="edit" />
              </TouchableOpacity>
            </View>
            {recipeDetails.picture ? (
              <Image
                source={{uri: recipeDetails.picture}}
                style={styles.recipeImage}
              />
            ) : (
              <Image
                source={require('../assets/noImage.jpg')}
                style={styles.recipeImage}
              />
            )}
            <Text>{recipeDetails.title}</Text>
            <Text>{recipeDetails.description}</Text>
            <Button
              title="ajouter ingredient"
              onPress={() => dispatch(openAssociationModal())}
            />
            {recipeDetails.items?.map(item => (
              <ItemTile
                key={item.id}
                item={item}
                removeItem={() => deleteAssociation(item.id)}
              />
            ))}
            {isAssociate && <AssociationWithItem />}
          </View>
        </ScrollView>
      )}
      {isEdited && <RecipeForm />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  recipeImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
export default RecipeDetailsModal;
