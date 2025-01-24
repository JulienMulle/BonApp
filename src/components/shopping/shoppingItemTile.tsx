import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Item, ShoppingItemTileProps} from '../../interface/Interface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {deletedAssociation} from '../../redux/actions/ShoppingActions';
import {useAppDispatch} from '../../redux/hooks';
import {setItemToQuantity} from '../../redux/selectors/ShoppingSelector';
import AddToShopping from './AddToShopping';
import Popover from 'react-native-popover-view';
import styles from '../../style';

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
    <View style={styles.listItemContainer}>
      <View style={styles.container}>
        <View style={styles.itemTileContent}>
          <TouchableOpacity
            onPress={() =>
              deleteItem(
                item.ShoppingItem.shopping_id,
                item.ShoppingItem.item_id,
              )
            }>
            <Icon name="trash" size={20} style={styles.icone} />
          </TouchableOpacity>
          <Text style={styles.name}>{item.name}</Text>
        </View>

        <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={
            <TouchableOpacity onPress={() => quantityModal(item)}>
              <Text style={styles.name}>{item.ShoppingItem.quantity}</Text>
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

export default ShoppingItemTile;
