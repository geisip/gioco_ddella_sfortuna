
/**
 * @fileoverview Applicazione "Gioco della Sfortuna" - Tema Videogiochi, file per la gestione della schermata finale
 * @author Jacopo Ricciardi
* @description Schermata di fine partita mostrata dopo vittoria o sconfitta.
 * Visualizza l'esito con emoji appropriate (🏆 per vittoria, 💀 per sconfitta)
 * e offre due opzioni: ricominciare una nuova partita o tornare alla schermata home.
 * @function EndScreen
 * @description Schermata di fine partita con esito e opzioni per continuare
 * @param {Object} props - Props del componente
 * @param {string} props.esito - Esito della partita ('vittoria' o 'sconfitta')
 * @param {Function} props.onRigioca - Callback per avviare una nuova partita
 * @param {Function} props.onHome - Callback per tornare alla schermata home
 * @returns {JSX.Element} Schermata di fine partita renderizzata
 */
export default function EndScreen({ esito, onRigioca, onHome }) {
  return (
    <View style={stileEnd.container}>
      <Text style={stileEnd.title}>{esito === 'vittoria' ? '🏆 Hai vinto!' : '💀 Hai perso!'}</Text>
      <View style={{ gap: 12 }}>
        <TouchableOpacity style={stileEnd.button} onPress={onRigioca}>
          <Text style={stileEnd.buttonText}>Riavvia Partita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stileEnd.button} onPress={onHome}>
          <Text style={stileEnd.buttonText}>Torna alla Home</Text>
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