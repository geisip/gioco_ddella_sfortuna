
import { StyleSheet, Text, View, Image} from 'react-native';



function Carta({ nome, urlImmagine, indice, visibilitaIndice }) {
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
  carta: { backgroundColor: '#ffffff', borderRadius: 16, marginHorizontal: 8, marginBottom: 12, padding: 10, elevation: 4 },
   immagine: {  height: 150, width: '100%',borderRadius: 10, resizeMode: 'contain'}, 
  nome: { fontSize: 13, fontWeight: 'bold', color: 'black', marginBottom: 4 },
  index: { fontSize: 14, color: 'red', fontWeight: '700' },
});