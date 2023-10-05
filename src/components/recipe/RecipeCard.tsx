import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import noImage from '../../assets/noImage.jpg';
import {RecipesCardProps} from '../../interface/RecipeInterface';

const RecipeCard: FC<RecipesCardProps> = ({recipe}) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={recipe.picture ? {uri: recipe.picture} : noImage}
        style={{width: 100, height: 100}}
      />
      <Text>{recipe.title}</Text>
      <Text>{recipe.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    backgroundColor: 'green',
  },
});
export default RecipeCard;
