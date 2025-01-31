import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import useSWR from 'swr'; 
import axios from 'axios';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { Movie, RootStackParamList } from './types';
import ErrorAlert from '../../componets/ErrorAlert';
import Loading from '../../componets/Loading';
import StarRatingDisplay from '../../componets/StarRatingDisplay';
import Genres from '../../componets/Genres';

const MovieList = () => {
  const navigation: NavigationProp<RootStackParamList, 'ShowAllMovies'> = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const itemsPerPage = 3;

  const route: RouteProp<RootStackParamList, 'ShowAllMovies'> = useRoute();
  const contentTypeName = route.params.contentTypeName;

  // SWR fetcher function
  const fetcher = async (uri: string) => {
    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error) {
      setErrorModalVisible(true);
      throw error; 
    }
  };
  
  const { data: movieData, error } = useSWR(
    `http://rucinema34-001-site1.gtempurl.com/api/Movies/ShortInfoMovie/${contentTypeName}`,
    fetcher
  );

  useEffect(() => {
    if (movieData) {
      setTotalPages(Math.ceil(movieData.length / itemsPerPage));
    }
  }, [movieData]);

  useEffect(() => {
    setIsNextDisabled(currentPage >= totalPages);
    setIsPreviousDisabled(currentPage <= 1);
  }, [currentPage, totalPages]);

  if (error) {
    return (
      <ErrorAlert
        isVisible={errorModalVisible}
        errorMessage={"Ошибка получения данных..."}
        onClose={() => setErrorModalVisible(false)} 
      />
    );
  }

  if (!movieData) {
    return <Loading />;
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
    >
      <Image source={{ uri: item.posterUrl }} style={styles.poster} />
      <Text style={styles.titleContainer}>{item.title} ({item.startDate.substring(0, 4) + "-" + item.endDate.substring(0, 4)})</Text>
      <StarRatingDisplay rating={item.averageRating} />
      <Genres genres={item.genre} />
    </TouchableOpacity>
  );

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movieData.slice(startIndex, endIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList  
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}
        data={getCurrentPageData()}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.paginationContainer}>
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => {
              if (!isPreviousDisabled) {
                setCurrentPage(currentPage - 1);
              }
            }}
            style={
              isPreviousDisabled
                ? { ...styles.pageButton, ...styles.buttonDisabled }
                : styles.pageButton
            }
            disabled={isPreviousDisabled}
          >
            <Text style={styles.pageButtonText}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.currentPage}>{currentPage}</Text>
          <TouchableOpacity
            onPress={() => {
              if (!isNextDisabled) {
                setCurrentPage(currentPage + 1);
              }
            }}
            style={
              isNextDisabled
                ? { ...styles.pageButton, ...styles.buttonDisabled }
                : styles.pageButton
            }
            disabled={isNextDisabled}
          >
            <Text style={styles.pageButtonText}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MovieList;
