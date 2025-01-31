import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GenreProps {
  genres: string[];
}

export default function Genres({ genres }: GenreProps) {
  
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        const randomColor = getRandomColor();

        return (
          <View key={genre} style={[styles.genre, { borderColor: randomColor }]}>
            <Text style={[styles.genreText, { color: randomColor }]}>{genre}</Text>
          </View>
        );
      })}
    </View>
  );
}
//генерирует случайный шестизначный шестнадцатеричный цве
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 12, 
  }
});
