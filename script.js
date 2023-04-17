
const unchecked_image = "images/unchecked.png"
const checked_image = "images/checked.png"



function Seleziona(event){

  const elemento=event.currentTarget;                        
  elemento.querySelector(".checkbox").src=checked_image;      //Seleziono il checkbox e cambio l'immagine con la spunta
  elemento.classList.add("elemSel");                          //Aggiungo la classe elemSel e rimuovo la sfocatura
  elemento.classList.remove("sfocato");
  
  const domanda=elemento.dataset.questionId;
  const ris_quiz=elemento.dataset.choiceId;

  
  const otherBoxes = elemento.parentElement.querySelectorAll('div');  

  for(const box of otherBoxes){   
    if(box.dataset.choiceId!==ris_quiz){  
      box.classList.add("sfocato");      
      box.classList.remove("elemSel");
      box.querySelector(".checkbox").src=unchecked_image;   

    }
  }

  taken[domanda]=ris_quiz;              //Es: taken[1]=blep ...

  if(verifica()!==null) {
      risultato();
  }
  
}

function verifica(){
  if( taken.one!==undefined && taken.two!==undefined && taken.three!==undefined ){  
    for(const box of boxes){  
      box.removeEventListener('click',Seleziona); //Se l’utente ha risposto a tutte le domande, le risposte non devono poter essere più modificate
    }         
  }else{
    return null;
  }
}

function risultato(){
  if(taken.one!==taken.two && taken.two===taken.three){
    risultatoFinale(taken.two);
  }else{
    risultatoFinale(taken.one);     
  }

}


function risultatoFinale(elemento){       

  const new_h1 = document.createElement('h1');
  new_h1.textContent= RESULTS_MAP[elemento].title;
  const new_p = document.createElement('p');
  new_p.textContent= RESULTS_MAP[elemento].contents;
  const bottone= document.createElement('div');
  const testo_bottone = document.createElement('p');
  testo_bottone.textContent= "Ricomincia il quiz";

  const ris=document.querySelector('#risposta');
  ris.appendChild(new_h1);
  ris.appendChild(new_p);
  ris.appendChild(bottone);
  bottone.appendChild(testo_bottone);

  ris.classList.add('paragrafo');
  bottone.classList.add('bottone');
  testo_bottone.classList.add('testo_bottone');
  
  bottone.addEventListener('click', ricominciaQuiz);

}


function ricominciaQuiz(){
    
  
  
  const el=document.querySelectorAll('.choice-grid div ');

  for(const box of el){
    box.classList.remove('sfocato');
    box.classList.remove('elemSel');
    box.addEventListener('click',Seleziona); 
    const img=box.querySelector(".checkbox");
    img.src=unchecked_image;
  }

  const ris=document.querySelector('#risposta');

  ris.classList.remove('paragrafo');
  ris.classList.remove('bottone');
  ris.classList.remove('testo_bottone');



  ris.innerHTML='';

  delete taken.one;     //elimina le risposte precedenti         
  delete taken.two;
  delete taken.three;
   
}


const taken={};

const boxes=document.querySelectorAll('.choice-grid div');

for(const box of boxes){  //Per ogni box di tutti i 27 boxes
  box.addEventListener('click',Seleziona);
}