import React, {useEffect} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {selectShoppingIsActive} from '../redux/selectors/ShoppingSelector';
import {fetchAllShopping} from '../redux/actions/ShoppingActions';
import {useNavigation} from '@react-navigation/native';
import {editedShopping} from '../api/endpointShopping';
import ShoppingItemTile from '../components/shopping/shoppingItemTile';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

const ShoppingDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
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
    editedShopping(shoppingIsActive.id, checked);
    goToShoppingLists();
  };
  useEffect(() => {
    dispatch(fetchAllShopping());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>{shoppingIsActive?.title}</Text>
          <FlatList
            data={shoppingIsActive?.items}
            keyExtractor={item => item?.id?.toString() ?? ''}
            renderItem={({item}) => <ShoppingItemTile item={item} />}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="liste terminer" onPress={() => checkedShopping()} />
          <Button
            title="liste des courses"
            onPress={() => goToShoppingLists()}
          />
        </View>
      </View>
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
});

export default ShoppingDetailsScreen;
