
import { StyleSheet, Text, View, Image} from 'react-native';


/**
**
 * @fileoverview Applicazione "Gioco della Sfortuna" - Tema Videogiochi, file per la gestione estetica delle carte
 * @author Jacopo Ricciardi
 * @description File che implementa le funzioni logiche necessarie per il funzionamento del gioco
 * @function Carta
 * @description Componente che rappresenta visivamente una singola carta
 * @param {Object} props - Props del componente
 * @param {string} props.nome - Nome dell'evento sfortunato
 * @param {string} props.urlImmagine - URL dell'immagine della carta
 * @param {number} props.indice - Indice di sfortuna della carta
 * @param {boolean} props.visibilitaIndice - Se true mostra l'indice, altrimenti lo nasconde
 * @returns {JSX.Element} Carta renderizzata
 */
export default function Carta({ nome, urlImmagine, indice, visibilitaIndice }) {
  let indiceVisualizzato = null;
  if (visibilitaIndice === true) {
    indiceVisualizzato = <Text style={stileCarta.index}>{indice}</Text>;
  }
  return (
    <View style={stileCarta.carta}>
      <Image source={{ uri: urlImmagine }} style={stileCarta.immagine} />
      <Text style={stileCarta.nome}>{nome}</Text>
      {indiceVisualizzato}
    </View>
  );
}

const stileCarta = StyleSheet.create({
  carta: { backgroundColor: '#2a2a3e', borderRadius: 16, marginHorizontal: 8, marginBottom: 12, padding: 10, elevation: 4 },
  immagine: { height: 150, width: '100%', borderRadius: 10, resizeMode: 'contain' },
  nome: { fontSize: 13, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  index: { fontSize: 14, color: '#a78bfa', fontWeight: '700' },
});