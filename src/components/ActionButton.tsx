import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const ActionButton: React.FC<any> = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '40%',
    height: 50,
    fontWeight: 'bold',
    paddingLeft: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  text: {
    fontWeight: 'bold',
  },
});
export default ActionButton;
