import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ItemTileProps} from '../../interface/ItemInterfaces';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ItemTile: FC<ItemTileProps> = ({item, removeItem, openModal}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.name}>{item.name} </Text>
        </TouchableOpacity>
        <View style={styles.btn}>
          <TouchableOpacity onPress={removeItem}>
            <Icon name="trash" size={30} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cart-arrow-down" size={30} color="#900" />
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
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingRight: 30,
  },
});

export default ItemTile;
