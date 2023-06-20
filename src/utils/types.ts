export interface Participant {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  region: string;
  area: string;
  sfcRole: string;
  coupleCoordinators: string;
  origin: string;
  arrivalDateTime: string;
  destination: string;
  departureDateTime: string;
  accommodationNeeded: boolean | string;
  fieldOfWork: string;
  shirtSize: string;
  allergies: string;
  emergencyContact: string;
  mediaConsent: boolean;
}

export interface ParticipantsState {
  data: Participant[];
  isLoading: boolean;
  error: string | null;
}

export interface FilterCriteria {
  region: string[];
  area: string[];
  sfcRole: string[];
}

export interface FAQ {
  question: string;
  answers: string[];
}

export interface InformationProps {
  title: string;
  body?: string[];
  image?: string;
  faqContents?: FAQ[];
}

export interface RegionStats {
  region: string;
  count: number;
}

export interface NavigationInfo {
  href: string;
  name: string;
}
