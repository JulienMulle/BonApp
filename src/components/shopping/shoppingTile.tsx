import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Shopping} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../style';
import {useDispatch} from 'react-redux';
import {
  deletedShopping,
  fetchAllShopping,
} from '../../redux/actions/ShoppingActions';

const ShoppingTile: React.FC<{item: Shopping}> = ({item}) => {
  const dispatch = useDispatch();
  const dateToString = new Date(item.date);
  const formatDateFr = dateToString.toLocaleDateString('fr-FR');
  const deleteShopping = item => {
    dispatch(deletedShopping(item.id));
    dispatch(fetchAllShopping);
  };

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.container}>
        <View style={styles.itemTileContent}>
          <TouchableOpacity
            onPress={() => {
              deleteShopping(item);
            }}>
            <Icon name="trash" size={20} style={styles.icone} />
          </TouchableOpacity>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.date}>{formatDateFr}</Text>
        </View>
      </View>
    </View>
  );
};

export default ShoppingTile;
