import FridayImageMobile from "@/assets/schedule/landscape1.webp";
import FridayImageDesktop from "@/assets/schedule/firstDay.webp";
import SaturdayImageMobile from "@/assets/schedule/landscape2.webp";
import SaturdayImageDesktop from "@/assets/schedule/secondDay.webp";
import SundayImageMobile from "@/assets/schedule/landscape3.webp";
import SundayImageDesktop from "@/assets/schedule/thirdDay.webp";

export const REGIONS = [
  {
    text: "Atlantic (QC, NB, NL, NS, PEI)",
    value: "Atlantic (QC, NB, NL, NS, PEI)",
  },
  { text: "Capital (ON)", value: "Capital (ON)" },
  { text: "Central (MB, SK, NU)", value: "Central (MB, SK, NU)" },
  { text: "Mountain (AB, NWT)", value: "Mountain (AB, NWT)" },
  { text: "Pacific (BC, YT)", value: "Pacific (BC, YT)" },
  { text: "United States of America", value: "United States of America" },
  { text: "International", value: "International" },
  { text: "I am not SFC", value: "SFC+" },
];

export const AREALIST = [
  ["Montreal", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia"],
  [
    "Greater Toronto East",
    "Greater Toronto West",
    "Hamilton-St. Catharines",
    "Ottawa",
  ],
  ["Regina", "Saskatoon", "Winnipeg"],
  ["Calgary", "Edmonton", "Fort McMurray"],
  ["Greater Vancouver North", "Greater Vancouver South", "Victoria"],
  ["International."],
];

export const MEMBERSHIP_ROLE = [
  "Member",
  "Household Head",
  "Chapter Head",
  "Unit Head",
  "Missionary",
  "Advocacy/Program Coordinator",
  "Couple Coordinators",
  "Support Couple Coordinators",
];

export const ACCOMMODATION_NEEDS = ["Yes", "No"];

export const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const TABLE_HEADERS = [
  "#",
  "First Name",
  "Last Name",
  "Phone",
  "Email",
  "Region",
  "Area",
  "SFC Role",
  "Couple Coordinators",
  "Arrival Details",
  "Departure Details",
  "Needs accommodation",
  "Field of Work",
  "Shirt Size",
  "Allergies",
  "Emergency Contact",
  "Media Consent",
];

const FRIDAY_SCHEDULE = {
  date: "Friday, August 11",
  timetable: [
    {
      time: "7:30 PM",
      detail: "Open Doors/Gathering",
    },
    {
      time: "7:40 PM",
      detail: "Opening Worship",
    },
    {
      time: "8:10 PM",
      detail: "Opening Remarks",
    },
    {
      time: "8:40 PM",
      detail: "Session 1",
    },
    {
      time: "9:40 PM",
      detail: "Closing Praise",
    },
    {
      time: "10:00 PM",
      detail: "End of Day 1: Announcements & Transportation back to Seneca",
    },
  ],
  imageDetails: {
    imageMobile: FridayImageMobile,
    imageDesktop: FridayImageDesktop,
    alt: "Friday schedule",
  },
};

const SATURDAY_SCHEDULE = {
  date: "Saturday, August 12",
  timetable: [
    {
      time: "6:00 AM",
      detail: "Breakfast at Seneca",
    },
    {
      time: "7:00 AM",
      detail: "Transportation to Novotel",
    },
    {
      time: "8:10 AM",
      detail: "Holy Rosary",
    },
    {
      time: "8:30 AM",
      detail: "Holy Mass",
    },
    {
      time: "9:45 AM",
      detail: "Opening Worship",
    },
    {
      time: "10:10 AM",
      detail: "Session 2",
    },
    {
      time: "11:25 AM",
      detail: "Lunch",
    },
    {
      time: "1:00 PM",
      detail: "Gathering Song",
    },
    {
      time: "1:05 PM",
      detail: "Session 3",
    },
    {
      time: "2:25 PM",
      detail: "Closing Worship",
    },
    {
      time: "2:50 PM",
      detail: "Vocation Expo",
    },
    {
      time: "6:55 PM",
      detail: "Closing Prayer",
    },
    {
      time: "7:00 PM",
      detail: "Dinner",
    },
    {
      time: "8:30 PM",
      detail: "Fellowship",
    },
    {
      time: "11:00 PM",
      detail: "End of Day 2: Announcements & Transportation back to Seneca",
    },
  ],
  imageDetails: {
    imageMobile: SaturdayImageMobile,
    imageDesktop: SaturdayImageDesktop,
    alt: "Saturday schedule",
  },
};

const SUNDAY_SCHEDULE = {
  date: "Sunday, August 13",
  timetable: [
    {
      time: "6:00 AM",
      detail: "Transportation to Novotel",
    },
    {
      time: "7:00 AM",
      detail: "Breakfast",
    },
    {
      time: "8:20 AM",
      detail: "Opening Worship",
    },
    {
      time: "8:50 AM",
      detail: "Session 4",
    },
    {
      time: "9:50 AM",
      detail: "Praisefest",
    },
    {
      time: "10:45 AM",
      detail: "Holy Mass",
    },
    {
      time: "11:45 AM",
      detail: "Group picture, Closing, & Announcements",
    },
    {
      time: "1:00 PM",
      detail: "Home Sweet Home",
    },
  ],
  imageDetails: {
    imageMobile: SundayImageMobile,
    imageDesktop: SundayImageDesktop,
    alt: "Sunday schedule",
  },
};

export const PROGRAM_SCHEDULE = [
  FRIDAY_SCHEDULE,
  SATURDAY_SCHEDULE,
  SUNDAY_SCHEDULE,
];
