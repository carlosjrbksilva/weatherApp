/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeartherDisplay';

const API_KEY = 'SUA-CHAVE';
const BASE_URL = 'https://api.hgbrasil.com/weather';

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          city_name: city,
        },
      });
      setWeather(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {weather && <WeatherDisplay weather={weather} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // cor de fundo semelhante à imagem
    padding: 16,
  },
});

export default HomeScreen;
