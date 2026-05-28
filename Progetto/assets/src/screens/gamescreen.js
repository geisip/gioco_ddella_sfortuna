import carte from '../data/card';
import { selezionaCarteCasuali, posizioneCorretta, controllaFinePartita } from '../utils/gameLogic';
import Carta from '../components/Carta';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function GameScreen({ onFine }) {
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
        if (carte[i] === nuovaMano[j]) trovata = true;
      }
      if (trovata === false) rimanenti.push(carte[i]);
    }
    const nuovaCartaCorrente = selezionaCarteCasuali(rimanenti, 1)[0];
    setMano(nuovaMano);
    setCartaCorrente(nuovaCartaCorrente);
    setCarteUsate([...nuovaMano, nuovaCartaCorrente]);
  }

  function gestisciScelta(posizione) {
    const manoOrdinata = [...mano].sort((a, b) => a.indice - b.indice);
    const corretta = posizioneCorretta(manoOrdinata, cartaCorrente, posizione);
    let nuoveCorrette = mano.length;
    let nuoviErrori = errori;

    if (corretta === true) {
      nuoveCorrette = mano.length + 1;
      setMano([...mano, cartaCorrente]);
    } else {
      nuoviErrori = errori + 1;
      setErrori(nuoviErrori);
    }

    if (corretta === true) {
      setMessaggioRound('Corretto! 🎉');
    } else {
      setMessaggioRound('Sbagliato! ❌');
    }

    const stato = { corrette: nuoveCorrette, errori: nuoviErrori };
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
          if (carte[i] === carteUsate[j]) usata = true;
        }
        if (usata === false) rimanenti.push(carte[i]);
      }
      const nuovaCarta = selezionaCarteCasuali(rimanenti, 1)[0];
      setCartaCorrente(nuovaCarta);
      setCarteUsate([...carteUsate, nuovaCarta]);
    }
  }

  let vite = [];
  for (let i = 0; i < 3; i++) {
    vite.push(i < errori ? '🤍' : '❤️');
  }

  const manoOrdinata = [...mano].sort((a, b) => a.indice - b.indice);

let elementiMano = [];
for (let i = 0; i < manoOrdinata.length; i++) {

  elementiMano.push(
    <TouchableOpacity key={'btn' + i} style={stileGame.button} onPress={() => gestisciScelta(i)}>
      <Text style={stileGame.buttonText}>Posizione {i + 1}</Text>
    </TouchableOpacity>
  );
 
  elementiMano.push(
    <Carta
      key={'carta' + i}
      nome={manoOrdinata[i].nome}
      urlImmagine={manoOrdinata[i].urlImmagine}
      indice={manoOrdinata[i].indice}
      visibilitaIndice={true}
    />
  );
}

elementiMano.push(
  <TouchableOpacity key={'btn' + manoOrdinata.length} style={stileGame.button} onPress={() => gestisciScelta(manoOrdinata.length)}>
    <Text style={stileGame.buttonText}>Posizione {manoOrdinata.length + 1}</Text>
  </TouchableOpacity>
);

  if (messaggioRound !== null) {
    return (
      <View style={stileGame.container}>
        <Text style={stileGame.messaggio}>{messaggioRound}</Text>
        <TouchableOpacity style={stileGame.button} onPress={() => setMessaggioRound(null)}>
          <Text style={stileGame.buttonText}>Continua</Text>
        </TouchableOpacity>
      </View>
    );
  }


 return (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          {vite.map((cuore, index) => (
            <Text key={index} style={{ fontSize: 28 }}>{cuore}</Text>
          ))}
        </View>

        {cartaCorrente && (
          <Text style={stileGame.nomeCarta}>{cartaCorrente.nome}</Text>
        )}

        {cartaCorrente && (
          <Image
            source={{ uri: cartaCorrente.urlImmagine }}
            style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 16 }}
          />
        )}

        <View style={{ width: '100%' }}>
          {elementiMano}
        </View>

      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>

  );
}

const stileGame = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 24, backgroundColor: 'white' },
  messaggio: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  button: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, backgroundColor: 'green', marginVertical: 6 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});