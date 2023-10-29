import React, {FC} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import noImage from '../../assets/noImage.jpg';
import {RecipesCardProps} from '../../interface/RecipeInterface';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  openedDeleteModal,
  setRecipe,
} from '../../redux/selectors/RecipeSelector';
import { fetchRecipe } from "../../redux/actions/RecipesActions";

const RecipeCard: FC<RecipesCardProps> = ({recipe}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goRecipeDetais = () => {
    dispatch(fetchRecipe(recipe.id));
    navigation.navigate('RecipeDetailsScreen');
  };
  const openDeleteRecipeModal = () => {
    dispatch(openedDeleteModal());
    dispatch(setRecipe(recipe));
  };
  return (
    <View style={styles.container}>
      <View style={styles.recipeCard}>
        <Pressable onLongPress={() => openDeleteRecipeModal()}>
          <Image
            resizeMode="contain"
            source={{uri: recipe.picture || noImage}}
            style={styles.recipeImage}
          />
        </Pressable>
        <View style={styles.recipeTitle}>
          <Text>{recipe.title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Détail" onPress={() => goRecipeDetais()} />
          <Button title="ajouter" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipeCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    alignItems: 'center',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
});
export default RecipeCard;
