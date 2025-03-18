import {FC, useState} from 'react';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import React from 'react';
import {
  clearEditedRecipe,
  closeIsEdit,
  selectIsEdit,
  setNewRecipe,
  setRecipeForEditing,
} from '../../redux/selectors/RecipeSelector';
import {Recipe} from '../../interface/Interface';
import {updatedRecipe} from '../../redux/actions/RecipesActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import noImage from '../../assets/noImage.jpg';

const RecipeEditForm: FC = () => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState();
  const recipe = useAppSelector(
    (state: RootState) => state.recipe.editedRecipe,
  );
  const isEditVisible = useAppSelector((state: RootState) =>
    selectIsEdit(state),
  );
  const editRecipe = (editedRecipe: Recipe) => {
    const formData = new FormData();
    formData.append('title', editedRecipe.title);
    formData.append('description', editedRecipe.description);
    dispatch(updatedRecipe({id: recipe.id, recipeUpdated: formData}));
    dispatch(closeIsEdit());
    console.log(recipe);
  };
  const closeModal = () => {
    dispatch(closeIsEdit());
    //dispatch(clearEditedRecipe());
  };
  const selectFile = async (mode: string) => {
    dispatch(setRecipeForEditing(recipe));
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    if (mode === 'gallery') {
      launchImageLibrary(options, response => {
        if (!response.didCancel && !response.errorMessage) {
          const selectedImageUri = response.assets[0].uri;
          setFile(selectedImageUri);
          dispatch(setNewRecipe({...recipe, picture: selectedImageUri}));
        }
      });
    } else {
      // @ts-ignore
      launchCamera(options, response => {
        if (!response.didCancel && !response.errorMessage) {
          const selectedImageUri = response.assets[0].uri;
          setFile(selectedImageUri);
          dispatch(
            setNewRecipe({
              ...recipe,
              picture: selectedImageUri ? selectedImageUri : noImage,
            }),
          );
        }
      });
    }
  };
  return (
    <Modal visible={isEditVisible} transparent style={styles.container}>
      <View style={styles.recipeCard}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Icon size={30} name="times-circle" />
        </TouchableOpacity>
        <Image
          source={{uri: recipe.picture}}
          style={styles.capturedImage}></Image>
        <TextInput
          clearButtonMode="always"
          autoCapitalize={'sentences'}
          style={styles.input}
          defaultValue={recipe.title}
          onChangeText={title =>
            dispatch(setRecipeForEditing({...recipe, title: title}))
          }
          placeholder="titre"
        />
        <TextInput
          clearButtonMode={'while-editing'}
          autoCapitalize={'sentences'}
          style={styles.input}
          defaultValue={recipe.description}
          onChangeText={description =>
            dispatch(setRecipeForEditing({...recipe, description: description}))
          }
          placeholder="description"
        />
        <View style={styles.buttonContainer}>
          <Button title="camera" onPress={() => selectFile('')} />
          <Button title="open galery" onPress={() => selectFile('gallery')} />
        </View>
        <View style={styles.validate}>
          <Button title="ajouter" onPress={() => editRecipe(recipe)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipeCard: {
    margin: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    marginTop: 100,
    height: 500,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  capturedImage: {
    borderColor: 'black',
    borderWidth: 1,
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
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  validate: {
    alignItems: 'center',
  },
});

export default RecipeEditForm;
