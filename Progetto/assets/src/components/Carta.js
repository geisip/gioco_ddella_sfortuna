
import { StyleSheet, Text, View, Image} from 'react-native';



const Carta = ({ nome, urlImmagine, indice, visibilitaIndice }) =>{

let indiceVisualizzato = null;
if (visibilitaIndice === true) {
  indiceVisualizzato = <Text style={stile.index}>{indice}</Text>;
}


return(

  <View style = {stile.carta}>
  
    <Image
              source={{ uri:urlImmagine }}
              style={stile.immagine}
            />

    <Text style={stile.nome}>   {nome}   </Text>

      {indiceVisualizzato}
  </View>
)
}

export default Carta;
const stile= StyleSheet.create ({

carta:{

      backgroundColor: '#ffffff',
    borderRadius: 46,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,

},

immagine:{
height:100,
width:100,
borderRadius:5,
  resizeMode: 'cover',

},

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 6,
  },

  index: {
    fontSize: 18,
    color: 'red',
    fontWeight: '700',
    marginBottom: 12,
  },

})