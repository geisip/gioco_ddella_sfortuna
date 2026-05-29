
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const carte = [
  { id: '1', nome: 'Perdi una partita online per un lag di 1 secondo', indice: 1, urlImmagine: 'https://i.imgur.com/vt8Pgar.png' },
  { id: '2', nome: 'Il tuo personaggio muore per un errore evitabile proprio sul traguardo', indice: 3, urlImmagine: 'https://i.imgur.com/V5ar7kP.png' },
  { id: '3', nome: 'Dimentichi di salvare e perdi 10 minuti di gioco', indice: 5, urlImmagine: 'https://i.imgur.com/xT1e1lA.png' },
  { id: '4', nome: 'Un compagno di squadra ti fa perdere una partita facile su Rocket League', indice: 7, urlImmagine: 'https://i.imgur.com/B9jj8AQ.png' },
  { id: '5', nome: 'Finisci le munizioni nel momento peggiore su Fortnite', indice: 9, urlImmagine: 'https://i.imgur.com/eo1Ya2j.png' },
  { id: '6', nome: 'Il gioco si aggiorna e cambia i controlli che avevi imparato', indice: 11, urlImmagine: 'https://i.imgur.com/wuuZcyR.png' },
  { id: '7', nome: 'Vieni eliminato per primo in un battle royale', indice: 13, urlImmagine: 'https://i.imgur.com/7cUdFPg.png' },
  { id: '8', nome: 'Il tuo internet cade durante una partita ranked', indice: 15, urlImmagine: 'https://i.imgur.com/Aku7VpR.png' },
  { id: '9', nome: 'Compri un DLC che si rivela deludente', indice: 17, urlImmagine: 'https://i.imgur.com/1dd98TV.png' },
  { id: '10', nome: 'Dimentichi di salvare e perdi 1 ora di gioco', indice: 19, urlImmagine: 'https://i.imgur.com/FwmrfuB.png' },
  { id: '11', nome: 'Vieni bannato per errore per 24 ore', indice: 21, urlImmagine: 'https://i.imgur.com/8MMx8O7.png' },
  { id: '12', nome: 'Rompi il controller per la frustrazione', indice: 23, urlImmagine: 'https://i.imgur.com/tZIVhbk.png' },
  { id: '13', nome: 'Perdi una partita al torneo amatoriale a causa di un bug', indice: 25, urlImmagine: 'https://i.imgur.com/Ix3cV0R.png' },
  { id: '14', nome: 'Spendi 50€ in loot box su EA Sports FC e non ottieni nessun giocatore utile', indice: 27, urlImmagine: 'https://i.imgur.com/cFhrf41.png' },
  { id: '15', nome: 'Un amico ti spoilera il finale di Red Dead Redemption 2 che stavi giocando', indice: 29, urlImmagine: 'https://i.imgur.com/Q6K1zo7.png' },
  { id: '16', nome: 'Vieni escluso da un gruppo raid per il tuo livello basso', indice: 31, urlImmagine: 'https://i.imgur.com/OVWNEc4.png' },
  { id: '17', nome: 'Il PC si spegne durante il boss finale di Kingdom Hearts', indice: 33, urlImmagine: 'https://i.imgur.com/65bn1qo.png' },
  { id: '18', nome: 'Compri un gioco a prezzo pieno e il giorno dopo va in saldo al 90%', indice: 35, urlImmagine: 'https://i.imgur.com/y3bQQCW.png' },
  { id: '19', nome: 'Il tuo compagno di squadra su EA Sports FC segna un autogol al 90°', indice: 37, urlImmagine: 'https://i.imgur.com/yAu22qU.png' },
  { id: '20', nome: 'Perdi una streak di 50 vittorie consecutive su Rocket League per una disconnessione', indice: 39, urlImmagine: 'https://i.imgur.com/xsSC8ZG.png' },
  { id: '21', nome: 'Il server del gioco chiude definitivamente e perdi tutto il progresso', indice: 41, urlImmagine: 'https://i.imgur.com/VQF9CZ2.png' },
  { id: '22', nome: 'Il gioco che aspettavi da anni esce ed è un disastro totale', indice: 43, urlImmagine: 'https://i.imgur.com/nU04o6k_d.png?maxwidth=520&shape=thumb&fidelity=high' },
  { id: '23', nome: 'Vieni derubato di tutti gli oggetti da un "amico" in un gioco online', indice: 45, urlImmagine: 'https://i.imgur.com/WNfnSLX.png' },
  { id: '24', nome: 'Scopri che il gioco ha un finale segreto ma hai già cancellato il salvataggio', indice: 47, urlImmagine: 'https://i.imgur.com/46E9uZ4.png' },
  { id: '25', nome: 'Il gioco si aggiorna e cancella tutti i tuoi salvataggi', indice: 49, urlImmagine: 'https://i.imgur.com/KrEl7Hz.png' },
  { id: '26', nome: 'La tua classifica rank viene azzerata per un errore del sistema', indice: 51, urlImmagine: 'https://i.postimg.cc/x8KBQtbf/ID-26.png' },
  { id: '27', nome: 'Perdi il tuo account da 5 anni per aver dimenticato la password', indice: 53, urlImmagine: 'https://i.postimg.cc/FFJ3V1SC/ID27-(2).png' },
  { id: '28', nome: 'Il tuo account viene hackerato e perdi tutti gli oggetti rari accumulati', indice: 55, urlImmagine: 'https://i.postimg.cc/YqKgnkN3/ID27.png' },
  { id: '29', nome: 'Investi 100€ in skin su Fortnite e il gioco chiude i server', indice: 57, urlImmagine: 'https://i.postimg.cc/pVnzJyj1/ID29.png' },
  { id: '30', nome: 'Vieni bannato ingiustamente e il supporto non risponde mai', indice: 59, urlImmagine: 'https://i.postimg.cc/7PT0nbzs/ID30.png' },
  { id: '31', nome: 'Perdi una finale di torneo amatoriale perché fanno rigiocare il tuo avversario per un problema tecnico', indice: 61, urlImmagine: 'https://i.postimg.cc/WpJgwtZX/ID31.png' },
  { id: '32', nome: 'Il gioco che aspettavi da anni viene rimandato di altri 2 anni', indice: 63, urlImmagine: 'https://i.postimg.cc/zDRKF3hy/ID32.png' },
  { id: '33', nome: 'Muori al boss finale di Kingdom Hearts dopo 2 ore di combattimento senza aver salvato', indice: 65, urlImmagine: 'https://i.postimg.cc/bY2k9dnD/ID33.png' },
  { id: '34', nome: 'Investi 300€ in skin e il gioco chiude i server definitivamente', indice: 67, urlImmagine: 'https://i.postimg.cc/gc68Hrhn/ID34.png' },
  { id: '35', nome: 'Il tuo account con centinaia di euro di oggetti viene bannato per sempre', indice: 69, urlImmagine: 'https://i.postimg.cc/WzrZNfjj/ID35.png' },
  { id: '36', nome: 'Un tuo amico ti batte per la prima volta e non smette più di parlarne', indice: 71, urlImmagine: 'https://i.postimg.cc/j2NfxkTz/ID36.png' },
  { id: '37', nome: 'Perdi tutti i progressi di Red Dead Redemption 2 per un salvataggio corrotto dopo 80 ore di gioco', indice: 73, urlImmagine: 'https://i.postimg.cc/NMZTwv34/ID37.png' },
  { id: '38', nome: 'Il tuo controller si rompe definitivamente durante la scena finale di un gioco', indice: 75, urlImmagine: 'https://i.postimg.cc/7h7zHQ4S/ID38.png' },
  { id: '39', nome: 'Compri una console nuova e scopri che il tuo gioco preferito non è compatibile', indice: 77, urlImmagine: 'https://i.postimg.cc/63FRNxkz/ID39.png' },
  { id: '40', nome: 'Vieni doxxato dopo una vittoria in un torneo amatoriale online', indice: 79, urlImmagine: 'https://i.postimg.cc/7PGYL96f/ID40.png' },
  { id: '41', nome: 'Perdi una borsa di studio per i voti crollati a causa del gaming', indice: 81, urlImmagine: 'https://i.postimg.cc/447N3Pd3/ID41.png' },
  { id: '42', nome: 'Il tuo account EA Sports FC con tutte le squadre costruite viene resettato a inizio stagione', indice: 83, urlImmagine: 'https://i.postimg.cc/13gKCL5R/ID42.png' },
  { id: '43', nome: 'Sviluppi una lesione al polso che ti impedisce di giocare per 6 mesi', indice: 85, urlImmagine: 'https://i.postimg.cc/htH1HpfR/ID43.png' },
  { id: '44', nome: 'Perdi il lavoro perché continuavi a giocare durante lo smartworking', indice: 87, urlImmagine: 'https://i.postimg.cc/3N7Lz9fg/ID44.png' },
  { id: '45', nome: 'Il tuo PC da 2000€ si fulmina durante il primo avvio di Red Dead Redemption 2', indice: 89, urlImmagine: 'https://i.postimg.cc/C5Yv9Jr4/ID45.png' },
  { id: '46', nome: "La tua ex ti cancella tutti i salvataggi e l'account prima di lasciarti", indice: 91, urlImmagine: 'https://i.postimg.cc/d3vWgnN1/ID46.png' },
  { id: '47', nome: 'Preordini una console da 800€, arriva rotta e il venditore sparisce', indice: 93, urlImmagine: 'https://i.postimg.cc/fyZH15qk/ID47.png' },
  { id: '48', nome: 'Perdi il lavoro e la ragazza nello stesso giorno perché passavi tutto il tempo a giocare', indice: 95, urlImmagine: 'https://i.postimg.cc/Bt9zZ4vx/ID48.png' },
  { id: '49', nome: "La TV da 1500€ comprata apposta per giocare cade e si rompe il giorno stesso dell'acquisto", indice: 97, urlImmagine: 'https://i.postimg.cc/MZCZfBMB/ID49.png' },
  { id: '50', nome: "Avvii GTA 6 il giorno dell'uscita dopo 13 anni di attesa e la console esplode bruciando casa", indice: 99, urlImmagine: 'https://i.postimg.cc/JnXgfsrt/ID50.png' },
];

