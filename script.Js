// script.js
const names = ["banana",  "bola", "pirulito", "comida", "bombom", "sapato", "chocolate", "maçã", "melão", "camisa"];
const objects = ["🍌",  "⚽", "🍭", "🍔", "🍬", "👞", "🍫", "🍎", "🍈", "👕"];

const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

// Embaralha os nomes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupGame() {
    const shuffledNames = shuffle([...names]);
    const nameList = document.getElementById('name-list');
    const objectList = document.getElementById('object-list');

    shuffledNames.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        li.draggable = true;
        li.addEventListener('dragstart', dragStart);
        nameList.appendChild(li);
    });

    objects.forEach((object, index) => {
        const li = document.createElement('li');
        li.textContent = object;
        li.dataset.name = names[index];
        li.addEventListener('dragover', dragOver);
        li.addEventListener('drop', drop);
        objectList.appendChild(li);
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggedName = event.dataTransfer.getData('text');
    const targetObjectName = event.target.dataset.name;

    if (draggedName === targetObjectName) {
        correctSound.play();
        event.target.textContent = `${event.target.textContent} - ${draggedName}`;
        launchConfetti();
    } else {
        wrongSound.play();
    }
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

window.onload = setupGame;
