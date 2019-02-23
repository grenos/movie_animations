import { View, Text, Dimensions, Button, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.5,
  },
  detailsView: {
    padding: 10,
    backgroundColor: '#ECECEC',
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 2,
  },
  header: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FA',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
  },
  imageContainer: {
    flexDirection: 'row',
  },
});
