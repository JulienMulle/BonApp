import React, {FC, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectShoppingIsActive} from '../redux/selectors/ShoppingSelector';
import {
  deletedAssociation,
  fetchAllShopping,
  updateShopping,
} from '../redux/actions/ShoppingActions';
import {useNavigation} from '@react-navigation/native';
import {editedShopping} from '../api/endpointShopping';
const ShoppingDetailsScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const shoppingIsActive = useSelector(selectShoppingIsActive);
  const deleteAssociation = (id: number) => {
    dispatch(deletedAssociation({shoppingId: shoppingIsActive.id, itemId: id}));
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
    dispatch(fetchAllShopping());
  };
  useEffect(() => {
    dispatch(fetchAllShopping());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        <Text>{shoppingIsActive?.title}</Text>
        <Text>{shoppingIsActive?.date}</Text>
        <FlatList
          data={shoppingIsActive?.items}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.container}>
              <CheckBox />
              <Text>{item.name}</Text>
            </View>
          )}
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
