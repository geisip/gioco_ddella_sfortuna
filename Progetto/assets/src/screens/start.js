import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ onPlay }) {
  return (
    <View style={stileHome.container}>
      <Text style={stileHome.title}>IL GIOCO DELLA SFORTUNA</Text>
      <Text style={stileHome.subtitle}>VIDEOGIOCHI EDITION</Text>
      <Text style={stileHome.description}>
        Disponi le carte che ti vengono assegnate in ordine di sfortuna. Classifica gli eventi dal meno sfortunato al più sfortunato
      </Text>
      <TouchableOpacity style={stileHome.button} onPress={onPlay}>
        <Text style={stileHome.buttonText}>Avvia Partita</Text>
      </TouchableOpacity>
    </View>
  );
}

const stileHome = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#1a1a2e' },
 title: {
  fontSize: 38,
  fontWeight: '900',
  textAlign: 'center',
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: 2,
  textShadowColor: '#7c3aed',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 18,
}, 
subtitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#b794f6',
  letterSpacing: 3,
  marginTop: -8,
  marginBottom: 20,
},

description: {
  fontSize: 12,
  fontWeight: '800',
  color: 'white',
  letterSpacing: 1,
  marginBottom: 20,
},

  button: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, backgroundColor: '#7c3aed' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },


});