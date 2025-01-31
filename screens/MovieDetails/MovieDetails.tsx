import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, ImageBackground } from 'react-native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import useSWR from 'swr';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { RootStackParamList, MovieData, MovieDetailsRouteProp } from './constants'; 
import ErrorAlert from '../../componets/ErrorAlert';
import Loading from '../../componets/Loading';
import AwardsCard from '../../componets/AwardsCard';
import EpisodePanel from '../../componets/EpisodePanel';
import StarRatingDisplay from '../../componets/StarRatingDisplay';
import ActorsList from '../../componets/RoleActorPenel';
import ReviewsList from '../../componets/ReviewsList';
const MovieDetails = () => { 
  const navigation: NavigationProp<RootStackParamList, 'MovieDetails'> = useNavigation(); 
  const [showMore, setShowMore] = useState(false); 
  const route: MovieDetailsRouteProp = useRoute(); 
  const id = route.params.movieId; 
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false); 
  const [isAsyncStorageEmpty, setIsAsyncStorageEmpty] = useState(true); 

  useEffect(() => {
    const checkAsyncStorage = async () => {
      const data = await AsyncStorage.getItem('userToken');
      setIsAsyncStorageEmpty(!data);
    };

    checkAsyncStorage();
  }, []);
   
  // SWR fetcher function 
  const fetcher = async (uri: string): Promise<MovieData> => { 
    try { 
      const response = await axios.get(uri); 
      console.log(response.data) 
      return response.data; 
    } catch (error) { 
      setErrorModalVisible(true); 
      throw error; 
    } 
  }; 
 
  const { data: movieData, error } = useSWR<MovieData>( 
    `http://rucinema34-001-site1.gtempurl.com/api/Movies/${id}`,
    fetcher 
  ); 
 
  if (error) { 
    return ( 
      <ErrorAlert 
      isVisible={errorModalVisible} 
      errorMessage={"Ошибка при загрузке сведений о фильме.."} 
      onClose={() => setErrorModalVisible(false)}  
      /> 
    ); 
  } 
  if (!movieData) return <Loading/>; 
 
  return ( 
    <ScrollView style={{ flex: 1 }}> 
      <View style={styles.container}> 
        <Image 
          source={{ uri: movieData.posterUrl }} 
          style={styles.backgroundImage} 
          resizeMode="cover" 
        /> 
        <View style={styles.iconContainer}> 
          <TouchableOpacity onPress={navigation.goBack}> 
            <View style={styles.iconButton}> 
              <ChevronLeftIcon size={30} strokeWidth={2} color="white" /> 
            </View> 
          </TouchableOpacity> 
 
          <TouchableOpacity onPress={() => {}}> 
            <View style={styles.iconButton}> 
              <HeartIcon size={30} strokeWidth={2} color="white" /> 
            </View> 
          </TouchableOpacity> 
        </View> 
 
        <View style={styles.detailsContainer}> 
          <ImageBackground 
            style={styles.detailsBackground} 
            source={require('../../assets/images/MovieDetailsmageBackground.png')} 
          > 
            <View style={styles.detailsContent}> 
              <Text style={styles.title}> 
                {movieData.title}{' '} 
                ({movieData.startDate.substring(0, 4)} -{' '} 
                {movieData.endDate.substring(0, 4)}) 
              </Text> 
              <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
                <Text style={styles.title}>Страна: </Text> 
                <Text style={styles.additionalDetailsText}> 
                  {movieData.country} 
                </Text> 
              </View> 
              <View style={{ flexDirection: 'row', alignItems: 'center', 
                 flexWrap: 'wrap'  
               }}> 
                <Text style={styles.title}>Жанры: </Text> 
                <Text style={styles.additionalDetailsText}> 
                  {movieData.genre.join(', ')} 
                </Text> 
              </View> 
              <View style={{ flexDirection: 'row', alignItems: 'center',  
                flexWrap: 'wrap' }}> 
                <Text style={styles.title}>Режиссеры: </Text> 
                <Text
                style={styles.additionalDetailsText}> 
                {movieData.directors.join(', ')} 
              </Text> 
            </View> 
            <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
              <Text style={styles.title}>Рейтинг: </Text> 
              <StarRatingDisplay rating={movieData.averageRating} maxStars={1}
                textColor="#fafafa"
              /> 
            </View> 
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}> 
                  Описание
              </Text>  
              <Text style={styles.descriptionText}> 
                {showMore ? movieData.description : movieData.description.substring(0, 100) + '...'} 
              </Text> 
              <TouchableOpacity onPress={() => setShowMore(!showMore)}> 
                <Text style={styles.showMoreText}>{showMore ? 'Скрыть' : 'Показать больше'}</Text> 
              </TouchableOpacity> 
            </View> 
          </View> 
          {movieData && (
            <AwardsCard movieId={movieData.id}/>
          )}
          <View style={styles.playerContainer}> 
              {movieData && (
                <EpisodePanel movieId={movieData.id}/>
              )}
          </View> 

          <View style={styles.actorsContainer}>
            <Text style={styles.actorsTitle}>Актеры</Text>
            {movieData && (
              <ActorsList movieId={movieData.id} />
            )}
          </View>
          {movieData && !isAsyncStorageEmpty && (
              <View style={styles.header}>  
                <Text style={styles.headerText}>Рецензии</Text>  
                <TouchableOpacity style={styles.addButton} onPress={() => {   
                
                }}>  
                  <MaterialCommunityIcons name="plus-circle" size={24} color="white" />  
                </TouchableOpacity>  
              </View> 
            )}
            <ReviewsList movieId={movieData.id} />     
        </ImageBackground> 
      </View> 
    </View> 
  </ScrollView> 
  ); 
}

export default MovieDetails;
