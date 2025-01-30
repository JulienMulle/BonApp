import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectShoppingDetails} from '../../redux/selectors/ShoppingSelector';
import {updateQuantity} from '../../redux/actions/ShoppingActions';
import {ShoppingItemTileProps} from '../../interface/Interface';
import {selectItemForQuantity} from '../../redux/selectors/ItemSelector';

const addToShopping: React.FC<ShoppingItemTileProps> = () => {
  const dispatch = useAppDispatch();
  const shoppingIsActive = useAppSelector(selectShoppingDetails);
  const itemSelected = useAppSelector(selectItemForQuantity);
  const itemQuantity = shoppingIsActive.items.find(
    item => item.id === itemSelected.id,
  );
  const quantity = (delta: number) => {
    const updatedQuantity: number =
      Number(itemQuantity.ShoppingItem.quantity) + delta;
    dispatch(
      updateQuantity({
        shoppingId: shoppingIsActive.id,
        itemId: itemQuantity.id,
        updatedQuantity,
      }),
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => quantity(-1)}>
          <Icon name="minus" size={20} color="#900" />
        </TouchableOpacity>
        <Text style={styles.name}>{itemQuantity?.ShoppingItem?.quantity}</Text>
        <TouchableOpacity onPress={() => quantity(1)}>
          <Icon name="plus" size={20} color="#900" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '30%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    height: 50,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default addToShopping;
