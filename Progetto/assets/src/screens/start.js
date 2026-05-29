
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ onPlay }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IL GIOCO DELLA SFORTUNA</Text>
       <Text style={styles.subtitle}>VIDEOGIOCHI EDITION</Text>
      <Text style={styles.description}>
      Disponi le carte che ti vengono assegnate in ordine di sfortuna. Classifica gli eventi dal meno sfortunato al più sfortunato
      </Text>

      <TouchableOpacity style={styles.button} onPress={onPlay}>
        <Text style={styles.buttonText}>Avvia Partita</Text>
      </TouchableOpacity>
    </View>
  );
}

const stileHome = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#1a1a2e' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: 'white' },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: '#a78bfa', textAlign: 'center', marginBottom: 16 },
  description: { fontSize: 16, textAlign: 'center', color: '#aaaacc', marginBottom: 24, paddingHorizontal: 16 },
  button: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, backgroundColor: '#7c3aed' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});