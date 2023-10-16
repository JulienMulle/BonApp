import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Item, ItemTileProps} from '../../interface/ItemInterfaces';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {openEditItemModal, setEditItem} from '../../redux/selector';
import {deletedItem} from '../../redux/actions/ItemsActions';

const ItemTile: FC<ItemTileProps> = ({item}) => {
  const dispatch = useDispatch();
  const openEditModal = (item: Item) => {
    dispatch(openEditItemModal());
    dispatch(setEditItem(item));
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Text style={styles.name}>{item.name} </Text>
        </TouchableOpacity>
        <View style={styles.btn}>
          <TouchableOpacity onPress={() => dispatch(deletedItem(item.id))}>
            <Icon name="trash" size={20} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cart-arrow-down" size={20} color="#900" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    paddingTop: 10,
    height: 50,
    justifyContent: 'space-between',
    paddingLeft: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  name: {
    fontSize: 16,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: 30,
  },
});

export default ItemTile;
