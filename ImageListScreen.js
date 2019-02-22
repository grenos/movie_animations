import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import {styles} from 'styles.js';


import ImageGrid from './ImageGrid';


export default class ImageListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const items = [];
    const size = Dimensions.get('window').width;
    const max = 39;
    const randMax = 100;
    for (let i = 0; i < max; i++) {
      let randomNumber = Math.floor((Math.random() * randMax) + 1);
      const idExists = (e) => e.id === randomNumber;
      while (items.findIndex(idExists) > -1) {
        randomNumber = Math.floor((Math.random() * randMax) + 1);
      }

      items.push({ url: `https://picsum.photos/${size}/${size}?image=${randomNumber}`, id: randomNumber });
    }
    this.setState({ ...this.state, items });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageGrid
          images={this.state.items}
          imageSelected={(image) => this.props.navigation.navigate('imageDetails', { url: image.url })}
        />
      </View>);
  }
}
