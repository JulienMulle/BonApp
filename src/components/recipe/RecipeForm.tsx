import React, {FC, useEffect, useState} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../../redux/store';
import {
  closeFormModal,
  closeIsEdit,
  selectIsEdit,
  selectIsFormVisible,
  setNewRecipe,
} from '../../redux/selectors/RecipeSelector';
import {
  createdRecipe,
  updatedRecipe,
  fetchRecipe,
} from '../../redux/actions/RecipesActions';
import {Recipe} from '../../interface/RecipeInterface';
const RecipeForm: FC = () => {
  const recipeToEdit = useSelector(
    (state: rootState) => state.recipe.editedRecipe,
  );
  const [file, setFile] = useState(recipeToEdit.picture);
  const dispatch = useDispatch();
  const isEdited = useSelector((state: rootState) => selectIsEdit(state));
  const isFormVisible = useSelector((state: rootState) =>
    selectIsFormVisible(state),
  );
  const newRecipe = useSelector((state: rootState) => state.recipe.newRecipe);
  useEffect(() => {
    if (recipeToEdit) {
      dispatch(setNewRecipe({...recipeToEdit, picture: recipeToEdit.picture}));
    }
  }, [dispatch, file, recipeToEdit]);
  const closeModal = () => {
    if (isEdited) {
      dispatch(fetchRecipe(newRecipe.id));
    }
    dispatch(closeIsEdit());
    dispatch(closeFormModal());
  };
  const createRecipe = (newRecipe: Recipe) => {
    if (isEdited) {
      const formData = new FormData();
      formData.append('title', newRecipe.title);
      formData.append('description', newRecipe.description);
      formData.append('picture', {
        uri: file,
        type: 'image/jpeg',
        name: 'recipe_image.jpg',
      });
      dispatch(updatedRecipe({id: newRecipe.id, recipeUpdated: formData}));
    } else {
      const formData = new FormData();
      formData.append('title', newRecipe.title);
      formData.append('description', newRecipe.description);
      formData.append('picture', {
        uri: file,
        type: 'image/jpeg',
        name: 'recipe_image.jpg',
      });
      dispatch(createdRecipe({newRecipe: formData}));
    }
    closeModal();
  };
  const selectFile = async (mode: string) => {
    dispatch(setNewRecipe(newRecipe));
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
          dispatch(setNewRecipe(newRecipe));
          setFile(selectedImageUri);
        }
      });
    }

  };
  return (
    <Modal visible={isFormVisible} transparent style={styles.container}>
      <View style={styles.recipeCard}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Icon size={30} name="times-circle" />
        </TouchableOpacity>
        {file && <Image source={{uri: file}} style={styles.capturedImage} />}
        <TextInput
          clearButtonMode={'while-editing'}
          autoFocus={true}
          autoCapitalize={'sentences'}
          style={styles.input}
          onChangeText={text =>
            dispatch(setNewRecipe({...newRecipe, title: text}))
          }
          value={newRecipe.title}
          placeholder="titre"
        />
        <TextInput
          autoCapitalize={'sentences'}
          multiline={true}
          numberOfLines={5}
          maxLength={50}
          style={styles.input}
          onChangeText={description =>
            dispatch(setNewRecipe({...newRecipe, description: description}))
          }
          value={newRecipe.description}
          placeholder="description"
        />
        <View style={styles.buttonContainer}>
          <Button title="camera" onPress={() => selectFile('')} />
          <Button title="open galery" onPress={() => selectFile('gallery')} />
        </View>
        <View style={styles.validate}>
          <Button title="ajouter" onPress={() => createRecipe(newRecipe)} />
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

export default RecipeForm;
