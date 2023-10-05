import React, {FC, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {EditedItemModalProps} from '../../interface/interfaces';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {editItem} from '../../api/endpointItem';

const EditedItemModal: FC<EditedItemModalProps> = ({
  item,
  isEditItemVisible,
  onClose,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // @ts-ignore
  const [editedName, setEditedName] = useState<string>(item.name);
  const editionItem = async (id: number, newName: string) => {
    try {
      editItem(id, newName);
    } catch (error) {
      console.log(error);
    }
    setIsEdit(!isEdit);
  };
  return (
    <Modal visible={isEditItemVisible} transparent animationType="slide">
      {!isEdit && (
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
            <Text>{editedName}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Icon name="times-circle" size={30} />
          </TouchableOpacity>
        </View>
      )}
      {isEdit && (
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
            <Icon name="times-circle" size={30} />
          </TouchableOpacity>
          <TextInput
            value={editedName}
            onChangeText={newName => setEditedName(newName)}
          />
          <TouchableOpacity onPress={() => editionItem(item.id, editedName)}>
            <Icon name="music" size={30} />
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};
export default EditedItemModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
