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
import {AppDispatch, RootState} from '../../redux/store';
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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Item} from '../../interface/Interface';

const EditedItemModal: FC<{setShowEditModal: (visible: boolean) => void}> = ({
  setShowEditModal,
}) => {
  const dispatch = useAppDispatch<AppDispatch>();
  const editedItem = useAppSelector(
    (state: RootState) => state.items.editedItem,
  );
  const editionItems = (item: Item) => {
    dispatch(updatedItem(item));
    setShowEditModal(false);
  };

  return (
    <View style={styles.modalView}>
      <TextInput
        value={editedItem.name}
        onChangeText={newName => dispatch(setEdition(newName))}
      />
      <TouchableOpacity onPress={() => editionItems(editedItem)}>
        <Icon name="music" size={20} />
      </TouchableOpacity>
    </View>
  );
};
export default EditedItemModal;

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
