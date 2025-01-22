import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  listItemContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  itemTileContent: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    width: '95%',
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  containerList: {
    paddingTop: 10,
    height: '83%',
  },
  itemcontent: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    padding: 10,
  },
  name: {
    fontSize: 16,
    paddingLeft: 30,
    paddingTop: 3,
  },
  popoverContent: {
    width: 130,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  updateQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  buttonContainer: {
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 15,
  },
  date: {
    paddingTop: 3,
    paddingLeft: 60,
    fontSize: 16,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: 30,
  },
  icone: {
    paddingTop: 3,
    color: '#900',
  },
});

export default styles;
