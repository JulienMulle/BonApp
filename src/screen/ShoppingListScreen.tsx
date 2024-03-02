import React, {FC, useEffect} from 'react';
import {Button, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';
import {
  filteredShoppingByTitle,
  selectRefreshing,
  selectSortedAllShopping,
} from '../redux/selectors/ShoppingSelector';
import ShoppingTile from '../components/shopping/shoppingTile';
import {fetchAllShopping} from '../redux/actions/ShoppingActions';
import {useNavigation} from '@react-navigation/native';

const ShoppingListScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refreshing = useSelector((state: rootState) => selectRefreshing(state));
  const sortedItems = useSelector(selectSortedAllShopping);
  const filteredShopping = useSelector(
    (state: rootState) => state.shopping.search,
  );
  const goToShoppingDetails = () => {
    navigation.navigate('ShoppingDetailsScreen');
  };
  useEffect(() => {
    dispatch(fetchAllShopping(''));
  }, [dispatch]);
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
