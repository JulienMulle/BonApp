import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {selectShoppingDetails} from '../redux/selectors/ShoppingSelector';
import {
  fetchShoppingActive,
  updateShopping,
} from '../redux/actions/ShoppingActions';
import {useNavigation} from '@react-navigation/native';
import ShoppingItemTile from '../components/shopping/shoppingItemTile';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import ActionButton from '../components/ActionButton';
import styles from '../style';

const ShoppingDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const shoppingIsActive = useAppSelector(selectShoppingDetails);
  const goToShoppingLists = () => {
    navigation.navigate('ShoppingListScreen');
  };
  const checkedShopping = () => {
    const checked = {
      ...shoppingIsActive,
      title: shoppingIsActive.title,
      date: shoppingIsActive.date,
      isActive: false,
    };
    dispatch(updateShopping(checked));
    goToShoppingLists();
  };
  useEffect(() => {
    dispatch(fetchShoppingActive());
    shoppingIsActive;
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{shoppingIsActive?.title}</Text>
        <FlatList
          style={styles.containerList}
          data={shoppingIsActive?.items}
          keyExtractor={item => item?.id?.toString() ?? ''}
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
