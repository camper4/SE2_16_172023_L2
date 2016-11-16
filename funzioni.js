/**
 * @brief funzione che controlla se ho superato la quantità massima di stock
 */
function controllo_limite(){
	var riga_quantita = Table.rows.item(1).cells; //riga delle quantità
	var numero_colonne = riga_quantita.length; //numero di colonne tabella
	//ricevo l'attributo soglia
	var soglia = document.getElementById("limite").getAttribute("value");
	var somma = 0;
	
	//calcolo la somma delle quantità
	for (i = 0; i < numero_colonne; i++){ 
		somma += parseInt(riga_quantita.item(i).innerHTML);
	}
	
	//controllo se ho superato la soglia
	if(somma > soglia){
		alert("Hai superato la quantità consentita nel magazzino")
	}
}

/**
 * @brief funzione che permette di cambiare il limite sulle quantità
 					switchando i bottoni nelle due modalità
 */
function cambia_limite(){
	controllo_limite();
	input_text = document.getElementById("limite");
	bottone_limite_val = document.getElementById("bottone_limite").innerHTML;
	
	//se il bottone è settato su cambia limite faccio in modo di poterlo cambiare
	if(bottone_limite_val== "cambia limite"){
		//pemetto la scrittura togliendo readonly e rendendo il campo vuoto
		input_text.value = "";
		input_text.removeAttribute("readonly");
		document.getElementById("bottone_limite").innerHTML = "conferma valore inserito"; //setto il bottone per la conferma del valore
	}
	else{ //se il bottone è settato sulla conferma del valore imposto il tutto come 				lo era prima ma con il nuovo valore inserito
		//controllo che il valore inserito si un numero e non vuoto
		if(!isNaN(input_text.value) && input_text.value !="")
			input_text.setAttribute("value" , input_text.value);
		else{ //se non è un numero o è vuoto do un alert
			alert("inserisci un numero");
			input_text.value = document.getElementById("limite").getAttribute("value");
		}
		input_text.setAttribute("readonly" , true);
		document.getElementById("bottone_limite").innerHTML = "cambia limite";
		controllo_limite();
	}
}



/**
 * @brief funzione che fa comparire le caselle di testo per 
 					l'inserimento del prodotto
 */
function inserisci_articoli_show(){
	controllo_limite();
	var nascondi = document.getElementById("nascondi");
	if(nascondi.style.display == 'none')
		nascondi.setAttribute("style" , "display:block")
}



/**
 * @brief funzione che, una volta premuto il pulsante di
 					invio dei dati li aggiunge in una nuova colonna
					se non ci sono già, altrimenti li incrementa
 */
function aggiungi_elementi(){
	//recupero il valore dei due inserimenti dell'utente
	var oggetto = document.inserimento.oggetto.value;
	var quantita = document.inserimento.quantita.value;
	
	//controlli sulll'input
	if(!isNaN(quantita) && oggetto != "" && quantita != ""){

		//variabile che conterrà l'indice del prodotto se trovato o resta -1
		var indice_prodotto = -1; 
		var riga_prodotti = Table.rows.item(0).cells; //riga dei prodotti
		var riga_quantita = Table.rows.item(1).cells; //riga delle quantità
		var numero_colonne = riga_prodotti.length; //numero di colonne tabella

		//scorro tutti gli oggetti della prima riga per trovare uguaglianze
		for (i = 0; i < numero_colonne; i++){ 
			var valore_cella = riga_prodotti.item(i).innerHTML;
			if(valore_cella == oggetto)	{ //trovato l'oggetto che voglio aggiungere
				indice_prodotto = i; //salvo l'indicce del prodotto
				break;
			}
		}

		//se ho già il prodotto lo incremento
		if (indice_prodotto >= 0){
			var valore_precedente = parseInt( riga_quantita.item(indice_prodotto).innerHTML);
			riga_quantita.item(indice_prodotto).innerHTML = valore_precedente + parseInt(quantita);
		}
		else{ //altrimenti creo una nuova colonna dove aggiungo i due valori
			tabella = document.getElementById("Table");

			ogg = document.createTextNode(oggetto);
			qua = document.createTextNode(quantita);

			tabella.rows[0].insertCell(tabella.rows[0].cells.length).appendChild(ogg);
			tabella.rows[1].insertCell(tabella.rows[1].cells.length).appendChild(qua);
		}
	}
	else
	{
		alert("Hai fatto un inserimento errato");
	}
	
	
	//faccio ritornare vuoti i campi di inserimento
	document.inserimento.oggetto.value = "";
	document.inserimento.quantita.value = "";
	
	//riscompaiono gli elementi del div di inserimento
	var nascondi = document.getElementById("nascondi");
	if(nascondi.style.display == 'block')
		nascondi.setAttribute("style" , "display:none")
	controllo_limite();
}