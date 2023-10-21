import React, {FC, useCallback, useEffect, useRef} from 'react';
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
import ItemTile from '../components/item/ItemTile';
import {useNavigation} from '@react-navigation/native';
import AssociationWithItem from '../components/recipe/AssociationWithItem';
// @ts-ignore
import noImage from '../assets/noImage.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RecipeForm from '../components/recipe/RecipeForm';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';
import {
  clearEditedRecipe,
  openAssociationModal,
  openedIsEdit,
  openFormModal,
  selectisAssociationModal,
  selectIsFormVisible,
  setRecipe,
} from '../redux/selectors/RecipeSelector';
import {
  fetchRecipe,
  removeAssociation,
} from '../redux/actions/RecipesActions';

const RecipeDetailsScreen: FC = () => {
  const dispatch = useDispatch();
  const recipeDetails = useSelector(
    (state: rootState) => state.recipe.recipeDetails,
  );
  const navigation = useNavigation();
  const isEdited = useSelector((state: rootState) =>
    selectIsFormVisible(state),
  );
  const isAssociate = useSelector((state: rootState) =>
    selectisAssociationModal(state),
  );
  const deleteAssociation = async (id: number) => {
    dispatch(removeAssociation({itemId: id, recipeId: recipeDetails.id}));
    dispatch(fetchRecipe(recipeDetails.id));
  };
  const returnToRecipeScreen = () => {
    navigation.navigate('RecipesScreen');
    setTimeout(() => {
      dispatch(clearEditedRecipe());
    }, 10);
  };
  const editedRecipe = () => {
    dispatch(openedIsEdit());
    dispatch(setRecipe(recipeDetails));
    dispatch(openFormModal());
  };

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
              <Image source={noImage} style={styles.recipeImage} />
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
export default RecipeDetailsScreen;
