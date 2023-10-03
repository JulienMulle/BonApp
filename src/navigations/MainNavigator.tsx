import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecipesScreen from '../screen/RecipesScreen';
import ItemsScreen from '../screen/ItemsScreen';
import ShoppingList from '../screen/ShoppingList';
import PlanningScreen from '../screen/PlanningScreen';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default class MainNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName = 'default-icon';
              switch (route.name) {
                case 'liste des recettes':
                  iconName = focused ? 'book' : 'book';
                  break;
                case 'liste des ingrédients':
                  iconName = focused ? 'list-ul' : 'list-ul';
                  break;
                case 'liste de course':
                  iconName = focused ? 'shopping-cart' : 'shopping-cart';
                  break;
                case 'Agenda':
                  iconName = focused ? 'calendar' : 'calendar';
                  break;
                default:
                  break;
              }
              return (
                <Icon
                  name={iconName ?? 'default-icon'}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'black',
            tabBarShowLabel: true,
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 7,
              left: 15,
              right: 15,
              backgroundColor: 'white',
              borderRadius: 10,
              height: 50,
              // j'injecte le styles
              ...styles.shadow,
            },
          })}>
          <Tab.Screen name="liste des recettes" component={RecipesScreen} />
          <Tab.Screen name="liste des ingrédients" component={ItemsScreen} />
          <Tab.Screen name="liste de course" component={ShoppingList} />
          <Tab.Screen name="Agenda" component={PlanningScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    alignItems: 'flex-start',
    //justifyContent: 'center',
    //top: 10
  },
});
