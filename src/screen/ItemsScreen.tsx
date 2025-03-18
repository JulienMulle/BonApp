import React, {FC, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ItemTile from '../components/item/ItemTile';
import ItemForm from '../components/item/ItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchItems} from '../redux/actions/ItemsActions';
import {
  closeItemFormModal,
  filterItemsByName,
  openItemFormModal,
  selectIsItemFormVisible,
  selectRefreshing,
  selectSortedItems,
  setNewItem,
  setSearch,
} from '../redux/selectors/ItemSelector';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Popover from 'react-native-popover-view';
import {Placement} from 'react-native-popover-view/dist/Types';
import {fetchAllShopping} from '../redux/actions/ShoppingActions';

const ItemsList: FC = () => {
  const dispatch = useDispatch();
  const refreshing = useSelector((state: RootState) => selectRefreshing(state));
  const isItemFormVisibile = useSelector((state: RootState) =>
    selectIsItemFormVisible(state),
  );
  const filteredItem = useSelector((state: RootState) => state.items.search);
  const sortedItems = useSelector(selectSortedItems);
  const CloseFormModal = () => {
    dispatch(setNewItem(null));
    dispatch(closeItemFormModal());
  };
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchAllShopping());
  }, [dispatch]);

  return (
    <SafeAreaView style={styless.container}>
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
      <Popover
        popoverStyle={styless.popOverContainer}
        isVisible={isItemFormVisibile}
        onRequestClose={() => CloseFormModal()}
        placement={Placement.TOP}
        from={
          <TouchableOpacity
            onPress={() => dispatch(openItemFormModal())}
            style={styless.add}>
            <Icon name="plus-circle" size={30} />
          </TouchableOpacity>
        }>
        <View>
          <ItemForm />
        </View>
      </Popover>
    </SafeAreaView>
  );
};

const styless = StyleSheet.create({
  container: {
    height: '92%',
  },
  add: {
    alignItems: 'center',
  },
  popOverContainer: {
    width: 250,
    height: 60,
    borderRadius: 5,
  },
});

export default ItemsList;
