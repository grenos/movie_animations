
import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import styles from './styles';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import {createAppContainer} from 'react-navigation';
import FastImage from 'react-native-fast-image'

import ImageListScreen from './ImageListScreen';
import ImageDetailsScreen from './ImageDetailsScreen';



const Navigator = FluidNavigator({
  imageList: { screen: ImageListScreen },
  imageDetails: { screen: ImageDetailsScreen },
}, {
  navigationOptions: {
    gesturesEnabled: true,
  },
});



class ImageTransitions extends React.Component {
  static router = Navigator.router;

  render() {
    const { navigation } = this.props;
    return (
      <Navigator navigation={navigation} />
    );
  }
}


export default App = createAppContainer(ImageTransitions);
