import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';

import './src/localization/i18n';
import QuickCalc from './src/screens/QuickCalc';
import AdvancedCalc from './src/screens/AdvancedCalc';

const Tab = createBottomTabNavigator();

export default function App() {
  const { i18n, t } = useTranslation();

  const openCoffeeLink = () => {
    Linking.openURL('https://ko-fi.com/vrzatech'); // Zamijeni svojim linkom
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'me' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = route.name === 'Quick' ? 'flash' : 'map';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                {/* Kafa dugme */}
                <TouchableOpacity onPress={openCoffeeLink} style={styles.coffeeButton}>
                  <Ionicons name="cafe" size={18} color="#FFDD00" />
                </TouchableOpacity>

                {/* Jezik dugme sa tekstom */}
                <TouchableOpacity onPress={toggleLanguage} style={styles.langButton}>
                  <Text style={styles.langText}>
                    {i18n.language === 'en' ? '🇲🇪 ME' : '🇺🇸 EN'}
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        >
          <Tab.Screen name="Quick" component={QuickCalc} options={{ title: t('quick') }} />
          <Tab.Screen name="Advanced" component={AdvancedCalc} options={{ title: t('advanced') }} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
  },
  coffeeButton: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    marginRight: 8,
  },
  langButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  langText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
  },
});