function selezionaCarteCasuali(pool, n) {
  const copia = [...pool];
  const selezionate = [];
  for (let i = 0; i < n && copia.length > 0; i++) {
    const indexCasuale = Math.floor(Math.random() * copia.length);
    selezionate.push(copia.splice(indexCasuale, 1)[0]);
  }
  return selezionate;
}

function posizioneCorretta(hand, nuovaCarta, posizioneScelta) {
  const valore = nuovaCarta.indice;
  if (posizioneScelta === 0) return valore < hand[0].indice;
  if (posizioneScelta === hand.length) return valore > hand[hand.length - 1].indice;
  const sinistra = hand[posizioneScelta - 1].indice;
  const destra = hand[posizioneScelta].indice;
  return valore > sinistra && valore < destra;
}

function controllaFinePartita(stato) {
  const { corrette, errori } = stato;
  if (corrette === 6) return { finita: true, esito: 'vittoria' };
  if (errori === 3) return { finita: true, esito: 'sconfitta' };
  return { finita: false, esito: null };
}

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
  carta: { backgroundColor: '#2a2a3e', borderRadius: 16, marginHorizontal: 8, marginBottom: 12, padding: 10, elevation: 4 },
  immagine: { height: 150, width: '100%', borderRadius: 10, resizeMode: 'contain' },
  nome: { fontSize: 13, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  index: { fontSize: 14, color: '#a78bfa', fontWeight: '700' },
});

