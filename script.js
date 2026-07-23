const card = document.querySelectorAll('.cell');
const container = document.querySelector('.container');
const score = document.querySelector('.score span');

suffleImage();
clicking();

// Función para mezclar las cartas al azar
function suffleImage(){
    card.forEach(c => {
        // Generamos un orden aleatorio usando el tamaño total de las cartas
        const random = Math.floor(Math.random() * card.length);
        c.style.order = random;
    });
}

function clicking(){
    // Revelar todas las cartas por 2 segundos al iniciar el juego (Toque inicial)
    card.forEach(c => {
        c.classList.add('flipped');
    });

    // Usamos setTimeout (se ejecuta una sola vez) en lugar de setInterval
    setTimeout(() => {
        card.forEach(c => {
            c.classList.remove('flipped');
        });
    }, 2000);

    // Configurar el evento de click para cada carta
    for(let i = 0; i < card.length; i++){
        card[i].addEventListener('click', () => {
            
            // Si la carta ya está volteada o ya encontró su pareja, no hace nada
            if (card[i].classList.contains('flipped') || card[i].classList.contains('matched')) {
                return;
            }

            // Volteamos la carta seleccionada
            card[i].classList.add('flipped');

            // Buscamos cuántas cartas se han volteado en este turno
            const flippedCards = document.querySelectorAll('.cell.flipped:not(.matched)');

            if(flippedCards.length === 2){
                // Bloqueamos el contenedor para que no puedan dar click a una tercera carta
                container.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    container.style.pointerEvents = 'all';
                }, 1000);
 
                // Enviamos las dos celdas a la función de validación
                match(flippedCards[0], flippedCards[1]);
            }
        });
    }
}

function match(cardOne, cardTwo){
    // Comparamos el atributo data-index que está en el HTML
    if(cardOne.dataset.index == cardTwo.dataset.index){

        // Sumamos 1 al marcador de Score
        score.innerHTML = parseInt(score.innerHTML) + 1;
       
        // Les agregamos la clase matched para que se queden abiertas con el brillo azul
        cardOne.classList.add('matched');
        cardTwo.classList.add('matched');

    } else {
        // Si no coinciden, esperamos 1 segundo y les quitamos la animación para que se cierren
        setTimeout(() => {
            cardOne.classList.remove('flipped'); 
            cardTwo.classList.remove('flipped'); 
        }, 1000);
    }
}