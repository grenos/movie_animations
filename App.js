
import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import chunk from 'lodash.chunk';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import {createAppContainer} from 'react-navigation';
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsImage: {
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').width,
		zIndex: 30,
		position: 'absolute',
		top: '30%',
		borderRadius: 15,
  },
	imgBG:{
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width,
	},
  detailsView: {
    padding: 10,
    backgroundColor: '#000',
    flex: 1,
		zIndex: -30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    paddingBottom: 40,
		color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 2,
  },
  header: {
    height: 113,
		width: '100%',
		position: 'absolute',
		zIndex: 31,
		justifyContent: 'center',
		alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 54,
    color: '#fff',

  },
  imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').width,
		zIndex: 30,

  },
});

class ImageListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentWillMount() {
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

class ImageDetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('url', '');
    return (
      <View style={styles.container}>
        <Transition appear='top'>
          <View style={styles.header}>
						<Text style={styles.headerText}>Header</Text>
          </View>
        </Transition>
        <View style={styles.imageContainer}>
						<ImageBackground style={[styles.imgBG, styles.imageContainer]} blurRadius={7} source={{ uri }} >
							<Transition shared={uri}>
								<FastImage style={styles.detailsImage} source={{ uri }} />
							</Transition>
						</ImageBackground>
        </View>
        <Transition appear='bottom'>
          <View style={styles.detailsView}>
            <View style={styles.buttonContainer}>
              <Button title="Back" onPress={() => navigation.goBack()} />
            </View>
          </View>
        </Transition>
      </View>
    );
  }
}

class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this._colCount = 2;
    const { width: windowWidth } = Dimensions.get('window');
    this._margin = 2;
    this._photoSize = (windowWidth - this._margin * this._colCount * 2) / this._colCount;
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
            <Image
              resizeMode="cover"
              source={{ uri: image.url }}
              style={{ width: this._photoSize, height: this._photoSize }}
            />
          </Transition>
        </View>
      </TouchableOpacity>
    );
  }
}


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
