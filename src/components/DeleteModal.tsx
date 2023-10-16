import React, {FC} from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {deleteRecipe} from '../api/endpointRecipe';
import {DeleteModalProps} from '../interface/RecipeInterface';

const DeleteModal: FC<DeleteModalProps> = ({
  recipe,
  isDeleteModalVisible,
  onClose,
}) => {
  const removeRecipe = async (id: number) => {
    deleteRecipe(id);
  };
  return (
    <Modal visible={isDeleteModalVisible} transparent animationType="slide">
      <View style={styles.modalView}>
        <Text>Confirmer la suppression de la recette </Text>
        <View style={styles.buttonContainer}>
          <Button title="oui" onPress={() => removeRecipe(recipe.id)} />
          <Button title="non" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
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
