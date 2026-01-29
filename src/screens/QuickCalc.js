import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function QuickCalc() {
  const { t } = useTranslation();
  
  const [miles, setMiles] = useState('');
  const [speed, setSpeed] = useState('');

  const getResults = () => {
    const m = parseFloat(miles);
    const s = parseFloat(speed);

    if (m > 0 && s > 0) {
      const totalHours = m / s;
      
      // 1. Računanje trajanja (dani, sati, minuti)
      const days = Math.floor(totalHours / 24);
      const hours = Math.floor(totalHours % 24);
      const minutes = Math.round((totalHours - Math.floor(totalHours)) * 60);
      const voyageTime = `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m`;

      // 2. Računanje vremena dolaska (Trenutno vrijeme + trajanje)
      const now = new Date();
      const arrivalDate = new Date(now.getTime() + totalHours * 60 * 60 * 1000);
      const etaTime = arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const etaDate = arrivalDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' });

      return { voyageTime, etaTime, etaDate };
    }
    return null;
  };

  const results = getResults();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('quick')}</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('distance')}</Text>
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            placeholder="120"
            value={miles}
            onChangeText={setMiles}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('speed')}</Text>
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            placeholder="12"
            value={speed}
            onChangeText={setSpeed}
          />
        </View>

        <View style={styles.resultContainer}>
          {results ? (
            <>
              <Text style={styles.resultLabel}>{t('travel_time')}:</Text>
              <Text style={styles.resultText}>{results.voyageTime}</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.resultLabel}>{t('current_eta')}:</Text>
              <Text style={styles.etaText}>{results.etaDate} @ {results.etaTime}</Text>
            </>
          ) : (
            <Text style={styles.resultText}>0h 0m</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', fontSize: 18, color: '#000' },
  resultContainer: { marginTop: 40, alignItems: 'center', backgroundColor: '#007AFF', padding: 20, borderRadius: 15 },
  resultLabel: { color: '#fff', fontSize: 14, opacity: 0.9, textTransform: 'uppercase' },
  resultText: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  etaText: { color: '#fff', fontSize: 22, fontWeight: '600' },
  divider: { width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: 15 }
});