import React, { useEffect, useState } from 'react';  
import {  
  View,  
  Text,  
  ScrollView,  
  Image,  
  StyleSheet,  
  TouchableOpacity,  
  TouchableHighlight  
} from 'react-native';  
import axios from 'axios';  
import useSWR from 'swr';  
import Loading from './Loading';  
import { HeartIcon } from "react-native-heroicons/solid";  
import Foundation from '@expo/vector-icons/Foundation';  
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { NavigationProp, useNavigation } from '@react-navigation/native';  
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Review {  
  reviewId: number;  
  movieId: number;  
  userId: number;  
  likes: number;  
  reviewText: string;  
  publicationDate: string;  
  userName: string;  
  userPhoto: string;  
  commentsCount: number;  
}  

type RootStackParamList = {   
  ReviewComments: { reviewId: number };   
};  

const ReviewsList = ({ movieId }: { movieId: number }) => {  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  
  const { data: reviews, error } = useSWR<Review[]>(  
    `http://rucinema34-001-site1.gtempurl.com/api/Reviews/movie/${movieId}`,  
    async (url: string): Promise<Review[]> => {  
      const response = await axios.get(url);  
      return response.data;
    }  
  );  

  const [isAsyncStorageEmpty, setIsAsyncStorageEmpty] = useState(true); 

  useEffect(() => {
    const checkAsyncStorage = async () => {
      const data = await AsyncStorage.getItem('userToken');
      setIsAsyncStorageEmpty(!data);
    };

    checkAsyncStorage();
  }, []);

  if (error) {  
    return null;  
  }  

  if (!reviews) {  
    return <Loading />;  
  }  

  if (reviews.length === 0) {  
    return (  
      <View style={styles.noReviewsContainer}>  
        <Text style={styles.noReviewsText}>Для этого фильма пока нет рецензий</Text>  
      </View>  
    );  
  }  

  return (  
    <ScrollView style={styles.container}>  
      {reviews.map((review) => (  
        <TouchableHighlight  
          key={review.reviewId}  
          style={styles.reviewItem}  
          onPress={() => {  
            navigation.navigate('ReviewComments', { reviewId: review.reviewId });  
          }}  
        >  
          <View>  
            <View style={styles.userContainer}>  
              {review.userPhoto && (  
                <Image source={{ uri: review.userPhoto }} style={styles.userImage} />  
              )}  
              <Text style={styles.userName}>{review.userName}</Text>  
            </View>  
            <Text style={styles.reviewText}>{review.reviewText}</Text>  
            <View style={styles.iconsContainer}>  
              <View style={styles.iconWrapper}>  
                <HeartIcon size={20} color="white" />  
                <Text style={styles.likesCount}>{review.likes}</Text>  
              </View>  
              <View style={styles.iconWrapper}>  
                <Foundation name="comments" size={20} color="white" />  
                <Text style={styles.commentsCount}>{review.commentsCount}</Text>
                </View>  
            </View>  
            <Text style={styles.publicationDate}>  
              {new Date(review.publicationDate).toLocaleDateString()}  
            </Text>  
          </View>  
        </TouchableHighlight>  
      ))}  
    </ScrollView>  
  );  
};  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  reviewItem: {
    padding: '5%',
    backgroundColor: "#593EFF",
    borderColor: '#fafafa',
    borderRadius: 20,
    marginVertical: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    color: 'white',
  },
  reviewText: {
    fontSize: 16,
    color: 'white',
  },
  noReviewsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: 18,
    color: '#888',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  likesCount: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  commentsCount: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  publicationDate: {
    fontSize: 12,
    color: '#fafafa',
    marginTop: 5,
    position: 'absolute',
    right: 10,
  },
});

export default ReviewsList; 
