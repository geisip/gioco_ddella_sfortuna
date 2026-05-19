
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:"center",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor:"green",
       marginHorizontal: 8,
       
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});