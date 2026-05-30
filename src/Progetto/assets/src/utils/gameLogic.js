/**
 *  * @fileoverview Applicazione "Gioco della Sfortuna" - Tema Videogiochi, file per le funzioni logiche
 * @author Jacopo Ricciardi
 * @description File che implementa le funzioni logiche necessarie per il funzionamento del gioco
 *
 * @function selezionaCarteCasuali
 * @description Seleziona le carte casuali da un pool evitando doppioni
 * @param {Carta[]} pool - Array di tutte le carte disponibili
 * @param {number} n - Numero di carte da selezionare
 * @returns {Carta[]} Array di carte casuali
 */
function selezionaCarteCasuali(pool, n) {
  const copia = [...pool];
  const selezionate = [];
  for (let i = 0; i < n && copia.length > 0; i++) {
    const indexCasuale = Math.floor(Math.random() * copia.length);
    selezionate.push(copia.splice(indexCasuale, 1)[0]);
  }
  return selezionate;
}


  /**

 * @function posizioneCorretta
 * @description Verifica se la posizione scelta dal giocatore è corretta
 * @param {Carta[]} hand - Array delle carte in mano ordinate per indice crescente
 * @param {Carta} nuovaCarta - La carta da posizionare nel mazzo tra quelle gia possedute
 * @param {number} posizioneScelta - La posizione scelta dal giocatore (0 = prima di tutto)
 * @returns {boolean} true se la posizione è corretta, false altrimenti
 */
function posizioneCorretta(hand, nuovaCarta, posizioneScelta) {
  const valore = nuovaCarta.indice;
  if (posizioneScelta === 0) return valore < hand[0].indice;
  if (posizioneScelta === hand.length) return valore > hand[hand.length - 1].indice;
  const sinistra = hand[posizioneScelta - 1].indice;
  const destra = hand[posizioneScelta].indice;
  return valore > sinistra && valore < destra;
}

/**
 * @function controllaFinePartita
 * @description Controlla se la partita è terminata per vittoria o sconfitta
 * @param {{corrette: number, errori: number}} stato - Stato corrente della partita
 * @returns {{finita: boolean, esito: string|null}} Oggetto con esito della partita
 */
function controllaFinePartita(stato) {
  const { corrette, errori } = stato;
  if (corrette === 6) return { finita: true, esito: 'vittoria' };
  if (errori === 3) return { finita: true, esito: 'sconfitta' };
  return { finita: false, esito: null };
}



export {selezionaCarteCasuali, posizioneCorretta, controllaFinePartita};
    
    
   
   

 
 