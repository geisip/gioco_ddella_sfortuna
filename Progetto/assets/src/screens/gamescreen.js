import carte from '../data/card';
import { selezionaCarteCasuali, posizioneCorretta, controllaFinePartita } from '../utils/gameLogic';
import Carta from '../components/Carta';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

/**
 *  @fileoverview Applicazione "Gioco della Sfortuna" - Tema Videogiochi, file per la gestione della schermata di gioco
 * @author Jacopo Ricciardi
 * @description File che implementa la funzione necessaria per la renderizzazione della schermata di gioco
 * @function GameScreen
 * @description Schermata principale di gioco che gestisce tutta la logica dei round
 * @param {Object} props - Props del componente
 * @param {Function} props.onFine - Callback chiamata quando la partita termina con l'esito
 * @returns {JSX.Element} Schermata di gioco renderizzata
 */
function GameScreen({ onFine }) {
  /** @type {[Carta[], Function]} Carte in possesso del giocatore */
  const [mano, setMano] = useState([]);
  /** @type {[number, Function]} Numero di errori commessi */
  const [errori, setErrori] = useState(0);
  /** @type {[Carta|null, Function]} Carta del round corrente */
  const [cartaCorrente, setCartaCorrente] = useState(null);
  /** @type {[Carta[], Function]} Carte già utilizzate nei round precedenti */
  const [carteUsate, setCarteUsate] = useState([]);
  /** @type {[boolean, Function]} Stato di fine partita */
  const [finePartita, setFinePartita] = useState(false);
  /** @type {[number|null, Function]} Posizione scelta dal giocatore */
  const [posizioneScelta, setPosizioneScelta] = useState(null);
  /** @type {[string|null, Function]} Messaggio da mostrare tra i round */
  const [messaggioRound, setMessaggioRound] = useState(null);
  /** @type {[number, Function]} Secondi rimanenti nel timer */
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    inizializzaPartita();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setMessaggioRound('Tempo scaduto! ⏰');
      setErrori(e => e + 1);
      const stato = { corrette: mano.length, errori: errori + 1 };
      const fine = controllaFinePartita(stato);
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
      return;
    }
    const intervallo = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearInterval(intervallo);
  }, [timer]);

  /**
   * @function inizializzaPartita
   * @description Avvia una nuova partita con 3 carte iniziali
   */
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

  /**
   * @function gestisciScelta
   * @description Gestisce la scelta del giocatore per il posizionamento della carta
   * @param {number} posizione - Posizione scelta dal giocatore
   */
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
        <TouchableOpacity
          style={stileGame.button}
          onPress={() => { setMessaggioRound(null); setTimer(30); }}>
          <Text style={stileGame.buttonText}>Continua</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: '#1a1a2e' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#1a1a2e' }}>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            {vite.map((cuore, index) => (
              <Text key={index} style={{ fontSize: 28 }}>{cuore}</Text>
            ))}
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: timer <= 10 ? 'red' : 'white', marginBottom: 16 }}>
            ⏱️ {timer}
          </Text>
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
  container: { flexGrow: 1, alignItems: 'center', padding: 24, backgroundColor: '#1a1a2e' },
  messaggio: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: 'white' },
  nomeCarta: { fontSize: 18, textAlign: 'center', marginVertical: 12, paddingHorizontal: 16, fontWeight: '600', color: 'white' },
  button: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, backgroundColor: '#7c3aed', marginVertical: 6 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});