
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EndScreen({ esito, onRigioca, onHome }) {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>{esito}</Text>
      <View style={{gap: 12}}>
      <TouchableOpacity style={styles.button} onPress={onRigioca}>
        <Text style={styles.buttonText}>Riavvia Partita</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.button} onPress={onHome}>
        <Text style={styles.buttonText}>Torna alla home</Text>
      </TouchableOpacity>
    </View>
    </View>
    
  );
}

const stileEnd = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#1a1a2e' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 32, color: 'white' },
  button: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, backgroundColor: '#7c3aed', marginVertical: 6 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});