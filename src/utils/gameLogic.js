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


  if (posizioneScelta === 0) {
    return valore < hand[0].indice;
  }


  if (posizioneScelta === hand.length) {
    return valore > hand[hand.length - 1].indice;
  }

 
  const sinistra = hand[posizioneScelta - 1].indice;
  const destra = hand[posizioneScelta].indice;

  return valore > sinistra && valore < destra;
}




function controllaFinePartita(stato) {
  const { corrette, errori } = stato;

  if (corrette === 6) {
    return {
      finita: true,
      esito: "vittoria"
    };
  }

  if (errori === 3) {
    return {
      finita: true,
      esito: "sconfitta"
    };
  }

  return {
    finita: false,
    esito: null
  };
}


export {selezionaCarteCasuali, posizioneCorretta, controllaFinePartita};
    
    
   
   

 
 