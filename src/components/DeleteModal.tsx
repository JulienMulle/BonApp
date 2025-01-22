import React, {FC} from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {
  clearEditedRecipe,
  closedDeleteModal,
  selectIsdeleteModal,
} from '../redux/selectors/RecipeSelector';
import {RootState} from '../redux/store';
import {deletedRecipe, fetchRecipes} from '../redux/actions/RecipesActions';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

const DeleteModal: FC = () => {
  const dispatch = useAppDispatch();
  const isDeleteModalVisible = useAppSelector((state: RootState) =>
    selectIsdeleteModal(state),
  );
  const recipeToDelete = useAppSelector(
    (state: RootState) => state.recipe.recipeDetails,
  );

  const removeRecipe = async (id: number) => {
    dispatch(deletedRecipe(id));
    dispatch(clearEditedRecipe());
    dispatch(fetchRecipes());
    dispatch(closedDeleteModal());
  };
  return (
    <Modal visible={isDeleteModalVisible} transparent animationType="slide">
      <View style={styles.modalView}>
        <Text>Confirmer la suppression de la recette </Text>
        <View style={styles.buttonContainer}>
          <Button title="oui" onPress={() => removeRecipe(recipeToDelete.id)} />
          <Button title="non" onPress={() => dispatch(closedDeleteModal())} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    marginTop: 600,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default DeleteModal;
