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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RootState} from '../../redux/store';
import {
  closeFormModal,
  closeIsEdit,
  selectIsFormVisible,
  setNewRecipe,
} from '../../redux/selectors/RecipeSelector';
import {createdRecipe} from '../../redux/actions/RecipesActions';
import {Recipe} from '../../interface/Interface';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
// @ts-ignore
import noImage from '../../assets/noImage.jpg';
const RecipeForm: FC = () => {
  const [file, setFile] = useState();
  const dispatch = useAppDispatch();
  const isFormVisible = useAppSelector((state: RootState) =>
    selectIsFormVisible(state),
  );
  const editRecipe = useAppSelector(
    (state: RootState) => state.recipe.editedRecipe,
  );
  const newRecipe = useAppSelector(
    (state: RootState) => state.recipe.newRecipe,
  );

  const createRecipe = (newRecipe: Recipe) => {
    const formData = new FormData();
    formData.append('title', newRecipe.title);
    formData.append('description', newRecipe.description);
    formData.append('picture', {
      uri: file,
      type: 'image/jpeg',
      name: 'recipe_image.jpg',
    });
    dispatch(createdRecipe({newRecipe: formData}));
    dispatch(setNewRecipe(null));
    closeModal();
  };
  const closeModal = () => {
    dispatch(closeFormModal());
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
          dispatch(setNewRecipe({...newRecipe, picture: selectedImageUri}));
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
              ...newRecipe,
              picture: selectedImageUri ? selectedImageUri : noImage,
            }),
          );
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
          defaultValue={editRecipe.title}
          onChangeText={text =>
            dispatch(setNewRecipe({...newRecipe, title: text}))
          }
          placeholder="titre"
        />
        <TextInput
          autoCapitalize="sentences"
          multiline={true}
          numberOfLines={5}
          maxLength={50}
          style={styles.input}
          onChangeText={description =>
            dispatch(setNewRecipe({...newRecipe, description: description}))
          }
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
