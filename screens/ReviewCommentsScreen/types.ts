export interface Comment {
    commentId: number;
    parentCommentId: number | null;
    movieId: number;
    userId: string;
    likes: number;
    commentText: string;
    publicationDate: string;
    userName: string;
    userPhoto: string;
  }
  
  export interface Review {
    reviewId: number;
    movieId: number;
    userId: string;
    reviewText: string;
    rating: number;
    publicationDate: string;
    userName: string;
    userPhoto: string;
    likes: number;
  }
  
  export type RootStackParamList = {
    ReviewComments: { reviewId: number };
  };
  