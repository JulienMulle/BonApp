import React from 'react';
import {Button, FlatList, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  filteredShoppingByTitle,
  selectSortedAllShopping,
} from '../redux/selectors/ShoppingSelector';
import ShoppingTile from '../components/shopping/shoppingTile';

import {useNavigation} from '@react-navigation/native';

const ShoppingListScreen: React.FC = () => {
  const navigation = useNavigation();
  const sortedItems = useSelector(selectSortedAllShopping);
  const filteredShopping = useSelector(
    (state: RootState) => state.shopping.search,
  );
  const goToShoppingDetails = () => {
    navigation.navigate('ShoppingDetailsScreen');
  };
  return (
    <SafeAreaView>
      <FlatList
        data={filteredShoppingByTitle(sortedItems, filteredShopping)}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ShoppingTile item={item} />}
      />
      <Button
        title="retour à la liste actuel"
        onPress={() => goToShoppingDetails()}
      />
    </SafeAreaView>
  );
};
export default ShoppingListScreen;
