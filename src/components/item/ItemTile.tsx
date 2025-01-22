import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Item, ItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {
  openEditItemModal,
  setEditItem,
} from '../../redux/selectors/ItemSelector';
import {deletedItem, fetchItems} from '../../redux/actions/ItemsActions';
import {
  addedQuantity,
  associateItem,
  createdShopping,
} from '../../api/endpointShopping';
import {
  selectShoppingIsActive,
  setItemToQuantity,
} from '../../redux/selectors/ShoppingSelector';
import {fetchAllShopping} from '../../redux/actions/ShoppingActions';
import {useAppSelector} from '../../redux/hooks';
import Popover from 'react-native-popover-view';
import AddToShopping from '../shopping/AddToShopping';
import {RootState} from '../../redux/store';

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
  const addingItemToShopping = async (itemId: number) => {
    try {
      if (shoppingIsActive?.isActive) {
        await associateItem(shoppingIsActive.id, itemId);
        await addedQuantity(shoppingIsActive.id, itemId, 1);
      } else {
        const newShoppingList = {
          title: 'Liste de course du ',
          date: Date.now(),
          isActive: true,
        };
        const newShopping = await createdShopping(newShoppingList);
        const shoppingId = newShopping.id;
        await associateItem(shoppingId, itemId);
        await addedQuantity(shoppingId, itemId, 1);
      }
      dispatch(fetchAllShopping());
    } catch (error) {
      console.error(
        "Erreur lors de la création de la liste de courses et de l'ajout de l'item :",
        error,
      );
    }
  };
  const itemSelected = useAppSelector(
    (state: RootState) => state.shopping.itemToQuantity,
  );
  const quantityModal = (item: Item) => {
    console.log(item);
    dispatch(setItemToQuantity(item));
    addingItemToShopping(item.id);
    setShowPopover(true);
  };
  useEffect(() => {
    dispatch(fetchAllShopping());
  }, [dispatch]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <TouchableOpacity onLongPress={() => openEditModal(item)}>
          <Text style={styles.name}>{item.name} </Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash" size={20} style={styles.btn} />
          </TouchableOpacity>
          <Popover
            isVisible={showPopover}
            onRequestClose={() => setShowPopover(false)}
            from={
              <TouchableOpacity onPress={() => quantityModal(item)}>
                <Icon name="cart-arrow-down" size={20} style={styles.btn} />
              </TouchableOpacity>
            }>
            <View style={styles.popoverContent}>
              <Text>{'hello'}</Text>
            </View>
          </Popover>
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
  popoverContent: {
    width: 130,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    paddingTop: 12,
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  btn: {
    paddingLeft: 20,
    color: '#900',
  },
});

export default ItemTile;
