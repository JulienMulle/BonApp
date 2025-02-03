import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ItemsScreen from '../screen/ItemsScreen';
import PlanningScreen from '../screen/PlanningScreen';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShoppingStack from './ShoppingStack';
import RecipesStack from './RecipeStack';

const Tab = createBottomTabNavigator();

export default class MainNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'default-icon';
            let badgeCount = 0;
            switch (route.name) {
              case 'recettes':
                iconName = focused ? 'book' : 'book';
                break;
              case 'ingrédients':
                iconName = focused ? 'list-ul' : 'list-ul';
                break;
              case 'liste de course':
                iconName = focused ? 'shopping-cart' : 'shopping-cart';
                badgeCount = 3;
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
            ...styles.shadow,
          },
        })}>
        <Tab.Screen name="recettes" component={RecipesStack} key="recipe" />
        <Tab.Screen name="ingrédients" component={ItemsScreen} key="item" />
        <Tab.Screen
          name="liste de course"
          component={ShoppingStack}
          key="shopping"
        />
        <Tab.Screen name="Agenda" component={PlanningScreen} key="planning" />
      </Tab.Navigator>
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
