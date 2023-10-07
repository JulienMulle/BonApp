import React, {FC, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {createItem} from '../../api/endpointItem';
import {ItemAddFormProps} from '../../interface/ItemInterfaces';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ItemForm: FC<ItemAddFormProps> = ({isItemFormVisibile, onClose}) => {
  const [name, setName] = useState<string>('');
  const NewItem = async (name: string) => {
    try {
      createItem(name);
      setName('');
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création de l'article :", error);
    }
  };

  return (
    <Modal visible={isItemFormVisibile}>
      <View style={styles.modalView}>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder={'nouvel article'}
        />
        <TouchableOpacity onPress={onClose}>
          <Icon size={30} name="times-circle" />
        </TouchableOpacity>
        <Button title="Ajouter" onPress={() => NewItem(name)} />
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
});

export default ItemForm;
