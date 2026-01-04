
export type MoodType = 'work' | 'date' | 'quick_bite' | 'budget' | 'hidden_gem' | 'outdoor';

export interface Mood {
  id: MoodType;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface PlaceRecommendation {
  name: string;
  description: string;
  rating?: string;
  address?: string;
  url?: string;
}

export interface AppState {
  location: Location | null;
  mood: MoodType | null;
  recommendations: PlaceRecommendation[];
  isLoading: boolean;
  error: string | null;
}
