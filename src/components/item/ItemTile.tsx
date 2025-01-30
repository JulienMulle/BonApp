import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Item, ItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {
  openEditItemModal,
  setEditItem,
  setItemToQuantity,
} from '../../redux/selectors/ItemSelector';
import {deletedItem, fetchItems} from '../../redux/actions/ItemsActions';
import {
  selectHasActiveShopping,
  selectShoppingDetails,
} from '../../redux/selectors/ShoppingSelector';
import {
  associationItem,
  createShopping,
} from '../../redux/actions/ShoppingActions';
import {useAppSelector} from '../../redux/hooks';
import Popover from 'react-native-popover-view';
import AddToShopping from '../shopping/AddToShopping';
import styles from '../../style';
import {AppDispatch} from '../../redux/store';
const ItemTile: React.FC<ItemTileProps> = ({item}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPopover, setShowPopover] = useState(false);
  const openEditModal = (item: Item) => {
    dispatch(openEditItemModal());
    dispatch(setEditItem(item));
  };
  const deleteItem = (id: number) => {
    dispatch(deletedItem(id));
    dispatch(fetchItems());
  };
  const shoppingIsActive = useAppSelector(selectShoppingDetails);
  const isShoppingActive = useAppSelector(selectHasActiveShopping);
  const addingItemToShopping = item => {
    dispatch(setItemToQuantity(item));
    if (!isShoppingActive) {
      dispatch(
        createShopping({
          title: 'Liste de course du ',
          date: Date.now(),
          isActive: true,
          itemId: item.id,
        }),
      );
    } else {
      dispatch(
        associationItem({
          shoppingId: shoppingIsActive.id,
          itemId: item.id,
          quantity: 1,
          name: item.name,
        }),
      );
    }
    setShowPopover(true);
  };

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
