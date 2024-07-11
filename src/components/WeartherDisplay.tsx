/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { iconMapping } from '../iconMapping';

interface Weather {
  city: string;
  temp: number;
  description: string;
  condition_slug: string;
  forecast?: { date: string; weekday: string; max: number; min: number; condition: string }[];
  hourly?: { time: string; temp: number; condition_slug: string }[];
}

interface WeatherDisplayProps {
  weather: Weather | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) return null;

  const icon = iconMapping[weather.condition_slug];

  const backgroundColor = weather.condition_slug === 'rain' ? '#00008B' : '#87CEEB';

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={styles.city}>{weather.city}</Text>
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={styles.temp}>{weather.temp}°</Text>
        <Text style={styles.description}>{weather.description}</Text>
        {weather.forecast && (
  <Text style={styles.tempMinMax}>
    Max: {weather.forecast[0]?.max}° / Min: {weather.forecast[0]?.min}°
  </Text>
)}


      </View>

      {weather.forecast && weather.forecast.length > 0 && (
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>Dia               tempo               max /min</Text>
          {weather.forecast.map((day, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.forecastText}>{day.weekday}</Text>
              {iconMapping[day.condition] && (
                <Image source={iconMapping[day.condition]} style={styles.forecastIcon} />
              )}
              <Text style={styles.tempMinMax}>{day.max}° / {day.min}° </Text>
            </View>
          ))}
        </View>
      )}

      {weather.hourly && weather.hourly.length > 0 && (
        <View style={styles.hourlyContainer}>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
          {weather.hourly.slice(0, 6).map((hourly, index) => (
            <View key={index} style={styles.hourlyItem}>
              <Text style={styles.time}>{hourly.time}</Text>
              {iconMapping[hourly.condition_slug] && (
                <Image source={iconMapping[hourly.condition_slug]} style={styles.hourlyIcon} />
              )}
              <Text style={styles.hourlyTemp}>{hourly.temp}°</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#fff',
  },
  forecastContainer: {
    marginTop: 20,
    width: '100%',
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  forecastText: {
    fontSize: 16,
    color: '#fff',
  },
  forecastIcon: {
    width: 30,
    height: 30,
  },
  hourlyContainer: {
    marginTop: 20,
    width: '100%',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-end',
  },
  hourlyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  time: {
    fontSize: 16,
    color: '#fff',
  },
  hourlyIcon: {
    width: 30,
    height: 30,
  },
  hourlyTemp: {
    fontSize: 16,
    color: '#fff',
  },
  tempMinMax: {
    fontSize: 16,
    color: '#fff',
  },
});

export default WeatherDisplay;

