import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import {styles} from 'styles.js';
import chunk from 'lodash.chunk';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import FastImage from 'react-native-fast-image'


export default class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this._colCount = 1;
    const { width: windowWidth } = Dimensions.get('window');
    // this._margin = 0;
    // this._photoSize = (windowWidth - this._margin * this._colCount * 2) / this._colCount;
    this.state = { chunkedImages: chunk(props.images, this._colCount) };
  }

  _colCount

  _photoSize

  _margin

  _chunkedImages

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, chunkedImages: chunk(nextProps.images, this._colCount) });
  }

  render() {
    return (
      <FlatList
        data={this.state.chunkedImages}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem.bind(this)}
      />);
  }

  keyExtractor(item, index) {
    return `key_${index}`;
  }

  renderItem(item) {
    return (
			// <Transition disappear='bottom'>
	      <View style={styles.row}>
		      {item.item.map(this.renderCell.bind(this))}
	      </View>
			// </Transition>

    );
  }

  renderCell(image) {
    return (
      <TouchableOpacity onPress={() => this.props.imageSelected(image)} key={image.url}>
        <View style={styles.cell}>
          <Transition shared={image.url}>
            <FastImage
              resizeMode="cover"
              source={{ uri: image.url }}
              style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width * 1.5, }}
            />
          </Transition>
        </View>
      </TouchableOpacity>
    );
  }
}
