import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Item, ItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {
  openEditItemModal,
  setEditItem,
} from '../../redux/selectors/ItemSelector';
import {deletedItem, fetchItems} from '../../redux/actions/ItemsActions';
import {associateItem, createdShopping} from '../../api/endpointShopping';
import {
  selectShoppingIsActive,
  selectSortedAllShopping,
} from '../../redux/selectors/ShoppingSelector';
import {
  associationItem,
  createShopping,
  fetchAllShopping,
} from '../../redux/actions/ShoppingActions';

const ItemTile: FC<ItemTileProps> = ({item}) => {
  const dispatch = useDispatch();
  const openEditModal = (item: Item) => {
    dispatch(openEditItemModal());
    dispatch(setEditItem(item));
  };
  const deleteItem = (id: number) => {
    dispatch(deletedItem(id));
    dispatch(fetchItems());
  };
  const shoppingList = useSelector(selectSortedAllShopping);
  const shoppingIsActive = shoppingList.find(shop => shop.isActive === true);
  const addingItemToShopping = async (itemId: number) => {
    try {
      if (shoppingIsActive?.isActive) {
        await associateItem(shoppingIsActive.id, itemId);
      } else {
        const newShoppingList = {
          title: 'Liste de course du ',
          date: Date.now(),
          isActive: true,
        };
        const newShopping = await createdShopping(newShoppingList);
        const shoppingId = newShopping.id;
        await associateItem(shoppingId, itemId);
      }
      dispatch(fetchAllShopping())
    } catch (error) {
      console.error(
        "Erreur lors de la création de la liste de courses et de l'ajout de l'item :",
        error,
      );
    }
  };
  useEffect(() => {
    dispatch(fetchAllShopping());
  }, [dispatch]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Text style={styles.name}>{item.name} </Text>
        </TouchableOpacity>
        <View style={styles.btn}>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash" size={20} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addingItemToShopping(item.id)}>
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
