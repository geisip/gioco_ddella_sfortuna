/**
 *  * @fileoverview Applicazione "Gioco della Sfortuna" - Tema Videogiochi, file per le funzioni logiche
 * @author Jacopo Ricciardi
 * @description File che implementa le funzioni logiche necessarie per il funzionamento del gioco
 *
 * @function selezionaCarteCasuali
 * @description Seleziona n carte casuali da un pool senza duplicati.
 * Utilizza il metodo splice per rimuovere le carte già selezionate dal pool temporaneo,
 * garantendo che non vengano estratte due volte la stessa carta.
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
 * @description Verifica se la posizione scelta dal giocatore è corretta rispetto all'indice della carta.
 * Gestisce tre casi distinti:
 * - Posizione 0: la carta deve avere indice minore di tutte le carte in mano
 * - Posizione uguale alla lunghezza della mano: la carta deve avere indice maggiore di tutte
 * - Posizione intermedia: la carta deve avere indice compreso tra la carta a sinistra e quella a destra
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
 * @description Controlla se la partita è terminata verificando le condizioni di vittoria e sconfitta.
 * La partita termina con vittoria quando il giocatore raccoglie 6 carte corrette,
 * e con sconfitta quando commette 3 errori (inclusi i timeout del timer).
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
    
    
   
   

 
 