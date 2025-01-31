export interface Movie {
    id: number;
    title: string;
    posterUrl: string;
    averageRating: number;
    genre: string[];
    startDate: string;
    endDate: string;
  }
  export interface RootStackParamList {
    Search: undefined;
    MovieDetails: { movieId: number };
  };
  