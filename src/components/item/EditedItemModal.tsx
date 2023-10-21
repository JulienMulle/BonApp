import React, {FC} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import {
  closeEditionItem,
  closeEditItemModal,
  editionItem,
  openedEdtionItem,
  selectIsEditItemVisible,
  setEdition,
} from '../../redux/selectors/ItemSelector';
import {fetchItems, updatedItem} from '../../redux/actions/ItemsActions';
import {clearEditedRecipe} from '../../redux/selectors/RecipeSelector';

const EditedItemModal: FC = () => {
  const dispatch = useDispatch();
  const isEdited = useSelector((state: rootState) => editionItem(state));
  const isEditItemVisible = useSelector((state: rootState) =>
    selectIsEditItemVisible(state),
  );
  const editedItem = useSelector((state: rootState) => state.items.editedItem);
  const editionItems = async (id: number, newName: string) => {
    dispatch(updatedItem({id, newName}));
    dispatch(closeEditItemModal());
    setTimeout(() => {
      dispatch(fetchItems());
    }, 5);
  };
  const closeView = () => {
    dispatch(closeEditItemModal());
    dispatch(clearEditedRecipe());
  };
  return (
    <Modal visible={isEditItemVisible} transparent animationType="slide">
      {!isEdited && (
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => dispatch(openedEdtionItem())}>
            <Text>{editedItem.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => closeView()}>
            <Icon name="times-circle" size={20} />
          </TouchableOpacity>
        </View>
      )}
      {isEdited && (
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => dispatch(closeEditionItem())}>
            <Icon name="times-circle" size={20} />
          </TouchableOpacity>
          <TextInput
            value={editedItem.name}
            onChangeText={newName => dispatch(setEdition(newName))}
          />
          <TouchableOpacity
            onPress={() => editionItems(editedItem.id, editedItem.name)}>
            <Icon name="music" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};
export default EditedItemModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
