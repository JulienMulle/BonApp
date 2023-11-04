import React, {Component, FC, useEffect} from 'react';
import {View, Text, Button, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';
import {
  filteredShoppingByTitle,
  selectRefreshing,
  selectSortedAllShopping,
} from '../redux/selectors/ShoppingSelector';
import ShoppingTile from '../components/shopping/shoppingTile';
import {fetchAllShopping} from '../redux/actions/ShoppingActions';

const ShoppingListScreen: FC = () => {
  const dispatch = useDispatch();
  const refreshing = useSelector((state: rootState) => selectRefreshing(state));
  const sortedItems = useSelector(selectSortedAllShopping);
  const filteredShopping = useSelector(
    (state: rootState) => state.shopping.search,
  );
  useEffect(() => {
    dispatch(fetchAllShopping());
  }, [dispatch]);
  return (
    <SafeAreaView>
      <FlatList
        data={filteredShoppingByTitle(sortedItems, filteredShopping)}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ShoppingTile item={item} />}
      />
    </SafeAreaView>
  );
};
export default ShoppingListScreen;
