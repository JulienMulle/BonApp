import React, {FC, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectShoppingIsActive} from '../redux/selectors/ShoppingSelector';
import ItemTile from '../components/item/ItemTile';
import {deletedAssociation} from '../redux/actions/ShoppingActions';

const ShoppingDetailsScreen: FC = () => {
  const dispatch = useDispatch();
  const shoppingIsActive = useSelector(selectShoppingIsActive);
  const deleteAssociation = (id: number) => {
    dispatch(deletedAssociation({shoppingId: shoppingIsActive.id, itemId: id}));
  };

  useEffect(() => {
    shoppingIsActive;
  }, [shoppingIsActive]);

  return (
    <SafeAreaView>
      <View>
        <Text>{shoppingIsActive?.title}</Text>
        <Text>{shoppingIsActive?.date}</Text>
        {shoppingIsActive?.items.map(item => (
          <ItemTile
            item={item}
            key={item.id}
            removeItem={() => deleteAssociation(item.id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ShoppingDetailsScreen;
