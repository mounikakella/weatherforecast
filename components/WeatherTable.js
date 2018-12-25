import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
import moment from 'moment';

const window = Dimensions.get('window');

export default class WeatherTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateString: '',
			data: this.props.data,
		};
	}

	componentDidMount() {
		console.log('in component');
		console.log('props', this.state.data);
		this.setState({ data: this.props.data });
		const dateString = moment.unix(this.state.data.dt).format('DD/MM/YYYY');
		this.setState({
			dateString,
		});
	}

	render() {
		return (
			<View style={Styles.outerView}>
				<View style={Styles.dateRow}>
					<Text>Date:{this.state.dateString}</Text>
				</View>
				<View style={Styles.tempRow}>
					<Text>Temperature</Text>
				</View>
				<View style={Styles.column2Style}>
					<View style={Styles.column1Style}>
						<Text>Min</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text>Max</Text>
					</View>
				</View>
				<View style={Styles.column2Style}>
					<View style={Styles.column1Style}>
						<Text>{this.state.data.main.temp_min}</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text> {this.state.data.main.temp_max}</Text>
					</View>
				</View>
				<View style={Styles.column2Style}>
					<View style={Styles.column1Style}>
						<Text>Pressure</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text>{this.state.data.main.pressure}</Text>
					</View>
				</View>
				<View style={Styles.column2Style}>
					<View style={Styles.column1Style}>
						<Text>Humidity</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text>{this.state.data.main.humidity}</Text>
					</View>
				</View>
			</View>
		);
	}
}

export const Styles = StyleSheet.create({
	outerView: {
		backgroundColor: 'transparent',
		width: window.window - 120,
		marginBottom: 20,
	},
	dateRow: {
		backgroundColor: 'orange',
		height: 40,
		borderWidth: 1,
		borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tempRow: {
		backgroundColor: 'lightgray',
		height: 40,
		borderWidth: 1,
		borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	column1Style: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderColor: 'black',
	},
	column2Style: {
		backgroundColor: 'lightgray',
		height: 40,
		borderWidth: 1,
		borderColor: 'black',
		flexDirection: 'row',
	},
});
