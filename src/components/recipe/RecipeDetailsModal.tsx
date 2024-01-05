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
  Modal,
} from 'react-native';
import ItemTile from '../item/ItemTile';
import AssociationWithItem from './AssociationWithItem';
// @ts-ignore
import noImage from '../../assets/noImage.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RecipeForm from './RecipeForm';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import {
  closeModalDetails,
  openAssociationModal,
  openedIsEdit,
  openFormModal,
  selectIsAssociationModal,
  selectIsFormVisible,
  selectViewDetails,
  setRecipe
} from "../../redux/selectors/RecipeSelector";
import {
  fetchRecipe, fetchRecipes,
  removeAssociation
} from "../../redux/actions/RecipesActions";

const RecipeDetailsModal: FC = () => {
  const dispatch = useDispatch();
  const recipeDetails = useSelector(
    (state: rootState) => state.recipe.recipeDetails,
  );
  const isEdited = useSelector((state: rootState) =>
    selectIsFormVisible(state),
  );
  const isAssociate = useSelector((state: rootState) =>
    selectIsAssociationModal(state),
  );
  const viewDetails = useSelector((state: rootState) =>
    selectViewDetails(state),
  );
  const deleteAssociation = async (id: number) => {
    dispatch(removeAssociation({itemId: id, recipeId: recipeDetails.id}));
    dispatch(fetchRecipe(recipeDetails.id));
  };
  const editedRecipe = () => {
    dispatch(openedIsEdit());
    dispatch(setRecipe(recipeDetails));
    dispatch(openFormModal());
  };

  const closeDetails = ()=>{
    dispatch(closeModalDetails());
    dispatch(fetchRecipes())
  }
  useEffect(() => {

    recipeDetails
  }, );


  return (
    <SafeAreaView>
      {!isEdited && (
        <Modal visible={viewDetails}>
          <ScrollView>
            <View style={styles.modalView}>
              <View style={styles.containerButton}>
                <TouchableOpacity onPress={closeDetails}>
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
        </Modal>
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
