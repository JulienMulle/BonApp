import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ShoppingItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  deletedAssociation,
  updateQuantity,
} from '../../redux/actions/ShoppingActions';
import {Check} from '@tamagui/lucide-icons';
import {Checkbox} from 'tamagui';
import { useAppDispatch } from '../../redux/hooks';

const ShoppingItemTile: FC<ShoppingItemTileProps> = ({item}) => {
  const dispatch = useAppDispatch();
  const quantity = (shoppingId: number, itemId: number, delta: number) => {
    const updatedQuantity: number = item.ShoppingItem.quantity + delta;
    dispatch(updateQuantity({shoppingId, itemId, updatedQuantity}));
  };
  const deleteItem = (shoppingId: number, itemId: number) => {
    dispatch(deletedAssociation({shoppingId, itemId}));
  };
  useEffect(() => {}, []);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <Checkbox size="$4">
          <Checkbox.Indicator>
            <Check />
          </Checkbox.Indicator>
        </Checkbox>

        <Icon
          name="trash"
          size={20}
          color="#900"
          onPress={() =>
            deleteItem(item.ShoppingItem.shopping_id, item.ShoppingItem.item_id)
          }
        />
        <TouchableOpacity>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.updateQuantity}>
          <TouchableOpacity>
            <Icon
              name="minus"
              size={20}
              color="#900"
              onPress={() =>
                quantity(
                  item.ShoppingItem.shopping_id,
                  item.ShoppingItem.item_id,
                  -1,
                )
              }
            />
          </TouchableOpacity>
          <Text style={styles.name}>{item.ShoppingItem.quantity}</Text>
          <TouchableOpacity>
            <Icon
              name="plus"
              size={20}
              color="#900"
              onPress={() =>
                quantity(
                  item.ShoppingItem.shopping_id,
                  item.ShoppingItem.item_id,
                  1,
                )
              }
            />
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
  updateQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
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

export default ShoppingItemTile;
