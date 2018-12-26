import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList, ScrollView } from 'react-native';
import { Container, Header, Content } from 'native-base';
import WeatherTable from './components/WeatherTable';

const Dimensions = require('Dimensions');

const window = Dimensions.get('window');

export default class App extends React.Component {
	state = {
		city: '',
		weatherData: '',
		isClicked: false,
	};

	async handlePress() {
		console.log('handlePress');
		try {
			let response = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${
					this.state.city
				}&appid=1635890035cbba097fd5c26c8ea672a1`
			);
			let responseJson = await response.json();
			if (responseJson.cod === '200') {
				const responseJsonDatesList = await responseJson.list.map(item => {
					return (item.dt_txt = item.dt_txt.substr(0, 10));
				});
				console.log('responseJsonDatesList', responseJsonDatesList);
				const distinctDates = [...new Set(responseJsonDatesList)];
				console.log('distinctDates', distinctDates);
				let uniqueWeatherDates = [];
				await distinctDates.forEach(date => {
					uniqueWeatherDates.push(
						responseJson.list.filter(resList => resList.dt_txt.substr(0, 10) == date)[0]
					);
				});
				console.log('uniqueWeatherDates', uniqueWeatherDates);
				await this.setState({ uniqueWeatherDates });
			}
			await this.setState({
				weatherData: responseJson,
				isClicked: true,
				city: '',
			});
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		return (
			<Container>
				<View style={styles.container}>
					<Text
						style={{
							textAlign: 'center',
							color: 'orange',
							fontSize: 30,
						}}
					>
						Weather in your city
					</Text>
					<TextInput
						style={{
							height: 40,
							borderColor: 'orange',
							borderWidth: 1,
							borderRadius: 5,
							width: window.width - 60,
						}}
						onChangeText={text => this.setState({ city: text })}
						value={this.state.city}
					/>
					<View
						style={{
							backgroundColor: 'orange',
							marginBottom: 30,
							marginTop: 30,
							borderRadius: 5,
						}}
					>
						<Button onPress={this.handlePress.bind(this)} title="Search" color="orange">
							Search
						</Button>
					</View>
					<ScrollView>
						<View
							style={{
								marginBottom: 200,
								marginTop: 30,
								width: window.width - 100,
							}}
						>
							{this.state.weatherData.cod === '200' ? (
								<FlatList
									data={this.state.uniqueWeatherDates.slice(0, 5)}
									renderItem={({ item }) => <WeatherTable data={item} />}
								/>
							) : (
								<View />
							)}
							{this.state.weatherData.cod === '404' ? (
								<View>
									<Text style={{ textAlign: 'center' }}>Not Found!!! Please change your city.</Text>
								</View>
							) : (
								<View />
							)}
						</View>
					</ScrollView>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 40,
	},
});
