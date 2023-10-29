import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ItemTile from '../components/item/ItemTile';
import ItemForm from '../components/item/ItemForm';
import EditedItemModal from '../components/item/EditedItemModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';
import {deletedItem, fetchItems} from '../redux/actions/ItemsActions';
import {
  filterItemsByName,
  selectIsEditItemVisible,
  selectIsItemFormVisible,
  selectRefreshing,
  selectSortedItems,
  openItemFormModal,
  setSearch,
} from '../redux/selectors/ItemSelector';
import {useFocusEffect} from '@react-navigation/native';
import {fetchRecipes} from '../redux/actions/RecipesActions';

const ItemsList: FC = () => {
  const dispatch = useDispatch();
  const refreshing = useSelector((state: rootState) => selectRefreshing(state));
  const isEditItemVisible = useSelector((state: rootState) =>
    selectIsEditItemVisible(state),
  );
  const isItemFormVisibile = useSelector((state: rootState) =>
    selectIsItemFormVisible(state),
  );
  const filteredItem = useSelector((state: rootState) => state.items.search);
  const sortedItems = useSelector(selectSortedItems);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchItems());
    }, [dispatch]),
  );
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={filteredItem}
        placeholder={"j'ai besoin de..."}
        onChangeText={name => dispatch(setSearch(name))}
      />
      <FlatList
        data={filterItemsByName(sortedItems, filteredItem)}
        keyExtractor={item => item?.id?.toString() ?? ''}
        renderItem={({item}) => <ItemTile item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => dispatch(fetchItems())}
          />
        }
      />
      <TouchableOpacity
        onPress={() => dispatch(openItemFormModal())}
        style={styles.add}>
        <Icon name="plus-circle" size={30} />
      </TouchableOpacity>
      {isEditItemVisible && <EditedItemModal />}
      {isItemFormVisibile && <ItemForm />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '92%',
  },
  add: {
    alignItems: 'center',
  },
});

export default ItemsList;
