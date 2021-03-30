import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Share from 'react-native-share';
import { connect } from 'react-redux';

class ImageDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.image_detail !== state.data) {
			return {
				data: props.image_detail
			}
		}
		return null;
	}
	onShare = async () => {
		await Share.open(
			{
				url: this.state.data.node.image.uri,
				type: 'image/jpg'
			}
		);
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				{this.state.data !== null && <Image
					style={{
						flex: 1,
						width: "100%"
					}}
					source={{ uri: this.state.data.node.image.uri }}
				/>}
				<TouchableOpacity onPress={() => this.onShare()} style={{ bottom: 0, position: "absolute", paddingVertical: 10, backgroundColor: "#12bcdf", width: "100%", alignItems: "center" }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}> Share</Text>
				</TouchableOpacity>

			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		image_detail: state.imageReducer.image_detail
	};
}

export default connect(mapStateToProps)(ImageDetail);