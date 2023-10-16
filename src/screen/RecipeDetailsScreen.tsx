import React, {FC, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Recipe, RecipeDetailProps} from '../interface/RecipeInterface';
import ItemTile from '../components/item/ItemTile';
import {useNavigation} from '@react-navigation/native';
import AssociationWithItem from '../components/recipe/AssociationWithItem';
import {
  deleteItemAssociationWithRecipe,
  getRecipe,
} from '../api/endpointRecipe';
import {Item} from '../interface/ItemInterfaces';
// @ts-ignore
import noImage from '../assets/noImage.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RecipeForm from '../components/recipe/RecipeForm';
const RecipeDetailsScreen: FC<RecipeDetailProps> = ({route}) => {
  const {recipe} = route.params;
  const navigation = useNavigation();
  const [isEditRecipe, setIsEditRecipe] = useState<boolean>(false);
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [fetchRecipe, setFetchRecipe] = useState<Recipe>({
    category: recipe.category,
    description: recipe.description,
    id: recipe.id,
    items: recipe.items,
    picture: recipe.picture,
    title: recipe.title,
  });
  const loadRecipe = async () => {
    const recipeId = recipe.id;
    try {
      const fetchingRecipe = await getRecipe(recipeId);
      setFetchRecipe(fetchingRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAssociation = async (id: number) => {
    const NewAssociationList: Item[] = recipe.items.filter(item => {
      return item.id !== id;
    });
    deleteItemAssociationWithRecipe(id, recipe.id);
    setFetchRecipe(newAssociation => ({
      ...newAssociation,
      items: NewAssociationList,
    }));
  };
  const closeModal = () => {
    setIsEditRecipe(false);
    setIsAddingItem(false);
    loadRecipe();
  };

  return (
    <SafeAreaView>
      {!isEditRecipe && (
        <ScrollView>
          <View style={styles.modalView}>
            <View style={styles.containerButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RecipesScreen')}>
                <Icon size={30} name="times-circle" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditRecipe(!isEditRecipe)}>
                <Icon size={30} name="edit" />
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: recipe.picture || noImage}}
              style={styles.recipeImage}
            />
            <Text>{fetchRecipe.title}</Text>
            <Text>{fetchRecipe.description}</Text>
            <Button
              title="ajouter ingredient"
              onPress={() => setIsAddingItem(!isAddingItem)}
            />
            {fetchRecipe.items.map(item => (
              <ItemTile
                key={item.id}
                item={item}
                removeItem={() => deleteAssociation(item.id)}
              />
            ))}
            {isAddingItem && (
              <AssociationWithItem
                recipe={fetchRecipe}
                isAssociationVisible={isAddingItem}
                onClose={closeModal}
              />
            )}
          </View>
        </ScrollView>
      )}
      {isEditRecipe && (
        <RecipeForm
          onClose={closeModal}
          isRecipeFormVisible={isEditRecipe}
          recipeToEdit={fetchRecipe}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  recipeImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
export default RecipeDetailsScreen;
