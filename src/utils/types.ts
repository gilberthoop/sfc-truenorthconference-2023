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
  mediaConsent: boolean | string;
}
