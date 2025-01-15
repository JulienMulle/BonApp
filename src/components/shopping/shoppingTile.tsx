import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Shopping} from '../../interface/Interface';

const ShoppingTile: FC<{item: Shopping}> = ({item}) => {
  const dateToString = new Date(item.date);
  const formatDateFr = dateToString.toLocaleDateString('fr-FR');
  return (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <Text>{item.title}</Text>
        <Text>{formatDateFr}</Text>
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
export default ShoppingTile;
