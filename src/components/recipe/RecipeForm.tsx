import React, {FC, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createRecipe } from '../../api/endpointRecipe';
import { RecipeFormProps, Recipe } from '../../interface/RecipeInterface';

const RecipeForm: FC<RecipeFormProps> = ({isRecipeFormVisible, onClose}) => {
    const [recipe, setRecipe]= useState<Recipe>({title:'', description:'', picture:null});
    const NewRecipe = async (recipe: Recipe) => {
        try {
          const formData = new FormData();
          formData.append('title', recipe.title);
          formData.append('description', recipe.description);
          formData.append('picture', {
            uri: recipe.picture.uri,
            type: 'image/jpeg',
            name: 'recipe_image.jpg', 
          });
      
          await createRecipe(formData);
          setRecipe({
            title: '',
            description: '',
            picture: null,
          });
          onClose();
        } catch (error) {
          console.error('erreur dans le formulaire', error);
        }
      };

      const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
        };
      
        ImagePicker.launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('Annulé par lutilisateur');
          } else if (response.error) {
            console.log('Erreur :', response.error);
          } else {
            const { uri, type, fileName } = response;
            const picture = {
              uri,
              type,
              name: fileName,
            };
            setRecipe(prevRecipe => ({ ...prevRecipe, picture }));
          }
        });
      };
      
      

    return(
        <Modal visible={isRecipeFormVisible}>
            <View style={styles.modalView}>
            <TouchableOpacity onPress={onClose}>
          <Icon size={30} name="times-circle" />
        </TouchableOpacity>
                <TextInput
                onChangeText={text => setRecipe({ ...recipe, title: text })}
                value={recipe.title}
                placeholder='titre'/>
                <TextInput
                onChangeText={description => setRecipe({...recipe, description:description})}
                value={recipe.description}
                placeholder='description'/>
                <TouchableOpacity onPress={openImagePicker}>
                <Text>Sélectionner une image</Text>
                </TouchableOpacity>
                <Button title='ajouter' onPress={()=> NewRecipe(recipe)}></Button>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        backgroundColor: 'white',
      },
})

export default RecipeForm;