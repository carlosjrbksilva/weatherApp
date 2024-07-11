/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  fetchWeather: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, fetchWeather }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar" onPress={fetchWeather} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#fff', // fundo branco
  },
});

export default SearchBar;
