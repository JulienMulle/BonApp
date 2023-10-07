import React, {FC} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {RecipePreviewProps} from '../../interface/RecipeInterface';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ItemTile from '../item/ItemTile';
// @ts-ignore
import noImage from '../../assets/noImage.jpg';

const RecipePreview: FC<RecipePreviewProps> = ({
  recipe,
  isRecipePreviewVisible,
  onClose,
}) => {
  return (
    <Modal transparent visible={isRecipePreviewVisible} animationType="slide">
      <View style={styles.modalView}>
        <Image source={noImage} style={styles.recipeImage} />
        <Text>{recipe.title}</Text>
        <Text>{recipe.description}</Text>
        <FlatList
          data={recipe.items}
          renderItem={({item}) => <ItemTile item={item} />}
        />
        <TouchableOpacity onPress={onClose}>
          <Icon name="times-circle" size={30} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
});
export default RecipePreview;
