import React, {FC, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createRecipe} from '../../api/endpointRecipe';
import {RecipeFormProps, Recipe} from '../../interface/RecipeInterface';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const RecipeForm: FC<RecipeFormProps> = ({
  isRecipeFormVisible,
  onClose,
  onUpdateRecipes,
}) => {
  const [recipe, setRecipe] = useState<Recipe>({
    category: [],
    id: 0,
    items: [],
    title: '',
    description: '',
    picture: '',
  });
  const [file, setFile] = useState('');
  const NewRecipe = async (recipe: Recipe) => {
    try {
      const formData = new FormData();
      formData.append('title', recipe.title);
      formData.append('description', recipe.description);
      formData.append('picture', {
        uri: file,
        type: 'image/jpeg',
        name: 'recipe_image.jpg',
      });

      await createRecipe(formData);
      setRecipe({
        category: [],
        id: 0,
        items: [],
        title: '',
        description: '',
        picture: '',
      });
      onClose();
      onUpdateRecipes();
    } catch (error) {
      console.error('erreur dans le formulaire', error);
    }
  };

  const openGallery = async (mode: string) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    if (mode === 'gallery') {
      launchImageLibrary(options, response => {
        if (!response.didCancel && !response.errorMessage) {
          const selectedImageUri = response.assets[0].uri;
          setFile(selectedImageUri);
        }
      });
    } else {
      // @ts-ignore
      launchCamera(options, response => {
        if (!response.didCancel && !response.errorMessage) {
          const selectedImageUri = response.assets[0].uri;
          setFile(selectedImageUri);
        }
      });
    }
  };

  return (
    <Modal visible={isRecipeFormVisible}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon size={30} name="times-circle" />
        </TouchableOpacity>
        {file && <Image source={{uri: file}} style={styles.capturedImage} />}
        <TextInput
          style={styles.input}
          onChangeText={text => setRecipe({...recipe, title: text})}
          value={recipe.title}
          placeholder="titre"
        />
        <TextInput
          style={styles.input}
          onChangeText={description =>
            setRecipe({...recipe, description: description})
          }
          value={recipe.description}
          placeholder="description"
        />
        <View style={styles.buttonContainer}>
          <Button title="camera" onPress={openGallery} />
          <Button title="open galery" onPress={() => openGallery('gallery')} />
        </View>
        <View style={styles.validate}>
          <Button title="ajouter" onPress={() => NewRecipe(recipe)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    width: '92%',
    height: '70%',
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  capturedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  validate: {
    alignItems: 'center',
  },
});

export default RecipeForm;
