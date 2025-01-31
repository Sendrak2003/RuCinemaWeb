import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import useSWR from 'swr';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HeartIcon } from "react-native-heroicons/solid";
import styles from './styles';
import { RootStackParamList, Comment, Review } from './types';

const ReviewCommentsScreen: React.FC = () => { 
  const route = useRoute<RouteProp<RootStackParamList, 'ReviewComments'>>(); 
  const { reviewId } = route.params; 

  const { data: comments } = useSWR<Comment[]>( 
    `http://rucinema34-001-site1.gtempurl.com/api/comments/review/${reviewId}`, 
    async (url: string) => { 
      const response = await axios.get(url); 
      return response.data; 
    } 
  ); 

  const { data: review } = useSWR<Review>( 
    `http://rucinema34-001-site1.gtempurl.com/api/reviews/${reviewId}`, 
    async (url: string) => { 
      const response = await axios.get(url); 
      return response.data; 
    } 
  ); 

  const renderCommentItem = ({ item }: { item: Comment }) => { 
    if (!comments) { 
      return null; 
    } 
    const parentComment = comments.find(comment => comment.commentId === item.parentCommentId); 

    return ( 
      <View style={styles.commentItem}> 
        {item.parentCommentId !== null && parentComment && ( 
          <View style={styles.replyContainer}> 
            <Text style={styles.replyText}> 
              Ответ на комментарий от {parentComment.userName}: "{parentComment.commentText}"  
            </Text> 
          </View> 
        )} 
        <View style={styles.commentHeader}> 
          <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} /> 
          <Text style={styles.userName}>{item.userName}</Text> 
        </View> 
        <Text style={styles.commentText}>{item.commentText}</Text> 
        <View style={styles.commentFooter}> 
          <View style={styles.likesContainer}> 
            <HeartIcon size={16} color="#593EFF" /> 
            <Text style={styles.likes}>{item.likes}</Text> 
          </View> 
          <Text style={styles.publicationDate}>{new Date(item.publicationDate).toLocaleDateString()}</Text> 
        </View> 
      </View> 
    ); 
  }; 

  const renderHeader = () => (
    <View style={{ padding: 10 }}>
      <View style={styles.reviewContainer}> 
        {review && ( 
          <>
            <View style={styles.reviewHeader}> 
              <Image source={{ uri: review.userPhoto }} style={styles.userPhoto} /> 
              <Text style={styles.userName}>{review.userName}</Text> 
            </View> 
            <Text style={styles.reviewText}>{review.reviewText}</Text> 
            <Text style={styles.rating}>Рейтинг: {review.rating}</Text>  
            <View style={styles.likesContainer}> 
              <HeartIcon size={16} color="#593EFF" /> 
              <Text style={styles.likes}>{review.likes}</Text> 
            </View> 
          </>
        )} 
      </View>
      <View style={styles.commentsHeader}>
        <Text style={styles.commentsTitle}>Комментарии</Text>
      </View>
    </View>
  );

  return ( 
    <FlatList  
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={comments}
      renderItem={renderCommentItem}
      keyExtractor={(item) => item.commentId.toString()}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={() => ( 
        <Text style={styles.emptyText}>Комментариев пока нет</Text> 
      )}
    /> 
  ); 
};

export default ReviewCommentsScreen;
