import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import noImage from '../../assets/noImage.jpg';
import {RecipesCardProps} from '../../interface/RecipeInterface';

const RecipeCard: FC<RecipesCardProps> = ({recipe}) => {
  return (
    <TouchableOpacity style= {styles.container}>
      <View style={styles.recipeCard}>
      <Image
        resizeMode="contain"
        source={recipe.picture ? {uri: recipe.picture} : noImage}
        style={styles.recipeImage}
      />
      <Text>{recipe.title}</Text>
      <Text>{recipe.description}</Text>
    </View>
    </TouchableOpacity>
  
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
    fontSize: 15,
  },
});
export default RecipeCard;
