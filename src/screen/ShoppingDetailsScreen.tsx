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
import {
  selectRefreshing,
} from '../redux/selectors/ShoppingSelector';
import {
  fetchShopping,
  fetchShoppingIsActive,
} from '../redux/actions/ShoppingActions';
import {useNavigation} from '@react-navigation/native';
import {editedShopping} from '../api/endpointShopping';
import ShoppingItemTile from '../components/shopping/shoppingItemTile';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';


const ShoppingDetailsScreen: FC = () => {
  const dispatch = useAppDispatch();
  const refresh = useAppSelector((state: RootState) => selectRefreshing(state));
  const shoppingIsActive = useAppSelector(
    (state: RootState) => state.shopping.shoppingList,
  );
  console.log(shoppingIsActive, 'dans le composant');
  const navigation = useNavigation();

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
    console.log(shoppingIsActive, 'ecran');
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
    flex: 1,
    margin: 6,
    width: '45%',
    paddingTop: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
  closeButton: {
    alignSelf: 'flex-start',
  },
});

export default ShoppingDetailsScreen;
