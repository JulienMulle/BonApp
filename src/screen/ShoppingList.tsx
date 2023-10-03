import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

interface State {
  message: string;
}

export default class ShoppingList extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      message: 'Bonjour, appuyez sur le bouton !',
    };
  }

  handleButtonPress = () => {
    this.setState({message: 'Le bouton a été pressé !'});
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.state.message}</Text>
        <Button title="Appuyez sur moi" onPress={this.handleButtonPress} />
      </View>
    );
  }
}
