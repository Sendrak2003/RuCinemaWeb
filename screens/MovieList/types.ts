export interface Movie {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    posterUrl: string;
    genre: string[];
    averageRating: number;
  }
  
  export type RootStackParamList = {
    ShowAllMovies: { contentTypeName: string };
    MovieDetails: { movieId: number };
  };
  