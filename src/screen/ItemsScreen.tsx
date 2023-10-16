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
import {Item} from '../interface/ItemInterfaces';
import {deleteItem, getItems} from '../api/endpointItem';
import ItemForm from '../components/item/ItemForm';
import EditedItemModal from '../components/item/EditedItemModal';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ItemsList: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [isEditItemVisible, setIsEditItemVisible] = useState<boolean>(false);
  const [isItemFormVisibile, setisItemFormVisibile] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<Item>({
    id: 0,
    name: '',
    quantity: 0,
    unit: '',
  });
  const onRefresh = () => {
    setRefreshing(true);
    loadItems();
    setRefreshing(false);
  };

  const loadItems = async () => {
    try {
      const itemsList: Item[] = await getItems();
      setItems(itemsList);
      setSearchItems(itemsList);
    } catch (error) {
      console.error('Erreur dans le chargement des éléments :', error);
    }
  };
  const removeItem = async (id: number) => {
    const newItemsList: Item[] = items.filter(item => {
      return item.id !== id;
    });
    await deleteItem(id);
    setItems(newItemsList);
  };
  const searchItem = (name: string): void => {
    if (name) {
      const newData: Item[] = searchItems.filter(item => {
        const itemData: string = item.name ? item.name : '';
        return itemData.indexOf(name) > -1;
      });
      setItems(newData);
      setSearch(name);
    } else {
      setItems(searchItems);
      setSearch('');
    }
  };
  const alphaNumericSort = (a: Item, b: Item) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  };
  const sortedItems = [...items].sort(alphaNumericSort);
  const openModal = (item: Item) => {
    setIsEditItemVisible(true);
    setEditedItem(item);
  };
  useEffect(() => {
    loadItems();
  }, []);
  const itemFormClose = () => {
    loadItems();
    setisItemFormVisibile(false);
  };
  const editSuccess = () => {
    loadItems();
    setIsEditItemVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={search}
        placeholder={"j'ai besoin de..."}
        onChangeText={name => searchItem(name)}
      />
      <FlatList
        data={sortedItems}
        keyExtractor={item => item?.id?.toString() ?? ''}
        renderItem={({item}) => (
          <ItemTile
            item={item}
            removeItem={() => removeItem(item.id)}
            openModal={() => openModal(item)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        onPress={() => setisItemFormVisibile(!isEditItemVisible)}
        style={styles.add}>
        <Icon name="plus-circle" size={30} />
      </TouchableOpacity>
      {isEditItemVisible && (
        <EditedItemModal
          item={editedItem}
          isEditItemVisible={isEditItemVisible}
          onClose={editSuccess}
        />
      )}
      {isItemFormVisibile && (
        <ItemForm
          item={editedItem}
          onClose={itemFormClose}
          isItemFormVisibile={isItemFormVisibile}
        />
      )}
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
