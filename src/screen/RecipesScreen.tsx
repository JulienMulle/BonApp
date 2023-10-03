import React, {FC, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';

import Picture from '../assets/noImage.jpg';
import {Recipe} from '../interface/RecipeInterface';
import {getRecipes} from '../api/endpointRecipe';
const {width} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.75;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const RecipesScreen: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  const loadRecipes = async () => {
    const recipesList: Recipe[] = await getRecipes();
    console.log(recipesList);
    setRecipes(recipesList);
  };

  useEffect(() => {
    return () => {
      loadRecipes();
    };
  }, []);

  return (
    <SafeAreaView>
      <Animated.FlatList
        data={recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        //contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.image) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });
          return (
            <TouchableOpacity>
              <View style={{width: ITEM_SIZE}}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    transform: [{translateY}],
                    backgroundColor: 'white',
                    borderRadius: 34,
                  }}>
                  <Image
                    resizeMode="cover"
                    source={item.image ? item.image : Picture}
                    style={styles.posterImage}
                  />
                  <Text style={{fontSize: 15}} numberOfLines={2}>
                    {item.name}
                  </Text>
                </Animated.View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 20,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
export default RecipesScreen;
