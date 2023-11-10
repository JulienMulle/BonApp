import React, {FC, useEffect} from 'react';
import { Button, SafeAreaView, Text, View } from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import {selectShoppingIsActive} from '../redux/selectors/ShoppingSelector';
import ItemTile from '../components/item/ItemTile';
import { deletedAssociation, fetchAllShopping } from "../redux/actions/ShoppingActions";
import { useNavigation } from "@react-navigation/native";

const ShoppingDetailsScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const shoppingIsActive = useSelector(selectShoppingIsActive);
  const deleteAssociation = (id: number) => {
    dispatch(deletedAssociation({shoppingId: shoppingIsActive.id, itemId: id}));
  };
  const goToShoppingLists = ()=>{
    navigation.navigate('ShoppingListScreen')
  }
  useEffect(() => {
    dispatch(fetchAllShopping());
  }, [dispatch]);


  return (
    <SafeAreaView>
      <View>
        <Text>{shoppingIsActive?.title}</Text>
        <Text>{shoppingIsActive?.date}</Text>
        {shoppingIsActive?.items.map(item => (
          <ItemTile
            item={item}
            key={item.id}
            removeItem={() => deleteAssociation(item.id)}
          />
        ))}
        <Button title='liste des courses' onPress={()=>goToShoppingLists()}/>
      </View>
    </SafeAreaView>
  );
};

export default ShoppingDetailsScreen;
