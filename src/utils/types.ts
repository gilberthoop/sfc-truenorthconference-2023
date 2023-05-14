export interface Participant {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  region: string;
  area: string;
  sfcRole: string;
  coupleCoordinators: string;
  origin: string;
  destination: string;
  arrivalDateTime: string;
  accommodationNeeded: boolean | string;
  fieldOfWork: string;
  shirtSize: string;
  allergies: string;
  emergencyContact: string;
  mediaConsent: boolean | string;
}