function HomeScreen({ onPlay }) {
  return (
    <View style={stileHome.container}>
      <Text style={stileHome.title}>IL GIOCO DELLA SFORTUNA</Text>
      <Text style={stileHome.subtitle}>VIDEOGIOCHI EDITION</Text>
      <Text style={stileHome.description}>
        Disponi le carte che ti vengono assegnate in ordine di sfortuna. Classifica gli eventi dal meno sfortunato al più sfortunato.
      </Text>
      <TouchableOpacity style={stileHome.button} onPress={onPlay}>
        <Text style={stileHome.buttonText}>Avvia Partita</Text>
      </TouchableOpacity>
    </View>
  );
}

const stileHome = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#1a1a2e' },
 title: {
  fontSize: 38,
  fontWeight: '900',
  textAlign: 'center',
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: 2,
  textShadowColor: '#7c3aed',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 18,
}, 
subtitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#b794f6',
  letterSpacing: 3,
  marginTop: -8,
  marginBottom: 20,
},

description: {
  fontSize: 12,
  fontWeight: '800',
  color: 'white',
  letterSpacing: 1,
  marginBottom: 20,
},

  button: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, backgroundColor: '#7c3aed' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },


});

function GameScreen({ onFine }) {
  const [mano, setMano] = useState([]);
  const [errori, setErrori] = useState(0);
  const [cartaCorrente, setCartaCorrente] = useState(null);
  const [carteUsate, setCarteUsate] = useState([]);
  const [finePartita, setFinePartita] = useState(false);
  const [posizioneScelta, setPosizioneScelta] = useState(null);
  const [messaggioRound, setMessaggioRound] = useState(null);
  const [timer, setTimer]=useState(30);
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

function EndScreen({ esito, onRigioca, onHome }) {
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

export default function App() {
  const [schermata, setSchermata] = useState('home');
  const [esito, setEsito] = useState(null);

  if (schermata === 'home') {
    return <HomeScreen onPlay={() => setSchermata('game')} />;
  }

  if (schermata === 'game') {
    return (

      
      <GameScreen
        onFine={(risultato) => {
          setEsito(risultato);
          setSchermata('end');
        }}
      />
    );
  }

  if (schermata === 'end') {
    return (
      <EndScreen
        esito={esito}
        onRigioca={() => setSchermata('game')}
        onHome={() => setSchermata('home')}
      />
    );
  }
}