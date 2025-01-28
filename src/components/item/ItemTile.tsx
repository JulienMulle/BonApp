import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Item, ItemTileProps, ItemWithShop} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {
  openEditItemModal,
  setEditItem,
} from '../../redux/selectors/ItemSelector';
import {deletedItem, fetchItems} from '../../redux/actions/ItemsActions';
import {
  selectShoppingIsActive,
  setItemToQuantity,
} from '../../redux/selectors/ShoppingSelector';
import {
  associationItem,
  createShopping,
  fetchAllShopping,
  fetchShopping,
} from '../../redux/actions/ShoppingActions';
import {useAppSelector} from '../../redux/hooks';
import Popover from 'react-native-popover-view';
import AddToShopping from '../shopping/AddToShopping';
import styles from '../../style';
import {Placement} from 'react-native-popover-view/dist/Types';

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
  const shoppingListActive = useAppSelector(selectShoppingIsActive);
  const addingItemToShopping = item => {
    if (!shoppingListActive) {
      const newShoppingList = {
        title: 'Liste de course du ',
        date: Date.now(),
        isActive: true,
      };
      dispatch(createShopping(newShoppingList));
    }
    dispatch(
      associationItem({
        shoppingId: shoppingListActive.id,
        itemId: item.id,
        quantity: 1,
      }),
    );
    dispatch(
      setItemToQuantity({
        item_id: item.id,
        shopping_id: shoppingListActive.id,
        quantity: 1,
        name: item.name,
      }),
    );
    dispatch(fetchShopping());
    //setShowPopover(true);
  };
  useEffect(() => {
    dispatch(fetchAllShopping());
    shoppingListActive;
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
          placement={Placement.BOTTOM}
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
