import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Item, ItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {
  setEditItem,
  setItemToQuantity,
} from '../../redux/selectors/ItemSelector';
import {deletedItem} from '../../redux/actions/ItemsActions';
import {
  selectHasActiveShopping,
  selectShoppingDetails,
  setUpdateShoppingList,
} from '../../redux/selectors/ShoppingSelector';
import {
  associationItem,
  createShopping,
  fetchShoppingActive,
} from '../../redux/actions/ShoppingActions';
import {useAppSelector} from '../../redux/hooks';
import Popover from 'react-native-popover-view';
import AddToShopping from '../shopping/AddToShopping';
import styles from '../../style';
import {AppDispatch} from '../../redux/store';
import EditedItemModal from './EditedItemModal';
import {Placement} from 'react-native-popover-view/dist/Types';

const ItemTile: React.FC<ItemTileProps> = ({item}) => {
  const dispatch = useDispatch<AppDispatch>();
  const shoppingIsActive = useAppSelector(selectShoppingDetails);
  const isShoppingActive = useAppSelector(selectHasActiveShopping);
  const [showPopover, setShowPopover] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const openEditModal = (item: Item) => {
    setShowEditModal(true);
    dispatch(setEditItem(item));
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const deleteItem = async (id: number) => {
    await dispatch(deletedItem(id)).unwrap();
    const itemInShopping = shoppingIsActive.items.some(item => item.id === id);
    if (itemInShopping) {
      const newShoppingDetails = shoppingIsActive.items.filter(
        item => item.id !== id,
      );
      dispatch(setUpdateShoppingList(newShoppingDetails));
    }
  };

  const addingItemToShopping = async item => {
    dispatch(setItemToQuantity(item));
    if (!isShoppingActive) {
      await dispatch(
        createShopping({
          title: 'Liste de course du ',
          date: Date.now(),
          isActive: true,
          itemId: item.id,
        }),
      ).unwrap();
    }
    dispatch(
      associationItem({
        shoppingId: shoppingIsActive.id,
        itemId: item.id,
        quantity: 1,
        name: item.name,
      }),
    );
    setShowPopover(true);
  };

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.container}>
        <View style={styles.itemTileContent}>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash" size={20} style={styles.icone} />
          </TouchableOpacity>
          <Popover
            popoverStyle={styless.popOverContainer}
            isVisible={showEditModal}
            onRequestClose={() => closeEditModal()}
            placement={Placement.BOTTOM}
            from={
              <TouchableOpacity onLongPress={() => openEditModal(item)}>
                <Text style={styles.name}>{item.name} </Text>
              </TouchableOpacity>
            }>
            <View>
              <EditedItemModal setShowEditModal={setShowEditModal} />
            </View>
          </Popover>
        </View>
        <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={
            <TouchableOpacity onPress={() => addingItemToShopping(item)}>
              <Icon name="cart-arrow-down" size={20} style={styles.icone} />
            </TouchableOpacity>
          }>
          <View style={styles.popoverContent}>
            <AddToShopping />
          </View>
        </Popover>
      </View>
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    height: '92%',
  },
  add: {
    alignItems: 'center',
  },
  popOverContainer: {
    width: 250,
    height: 60,
    borderRadius: 5,
  },
});

export default ItemTile;
