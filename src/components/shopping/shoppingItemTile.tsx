import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import { ShoppingItemTileProps } from "../../interface/Interface";

const ShoppingItemTile: FC<ShoppingItemTileProps> = ({item}) => {
  const test = item.name;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(test)
  }, []);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
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

export default ShoppingItemTile;
