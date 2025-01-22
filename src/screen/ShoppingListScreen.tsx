import React from 'react';
import {Text, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  filteredShoppingByTitle,
  selectSortedAllShopping,
} from '../redux/selectors/ShoppingSelector';
import ShoppingTile from '../components/shopping/shoppingTile';
import {useNavigation} from '@react-navigation/native';
import ActionButton from '../components/ActionButton';
import styles from '../style';

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
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{'liste des courses'}</Text>
        <FlatList
          style={styles.containerList}
          data={filteredShoppingByTitle(sortedItems, filteredShopping)}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ShoppingTile item={item} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton
          onPress={() => goToShoppingDetails()}
          text={'liste actuelle'}
        />
      </View>
    </SafeAreaView>
  );
};

const styless = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  containerList: {
    paddingTop: 10,
    height: '87%',
  },
  buttonContainer: {
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 15,
  },
});
export default ShoppingListScreen;
