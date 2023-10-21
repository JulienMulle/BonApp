import React, {FC, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {ItemAddFormProps} from '../../interface/ItemInterfaces';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {createdItem} from '../../redux/actions/ItemsActions';
import {rootState} from '../../redux/store';
import {
  closeItemFormModal,
  selectIsItemFormVisible,
  setNewItem,
} from '../../redux/selector';

const ItemForm: FC = () => {
  const dispatch = useDispatch();
  const isItemFormVisible = useSelector((state: rootState) =>
    selectIsItemFormVisible(state),
  );
  const name = useSelector((state: rootState) => state.items.newItem);
  const NewItem = (name: string) => {
    dispatch(createdItem({newItem:name}));
    setTimeout(() => {
      dispatch(setNewItem(''));
    }, 5);
    dispatch(closeItemFormModal());
  };

  return (
    <Modal visible={isItemFormVisible}>
      <View style={styles.modalView}>
        <TextInput
          onChangeText={addItem => dispatch(setNewItem(addItem))}
          value={name}
          placeholder={'nouvel article'}
        />
        <TouchableOpacity onPress={() => dispatch(closeItemFormModal())}>
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
