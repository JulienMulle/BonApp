import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Item, ShoppingItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deletedAssociation} from '../../redux/actions/ShoppingActions';
import {useAppDispatch} from '../../redux/hooks';
import {setItemToQuantity} from '../../redux/selectors/ShoppingSelector';
import AddToShopping from './AddToShopping';
import Popover from 'react-native-popover-view';

const ShoppingItemTile: React.FC<ShoppingItemTileProps> = ({item}) => {
  const dispatch = useAppDispatch();
  const [showPopover, setShowPopover] = useState(false);
  const deleteItem = (shoppingId: number, itemId: number) => {
    dispatch(deletedAssociation({shoppingId, itemId}));
  };
  const quantityModal = (item: Item) => {
    dispatch(setItemToQuantity(item));
    setShowPopover(true);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            deleteItem(item.ShoppingItem.shopping_id, item.ShoppingItem.item_id)
          }>
          <Icon name="trash" size={20} color="#900" />
        </TouchableOpacity>
        <Text style={styles.name}>{item.name}</Text>
        <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={
            <TouchableOpacity onPress={() => quantityModal(item)}>
              <Text style={styles.name}>{item.ShoppingItem.quantity}</Text>
            </TouchableOpacity>
          }>
          <View style={styles.popoverContent}>
            <AddToShopping item={item} />
          </View>
        </Popover>
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
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    justifyContent: 'space-between',
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
  updateQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: 30,
  },
});

export default ShoppingItemTile;
