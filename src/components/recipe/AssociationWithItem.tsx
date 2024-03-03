import React, {FC, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import {
  selectIsAssociationModal,
  closeAssociationModal,
} from '../../redux/selectors/RecipeSelector';
import {fetchItems} from '../../redux/actions/ItemsActions';
import {
  associationItemToRecipe,
  fetchRecipe,
} from '../../redux/actions/RecipesActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const AssociationWithItem: FC = () => {
  const dispatch = useAppDispatch();
  const recipeAssociate = useAppSelector(
    (state: rootState) => state.recipe.recipeDetails,
  );
  const isAssociate = useAppSelector((state: rootState) =>
    selectIsAssociationModal(state),
  );
  const Items = useAppSelector((state: rootState) => state.items.items);
  const addItem = async (id: number) => {
    const recipeId = recipeAssociate.id;
    const itemId = id;
    try {
      dispatch(associationItemToRecipe({itemId: itemId, recipeId: recipeId}));
    } catch (error) {}
  };
  const closeModal = () => {
    dispatch(fetchRecipe(recipeAssociate.id));
    dispatch(closeAssociationModal());
  };
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  return (
    <Modal visible={isAssociate} animationType="slide">
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Icon name="times-circle" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <FlatList
          data={Items}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => addItem(item.id)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Modal>
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

export default AssociationWithItem;
