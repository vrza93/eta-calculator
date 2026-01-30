import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "quick": "Quick Calc",
      "advanced": "Voyage Plan",
      "distance": "Distance (NM)",
      "speed": "Speed (kn)",
      "arrival_eta": "Arrival ETA",
      "departure": "Departure",
      "result": "Result",
      "calculate_speed": "Required Speed",
      "advanced_plan": "Voyage Plan with Time Zones",
      "dep_tz": "Departure (UTC)",
      "arr_tz": "Arrival (UTC)",
      "arrival_time_label": "Arrival Date/Time",
      "fill_fields": "Fill Miles & Speed OR Miles & Arrival",
      "OR": "OR",
      "select_target_arrival": "Select Target Arrival",
      "clear_all": "Clear All",
      "travel_time": "Travel Time",
      "current_eta": "Current ETA"
    }
  },
  me: {
    translation: {
      "quick": "Brzo Računanje",
      "advanced": "Plan Plovidbe",
      "distance": "Udaljenost (NM)",
      "speed": "Brzina (čv)",
      "arrival_eta": "Vrijeme dolaska",
      "departure": "Polazak",
      "result": "Rezultat",
      "calculate_speed": "Potrebna brzina",
      "advanced_plan": "Plan plovidbe sa vremenskim zonama",
      "dep_tz": "Zona polaska (UTC)",
      "arr_tz": "Zona dolaska (UTC)",
      "arrival_time_label": "Datum i vrijeme dolaska",
      "fill_fields": "Unesite milje i brzinu ILI milje i dolazak",
      "OR": "ILI",
      "select_target_arrival": "Izaberite željeno vrijeme dolaska",
      "clear_all": "Očisti sve",
      "travel_time": "Vrijeme putovanja",
      "current_eta": "Trenutni ETA"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // početni jezik
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;