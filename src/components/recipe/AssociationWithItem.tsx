import React, {FC, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Item} from '../../interface/ItemInterfaces';
import {AssociationWithItemProps} from '../../interface/RecipeInterface';
import {getItems} from '../../api/endpointItem';
import {associateItemWithRecipe} from '../../api/endpointRecipe';

const AssociationWithItem: FC<AssociationWithItemProps> = ({
  recipe,
  isAssociationVisible,
  onClose,
}) => {
  const [items, setItems] = useState<Item[]>();
  console.log(recipe.id, recipe.title);
  const loadItems = async () => {
    try {
      const itemsList: Item[] = await getItems();
      setItems(itemsList);
    } catch (error) {
      console.error('Erreur dans le chargement des éléments :', error);
    }
  };
  const addItem = async (id: number) => {
    const recipeId = recipe.id;
    const itemId = id;
    try {
      associateItemWithRecipe(itemId, recipeId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <Modal visible={isAssociationVisible} animationType="slide">
      <View style={styles.itemContainer}>
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => addItem(item.id)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity onPress={onClose}>
          <Icon name="plus-circle" size={30} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
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
  name: {
    fontSize: 16,
  },
  btn: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingRight: 30,
  },
});

export default AssociationWithItem;
