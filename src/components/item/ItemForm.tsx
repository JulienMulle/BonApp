import React, {FC} from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {createdItem, fetchItems} from '../../redux/actions/ItemsActions';
import {RootState} from '../../redux/store';
import {
  closeItemFormModal,
  selectIsItemFormVisible,
  setNewItem,
} from '../../redux/selectors/ItemSelector';

const ItemForm: FC = () => {
  const dispatch = useDispatch();
  const isItemFormVisible = useSelector((state: RootState) =>
    selectIsItemFormVisible(state),
  );
  const name = useSelector((state: RootState) => state.items.newItem);
  const NewItem = (name: string) => {
    dispatch(createdItem({newItem: name}));
    setTimeout(() => {
      dispatch(setNewItem(''));
    }, 5);
    dispatch(closeItemFormModal());
  };
  const itemFormClose = () => {
    dispatch(closeItemFormModal());
    dispatch(fetchItems());
  };
  return (
    <Modal visible={isItemFormVisible}>
      <View style={styles.modalView}>
        <TextInput
          autoFocus={true}
          onChangeText={addItem => dispatch(setNewItem(addItem))}
          value={name}
          placeholder={'nouvel article'}
        />
        <TouchableOpacity onPress={itemFormClose}>
          <Icon size={30} name="times-circle" />
        </TouchableOpacity>
        <Button title="Ajouter" onPress={() => NewItem(name)} />
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
});

export default ItemForm;
