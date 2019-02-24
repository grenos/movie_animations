import React, { Component } from "react";
import {
	View,
	Text,
	Dimensions,
	Button,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	Animated,
	Platform
} from "react-native";
// import {styles} from 'styles.js';
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";
import { withNavigation } from "react-navigation";
import FastImage from "react-native-fast-image";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";

const _WW = Dimensions.get("window").width;
const _WH = Dimensions.get("window").height;

const HEADER_MAX_HEIGHT = hp("50%");
const HEADER_MIN_HEIGHT = hp("20%");
const TITLE_SMALL = hp('53%');
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ImageDetailsScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0)
		};
	}

	_renderScrollViewContent(titleScale, titleTranslate) {
		return (
			<View style={{paddingHorizontal: 20, alignItems: 'center'}}>
				<View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
						<Animated.Text style={[
									styles.title,
									{
										transform: [
											{ translateX: titleTranslate },
											{ scale: titleScale }
										]
									}
								]}>
							Fantastic
						</Animated.Text>
				</View>

				<Text style={{color: 'white', fontSize: 16}}>Lorem ipsum dolor amet pBR&B gluten-free shaman cornhole ethical. Butcher green juice blue bottle master cleanse, quinoa hashtag tofu next level microdosing raclette tbh ennui. Palo santo af hot chicken, try-hard actually mixtape lo-fi beard VHS. Pug meggings tacos bicycle rights cornhole organic chambray affogato chartreuse pork belly hammock palo santo. Chia waistcoat irony banjo roof party crucifix tousled slow-carb.</Text>
				<View style={{height: 400, backgroundColor: 'pink', zIndex: 3}}></View>
				<Button title="Back" onPress={() => this.props.navigation.goBack()} />
			</View>
		);
	}

	render() {
		const headerTranslate = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [0, -HEADER_SCROLL_DISTANCE],
			extrapolate: "clamp"
		});
		const imageTranslateY = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [0, hp("18%")],
			extrapolate: "clamp"
		});
		const imageTranslateX = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [0, -wp("30%")],
			extrapolate: "clamp"
		});
		const imageScale = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [1, 0.4],
			extrapolate: "clamp"
		});
		const titleScale = this.state.scrollY.interpolate({
			inputRange: [HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE],
			outputRange: [1, 0.6],
			extrapolate: 'clamp',
		});
		const titleTranslate = this.state.scrollY.interpolate({
			inputRange: [HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE],
			outputRange: [0, _WW - wp('85%')],
			extrapolate: 'clamp',
		});

		const { navigation } = this.props;
		const uri = navigation.getParam("url", "");
		return (
			<View style={styles.container}>
				<Transition appear="top">
					<View style={styles.header}>
						<Text style={styles.headerText} />
					</View>
				</Transition>
				<Animated.View
					style={[
						styles.imageContainer,
						{
							transform: [{ translateY: headerTranslate }]
						}
					]}
				>
					<Transition appear="top">
						<Animated.Image
							style={[styles.imgBG, styles.imageContainer]}
							blurRadius={3}
							source={{ uri }}
							resizeMode="cover"
						/>
					</Transition>

					<Transition shared={uri}>
						<Animated.Image
							style={[
								styles.detailsImage,
								{
									transform: [
										{ translateX: imageTranslateX },
										{ translateY: imageTranslateY },
										{ scale: imageScale }
									]
								}
							]}
							source={{ uri }}
						/>
					</Transition>
				</Animated.View>

				<Transition appear="bottom">
					<Animated.ScrollView
						style={styles.detailsView}
						contentContainerStyle={styles.scrollViewContent}
						scrollEventThrottle={16}
						snapToOffsets={[HEADER_MIN_HEIGHT, TITLE_SMALL]}
						snapToEnd={false}
						decelerationRate="fast"
						onScroll={Animated.event([
							{
								nativeEvent: { contentOffset: { y: this.state.scrollY } }
							}
						])}
					>
						{this._renderScrollViewContent(titleScale, titleTranslate)}
					</Animated.ScrollView>
				</Transition>
			</View>
		);
	}
}

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		height: 113,
		width: "100%",
		position: "absolute",
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 54,
		color: "#fff"
	},
	imageContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		height: HEADER_MAX_HEIGHT
	},
	imgBG: {
		width: wp("100%"),
		height: HEADER_MAX_HEIGHT,
		zIndex: -1
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, .3)",
		width: _WW,
		height: HEADER_MAX_HEIGHT,
		zIndex: -1
	},
	detailsImage: {
		width: wp("70%"),
		height: hp("50%"),
		zIndex: 1,
		position: "absolute",
		top: "30%",
		borderRadius: 15
	},
	detailsView: {
		padding: 10,
		backgroundColor: "#000",
		flex: 1,
		zIndex: -2,
	},
	scrollViewContent: {
		paddingTop: hp("70%"),
		zIndex: -2,

	},
	buttonContainer: {
		flex: 1,
		justifyContent: "flex-end"
	},
	row: {
		margin: 20
	},
	title:{
		color: 'white',
		fontSize: 40,
		paddingBottom: 50
	}
});

export default withNavigation(ImageDetailsScreen);
