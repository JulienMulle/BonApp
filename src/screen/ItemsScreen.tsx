import React, {FC, useEffect} from 'react';
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

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchItems} from '../redux/actions/ItemsActions';
import {
  filterItemsByName,
  selectIsEditItemVisible,
  selectIsItemFormVisible,
  selectRefreshing,
  selectSortedItems,
  openItemFormModal,
  setSearch,
} from '../redux/selectors/ItemSelector';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../redux/hooks';
import {selectIsQuantityVisible} from '../redux/selectors/ShoppingSelector';
import AddToShopping from '../components/shopping/AddToShopping';
import {fetchAllShopping} from '../redux/actions/ShoppingActions';

const ItemsList: FC = () => {
  const dispatch = useDispatch();
  const refreshing = useSelector((state: RootState) => selectRefreshing(state));
  const isEditItemVisible = useSelector((state: RootState) =>
    selectIsEditItemVisible(state),
  );
  const isItemFormVisibile = useSelector((state: RootState) =>
    selectIsItemFormVisible(state),
  );
  const isQuantityModalVisible = useAppSelector((state: RootState) =>
    selectIsQuantityVisible(state),
  );
  const filteredItem = useSelector((state: RootState) => state.items.search);
  const sortedItems = useSelector(selectSortedItems);
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchAllShopping());
  }, []);

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
