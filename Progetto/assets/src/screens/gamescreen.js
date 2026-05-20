import carte from '../data/card';
import { selezionaCarteCasuali, posizioneCorretta, controllaFinePartita } from '../utils/gameLogic';


import React, { useState, useEffect } from 'react';


export default function GameScreen({ onFine }) {
const [mano, setMano] = useState([]);
const [errori, setErrori] = useState(0);
const [cartaCorrente, setCartaCorrente] = useState(null);
const [carteUsate, setCarteUsate] = useState([]);
const [finePartita, setFinePartita] = useState(false);
const [posizioneScelta, setPosizioneScelta] = useState(null);
const [messaggioRound, setMessaggioRound] = useState(null);


useEffect(() => {
  inizializzaPartita();
}, []);

function inizializzaPartita() {
  const nuovaMano = selezionaCarteCasuali(carte, 3);
  
  const rimanenti = [];
  for (let i = 0; i < carte.length; i++) {
    let trovata = false;
    for (let j = 0; j < nuovaMano.length; j++) {
      if (carte[i] === nuovaMano[j]) {
        trovata = true;
      }
    }
    if (trovata === false) {
      rimanenti.push(carte[i]);
    }
  }

  const nuovaCartaCorrente = selezionaCarteCasuali(rimanenti, 1)[0];
  
  setMano(nuovaMano);
  setCartaCorrente(nuovaCartaCorrente);
  setCarteUsate([...nuovaMano, nuovaCartaCorrente]);
}

function gestisciScelta(posizione) {
  const corretta = posizioneCorretta(mano, cartaCorrente, posizione);
  let nuoveCorrette = mano.length;
  let nuoviErrori = errori;

  if (corretta === true) {
    nuoveCorrette = mano.length + 1;

    const nuovaMano = [...mano, cartaCorrente];
    setMano(nuovaMano);
  } else {
    nuoviErrori = errori + 1;
    setErrori(nuoviErrori);
  }

  const stato = {
    corrette: nuoveCorrette,
    errori: nuoviErrori
  };

  if (corretta === true) {
  setMessaggioRound('Corretto');
} else {
  setMessaggioRound('Sbagliato');
}




  const fine = controllaFinePartita(stato);
  setFinePartita(fine.finita);

  if (fine.finita === true) {
  onFine(fine.esito);
}

  if (fine.finita === false) {
    const rimanenti = [];

    for (let i = 0; i < carte.length; i++) {
      let usata = false;

      for (let j = 0; j < carteUsate.length; j++) {
        if (carte[i] === carteUsate[j]) {
          usata = true;
        }
      }

      if (usata === false) {
        rimanenti.push(carte[i]);
      }
    }

    const nuovaCarta = selezionaCarteCasuali(rimanenti, 1)[0];

    setCartaCorrente(nuovaCarta);
    setCarteUsate([...carteUsate, nuovaCarta]);
  }
}





if (messaggioRound !== null) {
  return (
    <View style={styles.container}>
      <Text style={styles.messaggio}>{messaggioRound}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setMessaggioRound(null)}>
        <Text style={styles.buttonText}>Continua</Text>
      </TouchableOpacity>
    </View>

  );

}

}



const styles = StyleSheet.create({
  container: { flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center', 
  padding: 24, 
  backgroundColor: 'white' },

  messaggio: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 24,
  textAlign: 'center',
},

  button:
   { paddingVertical: 14,
    paddingHorizontal: 28,
     borderRadius: 12, 
     backgroundColor: 'green',
      marginHorizontal: 8 
      },
  buttonText: 
  { color: 'white',
   fontSize: 18,
    fontWeight: '600' 
    },
});


