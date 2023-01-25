import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [city, setCity] = useState();
  const [cityName, setCityName] = useState();
  const [info, setInfo] = useState();
  const [description, setDescription] = useState();
  const [temp, setTemp] = useState();
  const [image, setImage] = useState();
  const [humidity, setHumidity] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [minTemp, setMinTemp] = useState();
  const [maxTemp, setMaxTemp] = useState();

  const getWeatherData = async () => {
    let API_KEY = '711fd04ae37d587698c7ffbf944e48dd';
    // let api_url =
    //   'https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=711fd04ae37d587698c7ffbf944e48dd';

    let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
      let kelvin = 273.15;
      let response = await fetch(api_url);
      let data = await response.json();

      let temp = (data.main.temp - kelvin) | 1;
      let city = data.name;
      let info = data.weather[0].main;
      let description = data.weather[0].description;
      let image = data.weather[0].icon;
      let humidity = data.main.humidity;
      let feelsLike = (data.main.feels_like - kelvin) | 1;
      let minTemp = (data.main.temp_min - kelvin) | 1;
      let maxTemp = (data.main.temp_max - kelvin) | 1;

      setTemp(temp);
      setCityName(city);
      setInfo(info);
      setDescription(description);
      setImage(image);
      setHumidity(humidity);
      setFeelsLike(feelsLike);
      setMinTemp(minTemp);
      setMaxTemp(maxTemp);
    } catch (error) {
      console.log(error);
    }
  };
  function findTempHandler() {
    getWeatherData();
  }
  return (
    <>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.centerItems}>
            <Text style={[styles.heading, styles.textWhite]}>
              Search Weather
            </Text>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter City Here.."
                autoCapitalize="none"
                autoComplete="off"
                value={city}
                onChangeText={(city) => setCity(city)}
              />
              <TouchableOpacity style={styles.button} onPress={findTempHandler}>
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.tempView}>
            <View style={styles.countryView}>
              <View style={styles.textViewContainer}>
                <Text style={styles.countryText}>{cityName}</Text>
                <Text style={styles.text2}>{info}</Text>
              </View>
              <View style={styles.textViewContainer}>
                <Text style={styles.text3}>{description}</Text>
                <Text style={styles.tempText}>{temp + '°C'}</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: `http://openweathermap.org/img/w/${image}.png`,
                  }}
                />
              </View>
              <View style={styles.textViewContainer}>
                <Text style={styles.dateText}>
                  {new Date().toLocaleString() + ''}
                </Text>
                <Text style={styles.humidityText}>
                  Humidity: {humidity + '%'}
                </Text>
                <Text style={styles.humidityText}>
                  Feels Like: {feelsLike + '°C'}
                </Text>
                <Text style={styles.humidityText}>
                  Minimum: {minTemp + '°C'}
                </Text>
                <Text style={styles.humidityText}>
                  Maximum: {maxTemp + '°C'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    marginTop: 40,
  },
  centerItems: {
    alignItems: 'center',
  },
  countryView: {
    backgroundColor: '#FFD84F',
    width: '100%',
    height: 550,
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
    textTransform: 'capitalize',
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
    marginTop: 100,
    fontSize: 14,
    color: '#141212',
    fontWeight: 'bold',
  },
  humidityText: {
    marginTop: 6,
    fontSize: 15,
    color: '#141212',
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputView: {
    alignItems: 'center',
    width: 250,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#b4b4b4',
    backgroundColor: '#bbbbbb',
    width: '100%',
    marginHorizontal: 15,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  tempView: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 80,
  },
  textWhite: {
    color: '#ffffff',
  },
});
