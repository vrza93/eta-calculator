import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

export default function AdvancedCalc() {
  const { t } = useTranslation();
  
  // State-ovi za inpute
  const [miles, setMiles] = useState('');
  const [speed, setSpeed] = useState('');
  const [depTZ, setDepTZ] = useState('0'); 
  const [arrTZ, setArrTZ] = useState('0');

  // State-ovi za datume i vidljivost pickera
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isArrivalPickerVisible, setArrivalPickerVisibility] = useState(false);

  // Funkcije za Departure Picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date) => {
    setDepartureDate(date);
    hideDatePicker();
  };

  // Funkcije za Arrival Picker
  const showArrivalPicker = () => setArrivalPickerVisibility(true);
  const hideArrivalPicker = () => setArrivalPickerVisibility(false);
  const handleArrivalConfirm = (date) => {
    setArrivalDate(date);
    hideArrivalPicker();
  };

  const calculateAdvancedETA = () => {
    const m = parseFloat(miles);
    const s = parseFloat(speed);
    
    // Parsiranje zona u brojeve
    const dTZ = parseFloat(depTZ) || 0;
    const aTZ = parseFloat(arrTZ) || 0;

    // Kreiranje polaznog vremena sa zonom
    const dep = DateTime.fromJSDate(departureDate).setZone(`UTC${dTZ >= 0 ? '+' : ''}${dTZ}`, { keepLocalTime: true });

    // LOGIKA 1: Ako imamo milje i brzinu -> Računamo ETA
    if (m > 0 && s > 0) {
      const travelHours = m / s;
      const arrival = dep.plus({ hours: travelHours }).setZone(`UTC${aTZ >= 0 ? '+' : ''}${aTZ}`);
      return `${arrival.toFormat('dd.MM.yyyy HH:mm')}`;
    }

    // LOGIKA 2: Ako imamo milje i željeni Arrival -> Računamo potrebnu brzinu
    if (m > 0 && arrivalDate) {
      const arr = DateTime.fromJSDate(arrivalDate).setZone(`UTC${aTZ >= 0 ? '+' : ''}${aTZ}`, { keepLocalTime: true });
      const diffInHours = arr.diff(dep, 'hours').hours;
      
      if (diffInHours > 0) {
        const requiredSpeed = (m / diffInHours).toFixed(2);
        return `${t('speed')}: ${requiredSpeed} kts`;
      }
    }

    return t('fill_fields');
  };

  // Funkcija za resetovanje polja
  const resetFields = () => {
    setMiles('');
    setSpeed('');
    setArrivalDate(null);
    setDepartureDate(new Date());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('advanced_plan')}</Text>

      {/* Input za Milje */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('distance')}</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={miles} 
          onChangeText={setMiles} 
          placeholder="0.0"
        />
      </View>

      {/* Input za Brzinu */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{t('speed')}</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={speed} 
          onChangeText={setSpeed} 
          placeholder="0.0"
        />
      </View>

      {/* Dugme za Polazak */}
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateButtonText}>
          {t('departure')}: {DateTime.fromJSDate(departureDate).toFormat('dd.MM.yyyy HH:mm')}
        </Text>
      </TouchableOpacity>

      <Text style={{textAlign: 'center', marginVertical: 5, color: '#888'}}>— {t('OR')} —</Text>
      
      {/* Dugme za Željeni Dolazak */}
      <TouchableOpacity 
        style={[styles.dateButton, {backgroundColor: arrivalDate ? '#d1e7dd' : '#e1e1e1'}]} 
        onPress={showArrivalPicker}
      >
        <Text style={styles.dateButtonText}>
          {arrivalDate 
            ? `${t('arrival_eta')}: ${DateTime.fromJSDate(arrivalDate).toFormat('dd.MM.yyyy HH:mm')}`
            : t('select_target_arrival')
          }
        </Text>
      </TouchableOpacity>

      {/* Vremenske zone jedna pored druge */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>{t('dep_tz')}</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numbers-and-punctuation" 
            placeholder="0" 
            value={depTZ}
            onChangeText={setDepTZ}
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>{t('arr_tz')}</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numbers-and-punctuation" 
            placeholder="0" 
            value={arrTZ}
            onChangeText={setArrTZ}
          />
        </View>
      </View>

      {/* Rezultat */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>{t('result')}:</Text>
        <Text style={styles.resultText}>{calculateAdvancedETA()}</Text>
      </View>

      {/* Dugme za Reset */}
      <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
        <Text style={styles.resetButtonText}>{t('clear_all')}</Text>
      </TouchableOpacity>

      {/* Modali za kalendare */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isArrivalPickerVisible}
        mode="datetime"
        onConfirm={handleArrivalConfirm}
        onCancel={hideArrivalPicker}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', paddingBottom: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 40, textAlign: 'center' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 5, height: 20, fontWeight: '600' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, color: '#000', borderColor: '#ddd' },
  dateButton: { backgroundColor: '#e1e1e1', padding: 15, borderRadius: 8, marginVertical: 10, alignItems: 'center' },
  dateButtonText: { fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  halfInput: { flex: 1, marginHorizontal: 5 },
  resultContainer: { marginTop: 10, padding: 20, backgroundColor: '#28a745', borderRadius: 12 },
  resultLabel: { color: '#fff', opacity: 0.9 },
  resultText: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  resetButton: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d9534f', // Crvena boja za "poništi"
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  resetButtonText: {
    color: '#d9534f',
    fontWeight: 'bold',
    fontSize: 16
  },
});