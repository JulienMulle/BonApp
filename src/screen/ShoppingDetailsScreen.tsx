import React, {FC, useEffect} from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {selectRefreshing} from '../redux/selectors/ShoppingSelector';
import {
  deletedAssociation,
  fetchShopping,
  fetchShoppingIsActive,
  updateQuantity,
} from '../redux/actions/ShoppingActions';
import {useNavigation} from '@react-navigation/native';
import {editedShopping} from '../api/endpointShopping';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';

import ShoppingItemTile from '../components/shopping/shoppingItemTile';

const ShoppingDetailsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const refresh = useAppSelector((state: RootState) => selectRefreshing(state));
  const shoppingIsActive = useAppSelector(
    (state: RootState) => state.shopping.shoppingList,
  );

  const navigation = useNavigation();
  const quantity = (shoppingId: number, itemId: number, delta: number) => {
    const shoppingItem = shoppingIsActive.items.find(
      item => item.ShoppingItem.item_id === itemId,
    );
    const updatedQuantity = (shoppingItem.ShoppingItem.quantity ?? 0) + delta;
    dispatch(updateQuantity({shoppingId, itemId, updatedQuantity}));
  };
  const deleteItem = (shoppingId: number, itemId: number) => {
    dispatch(deletedAssociation({shoppingId, itemId}));
  };

  const goToShoppingLists = () => {
    navigation.navigate('ShoppingListScreen');
  };
  const checkedShopping = () => {
    const checked = {
      title: shoppingIsActive.title,
      date: shoppingIsActive.date,
      isActive: false,
    };
    editedShopping(shoppingIsActive.id, checked);
    dispatch(fetchShopping(shoppingIsActive.id));
  };
  useEffect(() => {
    dispatch(fetchShoppingIsActive());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        <Text>{shoppingIsActive?.title}</Text>
        <FlatList
          data={shoppingIsActive?.items}
          keyExtractor={item => item?.id?.toString() ?? ''}
          renderItem={({item}) => <ShoppingItemTile item={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => dispatch(fetchShopping(shoppingIsActive.id))}
            />
          }
        />
        <Button title="liste terminer" onPress={() => checkedShopping()} />
      </View>
      <Button title="liste des courses" onPress={() => goToShoppingLists()} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
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
  updateQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
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

export default ShoppingDetailsScreen;
