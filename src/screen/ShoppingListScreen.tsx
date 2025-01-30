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

export default ShoppingListScreen;
