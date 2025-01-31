// Search.tsx
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, StatusBar, TouchableOpacity, View, Image, ImageBackground, Alert, Modal, FlatList, Text } from 'react-native';
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import axios from 'axios'; 
import useSWR from 'swr'; 
import styles from './styles';
import { Movie, RootStackParamList } from './types'; 
import StarRatingDisplay from '../../componets/StarRatingDisplay';
import Genres from '../../componets/Genres';

const Search = () => {
  const navigation: NavigationProp<RootStackParamList, 'Search'> = useNavigation();

  const [placeholder, setPlaceholder] = useState<string>('Введите название фильма');
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onChangeTextSearch = (text: string) => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(text);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  const fetcher = async (uri: string) => {
    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error; 
    }
  };

  const { data: searchResults, error, isLoading } = useSWR(
    searchQuery ? 
      searchType === 'title'
        ? `http://rucinema34-001-site1.gtempurl.com/api/Movies/Search/Title/${searchQuery}` 
        : `http://rucinema34-001-site1.gtempurl.com/api/Movies/Search/Description/${searchQuery}` 
      : null,
    fetcher,
    {
      dedupingInterval: 1000,
      revalidateOnFocus: false, 
    }
  );

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage}
        source={require("../../assets/images/searchScreen.png")}
      >
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeTextSearch}
            placeholder={placeholder}
            placeholderTextColor={"#ccc"}
          />
          <TouchableOpacity onPress={openMenu}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Фильтры</Text>
              <RadioButton.Group onValueChange={value => {
                setPlaceholder(value);
                setSearchType(value === 'Введите название фильма' ? 'title' : 'description');
                closeMenu();
              }}
                value={placeholder}
              >
                <RadioButton.Item
                  label="Искать по названию фильма"
                  value="Введите название фильма"
                  uncheckedColor={"#fafafa"}
                  color='white'
                  labelStyle={styles.radioButtonLabel}
                />
                <RadioButton.Item
                  label="Искать по описанию фильма"
                  value="Введите описание фильма"
                  uncheckedColor={"#fafafa"}
                  color='white'
                  labelStyle={styles.radioButtonLabel}
                />
              </RadioButton.Group>
            </View>
          </View>
        </Modal>

        {searchResults && searchResults.length > 0 && (
          <FlatList      
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }: { item: Movie }) => (
              <TouchableOpacity
                style={styles.movieItem}
                onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
              >
                <Image source={{ uri: item.posterUrl }} style={styles.poster} />
                <Text style={styles.titleContainer}>{item.title} ({item.startDate.substring(0, 4) + "-" + item.endDate.substring(0, 4)})</Text>
                <StarRatingDisplay rating={item.averageRating} />
                <Genres genres={item.genre} />
              </TouchableOpacity>
            )}
          />
        )}

        {isLoading && !error && (
          <View style={styles.noResultsContainer}>
            <ActivityIndicator size="large" color="#FAFAFA" />
          </View>
        )}

        {error && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>Ничего не найдено.</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Search;
