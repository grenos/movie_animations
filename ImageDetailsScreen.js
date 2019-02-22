import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, ScrollView, Image, StyleSheet, ImageBackground, SafeAreaView, Animated, Platform } from 'react-native';
// import {styles} from 'styles.js';
import { FluidNavigator, Transition, } from 'react-navigation-fluid-transitions';
import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const _WW = Dimensions.get('window').width;
const _WH = Dimensions.get('window').height;

const HEADER_MAX_HEIGHT = hp('50%');
const HEADER_MIN_HEIGHT = hp('20%');
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


class ImageDetailsScreen extends React.Component {
	constructor(props) {
  super(props);

  this.state = {
    scrollY: new Animated.Value(0),
  };
}

	_renderScrollViewContent() {
		 const data = Array.from({length: 30});
	return (
		<View style={styles.scrollViewContent}>
			 {data.map((_, i) =>
				 <View key={i} style={styles.row}>
					 <Text style={{color: '#fff'}}>{i}</Text>
				 </View>
			 )}
				<Button title="Back" onPress={() => this.props.navigation.goBack()} />
		 </View>
	);
}

  render() {

	const headerTranslate = this.state.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [0, -HEADER_SCROLL_DISTANCE],
		extrapolate: 'clamp',
	});

	const imageTranslateY = this.state.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [0, hp('18%')],
		extrapolate: 'clamp',
	});

	const imageTranslateX = this.state.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [0, -wp('30%')],
		extrapolate: 'clamp',
	});

	const imageScale = this.state.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [1, 0.4],
		extrapolate: 'clamp',
	});

	const titleScale = this.state.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		outputRange: [1, 1, 0.8],
		extrapolate: 'clamp',
	});
	const titleTranslate = this.state.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		outputRange: [0, 0, -8],
		extrapolate: 'clamp',
	});

    const { navigation } = this.props;
    const uri = navigation.getParam('url', '');
    return (
      <View style={styles.container}>
        <Transition appear='top'>
          <View style={styles.header}>
						<Text style={styles.headerText}></Text>
          </View>
				</Transition>

        <Animated.View style={[
					styles.imageContainer,
					{
						transform: [{ translateY: headerTranslate }]
					},
				]}
				>
					<Transition appear='top'>
						<ImageBackground style={[styles.imgBG, styles.imageContainer]} blurRadius={6} source={{ uri }} >
							<View style={styles.overlay}></View>
						</ImageBackground>
					</Transition>

						<Transition shared={uri}>
							<Animated.Image
							style={[
								styles.detailsImage,
								{
									transform:
									[
										{ translateX: imageTranslateX },
										{ translateY: imageTranslateY },
										{ scale: imageScale }
									],
									// transform: [{ translateY: imageTranslateY }],
									// transform: [{ scale: imageScale }],
								},
							]}
							source={{ uri }} />
						</Transition>
				</Animated.View>

        <Transition appear='bottom'>
          <Animated.ScrollView style={styles.detailsView}
					contentContainerStyle={styles.scrollViewContent}
					scrollEventThrottle={16}
					onScroll={Animated.event(
	      		[{
							nativeEvent: {contentOffset: {y: this.state.scrollY}}
						}]
				)}
				>
					  {this._renderScrollViewContent()}
					</Animated.ScrollView>
        </Transition>
      </View>
    );
  }
}



export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	header: {
		height: 113,
		width: '100%',
		position: 'absolute',
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 54,
		color: '#fff',

	},
	imageContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: HEADER_MAX_HEIGHT,
	},
	imgBG:{
		width: wp('100%'),
		height: HEADER_MAX_HEIGHT,
		zIndex: -1,
	},
	overlay:{
		backgroundColor: 'rgba(0, 0, 0, .3)',
		width: _WW,
		height: HEADER_MAX_HEIGHT,
		zIndex: -1,

	},
  detailsImage: {
		width: wp('70%'),
    height: hp('50%'),
		zIndex: 1,
		position: 'absolute',
		top: '30%',
		borderRadius: 15,
  },
  detailsView: {
    padding: 10,
    backgroundColor: '#000',
    flex: 1,
		zIndex: -2,
  },
	scrollViewContent:{
		paddingTop: hp('35%'),
		zIndex: -2,

	},
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
	row:{
		margin: 20
	}
});


export default withNavigation(ImageDetailsScreen)
