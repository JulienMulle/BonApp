import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Item, ItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {
  openEditItemModal,
  setEditItem,
} from '../../redux/selectors/ItemSelector';
import {deletedItem, fetchItems} from '../../redux/actions/ItemsActions';
import {
  selectHasActiveShopping,
  selectShoppingIsActive,
  setItemToQuantity,
} from '../../redux/selectors/ShoppingSelector';
import {
  associationItem,
  createShopping,
  fetchAllShopping,
} from '../../redux/actions/ShoppingActions';
import {useAppSelector} from '../../redux/hooks';
import Popover from 'react-native-popover-view';
import AddToShopping from '../shopping/AddToShopping';
import store, {RootState} from '../../redux/store';
import styles from '../../style';
const ItemTile: React.FC<ItemTileProps> = ({item}) => {
  const dispatch = useDispatch();
  const [showPopover, setShowPopover] = useState(false);
  const openEditModal = (item: Item) => {
    dispatch(openEditItemModal());
    dispatch(setEditItem(item));
  };
  const deleteItem = (id: number) => {
    dispatch(deletedItem(id));
    dispatch(fetchItems());
  };
  const shoppingIsActive = useAppSelector(selectShoppingIsActive);
  const isShoppingActive = useAppSelector(selectHasActiveShopping);
  const addingItemToShopping = item => {
    if (!isShoppingActive) {
      const newShoppingList = {
        title: 'Liste de course du ',
        date: Date.now(),
        isActive: true,
      };
      dispatch(createShopping(newShoppingList)).then(() => {
        const updatedShoppingIsActive = selectShoppingIsActive(
          store.getState(),
        );
        dispatch(
          associationItem({
            shoppingId: updatedShoppingIsActive.id,
            itemId: item.id,
            quantity: 1,
          }),
        );
        dispatch(setItemToQuantity(item));
      });
    } else {
      dispatch(
        associationItem({
          shoppingId: shoppingIsActive.id,
          itemId: item.id,
          quantity: 1,
        }),
      );
      dispatch(setItemToQuantity(item));
    }
    dispatch(fetchAllShopping());
    setShowPopover(true);
  };
  useEffect(() => {
    dispatch(fetchAllShopping());
  }, [dispatch]);

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.container}>
        <View style={styles.itemTileContent}>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash" size={20} style={styles.icone} />
          </TouchableOpacity>
          <TouchableOpacity onLongPress={() => openEditModal(item)}>
            <Text style={styles.name}>{item.name} </Text>
          </TouchableOpacity>
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

export default ItemTile;
