import React, { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { connect } from 'react-redux';
import { FETCH_IMAGES, IMAGE_DETAIL } from './actions/actionTypes';

class Camera extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			imageCount: 20,
			hideButton: false,
			fethcedDataLength: 20
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.images !== state.data) {
			return {
				data: props.images
			}
		}
		return null;
	}

	async componentDidMount() {
		if (Platform.OS === 'android') {
			const result = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				{
					title: 'Permission Explanation',
					message: 'ReactNativeForYou would like to access your photos!',
				},
			);
			if (result !== 'granted') {
				console.log('Access to pictures was denied');
				return;
			}
		}
		CameraRoll.getPhotos({
			first: this.state.imageCount,
			assetType: 'Photos',
		})
			.then(res => {
				this.props.dispatch({ type: FETCH_IMAGES, data: res.edges })
			})
			.catch((error) => {
				console.log(error);
			});
	}

	loadMore = () => {
		let count = this.state.imageCount + 20;
		CameraRoll.getPhotos({
			first: count,
			assetType: 'Photos',
		})
			.then(res => {
				this.props.dispatch({ type: FETCH_IMAGES, data: res.edges })
				this.setState({fethcedDataLength:res.edges.length, hideButton: res.edges.length === this.state.fethcedDataLength ? true : false });
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({ imageCount: count })
	}

	navigateNext = (item) => {
		this.props.dispatch({ type: IMAGE_DETAIL, data: item })
		this.props.navigation.navigate("Image")
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.state.data !== null &&
					<FlatList
						data={this.state.data}
						numColumns={3}
						renderItem={({ item }) =>
							<TouchableOpacity
								style={{ flex: 1 }}
								onPress={() => this.navigateNext(item)}
							>
								<Image
									style={{
										width: '100%',
										height: 150,
									}}
									source={{ uri: item.node.image.uri }}
								/>
							</TouchableOpacity>
						}
						keyExtractor={item => item.node.image.uri}
					/>}

				{this.state.hideButton === false &&
					<TouchableOpacity onPress={() => this.loadMore()} style={{ bottom: 0, position: "absolute", paddingVertical: 10, backgroundColor: "#12bcdf", width: "100%", alignItems: "center" }}>
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>Load More</Text>
					</TouchableOpacity>}
			</View>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		images: state.imageReducer.images
	};
}

export default connect(mapStateToProps)(Camera);