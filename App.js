import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { API_URL } from './util/ApiList';
export default class App extends React.Component {
  state = {
    isLoading: false,
    weatherData: {},
  };

  componentDidMount() {
    this.getWeatherData();
    // this.getCurrentDateTime();
  }

  async getWeatherData() {
    try {
      const data = await fetch(API_URL);
      const dataJSON = await data.json();
      return this.setState({ weatherData: dataJSON, isLoading: true });
    } catch (error) {
      return console.log(error);
    }
  }

  // getCurrentDateTime() {
  //   let date = new Date();
  //   let localTime = date.getTime();
  //   let localOffset = date.getTimezoneOffset() * 6000;
  //   let utc = localTime + localOffset;
  //   let bangladesh = utc + 1000 * -14400;

  //   return new Date(bangladesh);
  // }

  //(( kelvinValue - 273.15) * 9/5) + 32
  render() {
    if (this.state.isLoading) {
      return (
        <>
          <StatusBar style="light" />
          <View style={styles.container}>
            <View style={styles.countryView}>
              <View style={styles.textViewContainer}>
                <Text style={styles.countryText}>
                  {this.state.weatherData.name}
                </Text>
                <Text style={styles.text2}>
                  {this.state.weatherData.weather[0].main}
                </Text>
              </View>
              <View style={styles.textViewContainer}>
                <Text style={styles.text3}>
                  {this.state.weatherData.weather[0].description}
                </Text>
                <Text style={styles.tempText}>
                  {((this.state.weatherData.main.temp - 273.15) | 0) + '°C'}
                </Text>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      'http://openweathermap.org/img/w/' +
                      this.state.weatherData.weather[0].icon +
                      '.png',
                  }}
                />
              </View>
              <View style={styles.textViewContainer}>
                <Text style={styles.dateText}>
                  {new Date().toLocaleString() + ''}
                </Text>
                <Text style={styles.humidityText}>
                  Humidity: {this.state.weatherData.main.humidity + '%'}
                </Text>
                <Text style={styles.humidityText}>
                  Feels Like:{' '}
                  {((this.state.weatherData.main.feels_like - 273.15) | 0) +
                    '°C'}
                </Text>
                <Text style={styles.humidityText}>
                  Minimum:{' '}
                  {((this.state.weatherData.main.temp_min - 273.15) | 0) + '°C'}
                </Text>
                <Text style={styles.humidityText}>
                  Maximum:{' '}
                  {((this.state.weatherData.main.temp_max - 273.15) | 0) + '°C'}
                </Text>
              </View>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
  },
  countryView: {
    backgroundColor: '#FFD84F',
    width: '100%',
    height: '75%',
    marginTop: 50,
    borderRadius: 30,
  },
  textViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  countryText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  text2: {
    fontSize: 24,
    color: '#141212',
    marginTop: 8,
  },
  text3: {
    marginTop: 10,
    fontSize: 18,
    color: '#141212',
    textTransform: 'capitalize'
  },
  tempText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  image: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 60,
  },
  dateText: {
    marginTop: 50,
    fontSize: 14,
    color: '#141212',
    fontWeight: 'bold',
  },
  humidityText: {
    marginTop: 6,
    fontSize: 15,
    color: '#141212',
  },
});
