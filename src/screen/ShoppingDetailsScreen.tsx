import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {selectShoppingIsActive} from '../redux/selectors/ShoppingSelector';
import {editShopping, fetchShopping} from '../redux/actions/ShoppingActions';
import {useNavigation} from '@react-navigation/native';
import ShoppingItemTile from '../components/shopping/shoppingItemTile';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import ActionButton from '../components/ActionButton';
import styles from '../style';

const ShoppingDetailsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const shoppingIsActive = useAppSelector(selectShoppingIsActive);
  const goToShoppingLists = () => {
    navigation.navigate('ShoppingListScreen');
  };
  const checkedShopping = () => {
    const checked = {
      title: shoppingIsActive.title,
      date: shoppingIsActive.date,
      isActive: false,
    };
    dispatch(editShopping({id: shoppingIsActive.id, shopping: checked}));
    goToShoppingLists();
  };
  useEffect(() => {
    dispatch(fetchShopping());
    shoppingIsActive;
    console.log(shoppingIsActive);
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{shoppingIsActive.title}</Text>
        <FlatList
          style={styles.containerList}
          data={shoppingIsActive.items}
          keyExtractor={item => item?.item_id?.toString() ?? ''}
          renderItem={({item}) => <ShoppingItemTile item={item} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton
          onPress={() => checkedShopping()}
          text={'liste terminer'}
        />
        <ActionButton
          onPress={() => goToShoppingLists()}
          text={'liste des courses'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShoppingDetailsScreen;
