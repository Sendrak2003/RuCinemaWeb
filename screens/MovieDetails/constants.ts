import { RouteProp } from "@react-navigation/native";

export interface MovieData { 
    averageRating: number; 
    contentType: string; 
    country: string; 
    currency: string; 
    description: string; 
    directors: string[]; 
    endDate: string; 
    genre: string[]; 
    id: number; 
    isFinished: boolean; 
    posterUrl: string; 
    price: number; 
    releasedEpisodes: number; 
    startDate: string; 
    tags: string[]; 
    title: string; 
    totalEpisodes: number; 
  } 
  
  export type RootStackParamList = { 
    MovieDetails: { movieId: number }; 
  };

  export type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>; 
  