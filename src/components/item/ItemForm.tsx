import React, {FC} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {createdItem, fetchItems} from '../../redux/actions/ItemsActions';
import {RootState} from '../../redux/store';
import {
  closeItemFormModal,
  setNewItem,
} from '../../redux/selectors/ItemSelector';

const ItemForm: FC = () => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.items.newItem);
  const NewItem = (name: string) => {
    dispatch(createdItem(name));
    dispatch(setNewItem(''));
    dispatch(closeItemFormModal());
  };
  return (
    <View style={styles.modalView}>
      <TextInput
        style={styles.inputContainer}
        autoFocus={true}
        onChangeText={addItem => dispatch(setNewItem(addItem))}
        value={name}
        placeholder={'nouvel article'}
      />
      <TouchableOpacity style={styles.btnAdd} onPress={() => NewItem(name)}>
        <Icon name="arrow-circle-right" size={30}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 40,
    marginTop: 10,
    marginLeft: 10,
  },
  btnAdd: {
    marginTop: 10,
    marginRight: 10,
    paddingTop: 4,
    paddingLeft: 4,
    width: 64,
    height: 40,
  },
});

export default ItemForm;
