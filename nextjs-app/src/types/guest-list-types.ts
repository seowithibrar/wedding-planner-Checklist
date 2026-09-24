export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  rsvpStatus: string;
  mealPreference: string;
  plusOne: boolean;
  plusOneName: string;
  plusOneMeal: string;
  seatingGroup: string;
  notes: string;
}

export interface GuestCategory {
  id: string;
  label: string;
  color: string;
}

export interface MealOption {
  id: string;
  label: string;
}

export interface RSVPStatusOption {
  id: string;
  label: string;
  color: string;
}

export interface GuestListStats {
  total: number;
  accepted: number;
  declined: number;
  pending: number;
  noResponse: number;
  plusOnes: number;
  estimatedHeadcount: number;
  mealBreakdown: Record<string, number>;
}

export type SortField = 'name' | 'rsvpStatus' | 'category' | 'mealPreference' | 'seatingGroup';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterState {
  search: string;
  rsvpStatus: string;
  category: string;
  mealPreference: string;
  seatingGroup: string;
}
