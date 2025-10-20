// --- DOM ELEMENTS ---
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameContainer = document.getElementById('game-container');
const endScreen = document.getElementById('end-screen');
const platformerScreen = document.getElementById('platformer-screen');
const epilogueScreen = document.getElementById('epilogue-screen');
const memoryGameScreen = document.getElementById('memory-game-screen');
const memoryGameBoard = document.getElementById('memory-game-board');
const continueToNextPhaseButton = document.getElementById('continue-to-next-phase-button');
const backToStartButton = document.getElementById('back-to-start-button');
const platformerCanvas = document.getElementById('platformer-canvas');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const playerHpBar = document.getElementById('player-hp-bar');
const playerHpText = document.getElementById('player-hp-text');
const enemyHpBar = document.getElementById('enemy-hp-bar');
const enemyHpText = document.getElementById('enemy-hp-text');
const enemyName = document.getElementById('enemy-name');
const enemyStatusContainer = document.getElementById('enemy-status-container');
const centralMessage = document.getElementById('central-message');
const pagesCollectedEl = document.getElementById('pages-collected');
const hintCountEl = document.getElementById('hint-count');
const narrativeView = document.getElementById('narrative-view');
const narrativeText = document.getElementById('narrative-text');
const narrativeEnemyImageContainer = document.getElementById('narrative-enemy-image-container');
const narrativeEnemyImage = document.getElementById('narrative-enemy-image');
const challengeButton = document.getElementById('challenge-button');
const combatView = document.getElementById('combat-view');
const timerBar = document.getElementById('timer-bar');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const useHintButton = document.getElementById('use-hint-button');
const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');
const playerSpriteContainer = document.getElementById('player-sprite-container');
const enemySpriteContainer = document.getElementById('enemy-sprite-container');
const feedbackText = document.getElementById('feedback-text');
const ctx = platformerCanvas.getContext('2d');

// --- PERSONAGENS ---
const characterAssets = {
    player: 'https://img.freepik.com/vetores-premium/pixel-art-woman-warrior-rpg-estilo-classico_865365-9.jpg',
    capanga: 'https://static.vecteezy.com/system/resources/thumbnails/027/517/582/small_2x/pixel-cartoon-swamp-monster-png.png',
    guarda: 'https://img.freepik.com/vetores-premium/pixel-art-personagem-jogo-retro-8bit-demon-lord_865365-22.jpg',
    espectro: 'https://img.freepik.com/vetores-premium/desenho-de-pixel-de-monstro-dos-desenhos-animados_61878-707.jpg',
    golem: 'https://static.vecteezy.com/system/resources/previews/059/976/379/non_2x/gorgeous-peaceful-tropical-a-powerful-golem-made-of-stone-no-background-with-transparent-background-top-tier-free-png.png',
    dragao: 'https://images.vexels.com/media/users/3/317707/isolated/preview/5fc0043abdb05b577450b9581512461b-maravilhoso-dragao-vermelho.png'
};

// --- GAME DATABASE ---
const questions = {
     'entrada': [ { question: "Qual o Autor de Iracema", options: ["Machado de Assis", "José de Alencar", "Castro Alves"], correctAnswer: "José de Alencar", category: "Literatura Nacional" }, { question: "Qual autor de ficção científica escreveu 'Eu, Robô'?", options: ["Isaac Asimov", "Philip K.", "Arthur C. Clarke"], correctAnswer: "Isaac Asimov", category: "Ficção Científica" }, { question: "Qual destes livros é um famoso romance de Jane Austen?", options: ["O Morro dos Ventos Uivantes", "Orgulho e Preconceito", "Jane Eyre"], correctAnswer: "Orgulho e Preconceito", category: "Romance" }, { question: "Quem escreveu 'Dom Quixote', considerado o primeiro romance moderno?", options: ["Miguel de Cervantes", "William Shakespeare", "Dante Alighieri"], correctAnswer: "Miguel de Cervantes", category: "Escritores" }, { question: "'Frankenstein' foi escrito por qual autora?", options: ["Mary Shelley", "Virginia Woolf", "Emily Brontë"], correctAnswer: "Mary Shelley", category: "Terror" }, { question: "Em 'Grande Sertão: Veredas' de Guimarães Rosa, qual o nome do protagonista e narrador?", options: ["Riobaldo", "Diadorim", "Joca Ramiro"], correctAnswer: "Riobaldo", category: "Literatura Nacional" }, { question: "Qual autor escreveu 'Viagem ao Centro da Terra'?", options: ["Júlio Verne", "H. G. Wells", "Edgar Allan Poe"], correctAnswer: "Júlio Verne", category: "Ficção Científica" } ],
     'sala': [ { question: "Quem escreveu a saga 'O Senhor dos Anéis'?", options: ["C.S. Lewis", "George R.R. Martin", "J.R.R. Tolkien"], correctAnswer: "J.R.R. Tolkien", category: "Fantasia" }, { question: "Qual o nome do palhaço assustador no livro 'It: A Coisa' de Stephen King?", options: ["Pennywise", "Coringa", "Krusty"], correctAnswer: "Pennywise", category: "Terror" }, { question: "Qual o nome da protagonista de 'Jogos Vorazes'?", options: ["Hermione Granger", "Katniss Everdeen", "Tris Prior"], correctAnswer: "Katniss Everdeen", category: "Distopia" }, { question: "No universo de Harry Potter, qual o nome do diretor de Hogwarts?", options: ["Severo Snape", "Alvo Dumbledore", "Sirius Black"], correctAnswer: "Alvo Dumbledore", category: "Fantasia" }, { question: "'O Guia do Mochileiro das Galáxias' é uma série de comédia e ficção científica de qual autor?", options: ["Douglas Adams", "Júlio Verne", "H.G. Wells"], correctAnswer: "Douglas Adams", category: "Ficção Científica" }, { question: "Em 'As Crônicas de Nárnia', como as crianças Pevensie chegam a Nárnia pela primeira vez?", options: ["Através de um guarda-roupa", "Por um portal mágico", "Em um navio"], correctAnswer: "Através de um guarda-roupa", category: "Fantasia" }, { question: "'Fahrenheit 451' é uma obra distópica de qual autor?", options: ["Ray Bradbury", "George Orwell", "Aldous Huxley"], correctAnswer: "Ray Bradbury", category: "Distopia" } ],
     'quartos': [ { question: "'Vermelho, Branco e Sangue Azul' é um romance de qual autora?", options: ["Becky Albertalli", "Casey McQuiston", "Adam Silvera"], correctAnswer: "Casey McQuiston", category: "Literatura LGBTQI+" }, { question: "Qual desses escritores brasileiros fez parte do movimento modernista?", options: ["José de Alencar", "Mário de Andrade", "Aluísio Azevedo"], correctAnswer: "Mário de Andrade", category: "Escritores" }, { question: "A Biblioteca de Alexandria, uma das mais famosas da antiguidade, localizava-se em qual país atual?", options: ["Grécia", "Itália", "Egito"], correctAnswer: "Egito", category: "Origem da Literatura" }, { question: "'O Conto da Aia', um famoso romance distópico, foi escrito por quem?", options: ["Margaret Atwood", "Ursula K. Le Guin", "Suzanne Collins"], correctAnswer: "Margaret Atwood", category: "Distopia" }, { question: "Qual é o nome do navio baleeiro no livro 'Moby *****'?", options: ["Pequod", "Leviatã", "O Holandês Voador"], correctAnswer: "Pequod", category: "Romance" }, { question: "Qual o nome do protagonista de 'Me Chame Pelo Seu Nome' de André Aciman?", options: ["Elio", "Oliver", "Samuel"], correctAnswer: "Elio", category: "Literatura LGBTQI+" }, { question: "Quem é a autora de 'O Morro dos Ventos Uivantes'?", options: ["Emily Brontë", "Jane Austen", "Charlotte Brontë"], correctAnswer: "Emily Brontë", category: "Escritores" } ],
     'biblioteca': [ { question: "Em '1984' de George Orwell, qual é o nome do líder onipresente do Partido?", options: ["O Chanceler", "Grande Irmão", "O Comandante"], correctAnswer: "Grande Irmão", category: "Distopia" }, { question: "Qual autor é famoso por criar o universo de Cthulhu?", options: ["Edgar Allan Poe", "H.P. Lovecraft", "Bram Stoker"], correctAnswer: "H.P. Lovecraft", category: "Terror" }, { question: "Em 'A Revolução dos Bichos', os porcos assumem o controle. Qual o nome do porco líder?", options: ["Napoleão", "Bola-de-Neve", "Garganta"], correctAnswer: "Napoleão", category: "Literatura Clássica" }, { question: "Quem é o autor de 'Memórias Póstumas de Brás Cubas'?", options: ["Clarice Lispector", "Carlos Drummond de Andrade", "Machado de Assis"], correctAnswer: "Machado de Assis", category: "Literatura Nacional" }, { question: "Qual destes não é um dos sete reinos de Westeros em 'As Crônicas de Gelo e Fogo'?", options: ["O Norte", "O Condado", "Dorne"], correctAnswer: "O Condado", category: "Fantasia" }, { question: "Qual é o famoso detetive criado por Agatha Christie?", options: ["Sherlock Holmes", "Hercule Poirot", "Sam Spade"], correctAnswer: "Hercule Poirot", category: "Escritores" }, { question: "Em 'O Sol é para Todos', qual o nome do advogado que defende um homem negro?", options: ["Atticus Finch", "Tom Robinson", "Boo Radley"], correctAnswer: "Atticus Finch", category: "Literatura Clássica" } ],
     'subsolo': [ { question: "Qual livro de ficção científica narra a história da família Atreides no planeta Arrakis?", options: ["Fundação", "Duna", "O Guia do Mochileiro das Galáxias"], correctAnswer: "Duna", category: "Ficção Científica" }, { question: "Qual o autor de 'O Nome do Vento', primeiro livro da série 'A Crônica do Matador do Rei'?", options: ["Brandon Sanderson", "Patrick Rothfuss", "Neil Gaiman"], correctAnswer: "Patrick Rothfuss", category: "Fantasia" }, { question: "Machado de Assis é considerado o maior nome de qual movimento literário no Brasil?", options: ["Romantismo", "Realismo", "Barroco"], correctAnswer: "Realismo", category: "Escritores" }, { question: "Qual o nome do protagonista de 'O Apanhador no Campo de Centeio'?", options: ["Holden Caulfield", "Jay Gatsby", "Atticus Finch"], correctAnswer: "Holden Caulfield", category: "Literatura Clássica" }, { question: "Qual poeta português é famoso pela obra 'Os Lusíadas'?", options: ["Fernando Pessoa", "Luís de Camões", "Florbela Espanca"], correctAnswer: "Luís de Camões", category: "Escritores" }, { question: "'Odisseia', um dos poemas épicos da Grécia Antiga, é atribuído a qual autor?", options: ["Sófocles", "Homero", "Platão"], correctAnswer: "Homero", category: "Escritores" }, { question: "Qual é a primeira das Três Leis da Robótica de Asimov?", options: ["Um robô não pode ferir um ser humano", "Um robô deve obedecer as ordens dos humanos", "Um robô deve proteger sua própria existência"], correctAnswer: "Um robô não pode ferir um ser humano", category: "Ficção Científica" } ]
};

const phases = [
    { name: "Entrada do Castelo", enemy: "Capanga de Pedra", questions: questions['entrada'], timer: 40, asset: characterAssets.capanga }, 
    { name: "Sala do Trono", enemy: "Guarda Real Corrompido", questions: questions['sala'], timer: 40, asset: characterAssets.guarda }, 
    { name: "Quartos Assombrados", enemy: "Espectro do Castelo", questions: questions['quartos'], timer: 40, asset: characterAssets.espectro }, 
    { name: "Biblioteca Proibida", enemy: "Golem de Livros", questions: questions['biblioteca'], timer: 40, asset: characterAssets.golem }, 
    { name: "Covil do Dragão", enemy: "Dragão das Sombras", questions: questions['subsolo'], timer: 20, asset: characterAssets.dragao },
];

let state = {};
let platformerState = {};
let animationFrameId;

function initState() {
    state = { player: { hp: 5, maxHp: 5, hints: 1 }, enemy: { hp: 5, maxHp: 5 }, currentPhaseIndex: 0, pagesCollected: 0, currentQuestionIndex: 0, timer: null, hintUsed: false, answered: false };
}

function switchScreen(activeScreen) {
    [startScreen, gameScreen, endScreen, platformerScreen, epilogueScreen, memoryGameScreen].forEach(screen => {
        if (screen === activeScreen) {
            screen.classList.remove('hidden');
            setTimeout(() => screen.classList.add('active'), 10);
        } else {
            screen.classList.remove('active');
            setTimeout(() => screen.classList.add('hidden'), 500);
        }
    });
}

function startGame() {
    initState();
    switchScreen(gameScreen);
    loadPhase(state.currentPhaseIndex);
}

function startAtPhase(phaseIndex) {
    initState();
    state.currentPhaseIndex = phaseIndex;
    switchScreen(gameScreen);
    loadPhase(state.currentPhaseIndex);
}

function populatePhaseMenu() {
    const phaseButtonsContainer = document.getElementById('phase-buttons-container');
    if (!phaseButtonsContainer) return;
    phaseButtonsContainer.innerHTML = '';
    phases.forEach((phase, index) => {
        const button = document.createElement('button');
        button.textContent = `${index + 1}. ${phase.enemy}`;
        button.classList.add('btn-phase');
        button.onclick = () => startAtPhase(index); 
        phaseButtonsContainer.appendChild(button);
    });
}

function loadPhase(phaseIndex) {
    const phase = phases[phaseIndex];
    combatView.classList.add('hidden');
    narrativeView.classList.remove('hidden');
    enemyStatusContainer.classList.add('hidden');
    centralMessage.textContent = `Fase ${phaseIndex + 1}: ${phase.name}`;
    if (phaseIndex > 0) {
        narrativeText.textContent = `Você completou o minigame! Agora, você avança para ${phase.name.toLowerCase()}. Um ${phase.enemy.toLowerCase()} se posta em seu caminho...`;
    } else {
        narrativeText.textContent = `Você adentra ${phase.name.toLowerCase()}. Um ${phase.enemy.toLowerCase()} se posta em seu caminho, pronto para a batalha!`;
    }
    challengeButton.textContent = `Enfrentar o ${phase.enemy}`;
    updateUI();

    if (narrativeEnemyImage && phase.asset) {
        narrativeEnemyImage.src = phase.asset;
        narrativeEnemyImageContainer.classList.remove('hidden');
        narrativeEnemyImageContainer.classList.remove('pop-in');
        void narrativeEnemyImageContainer.offsetWidth;
        narrativeEnemyImageContainer.classList.add('pop-in');
    } else if (narrativeEnemyImageContainer) {
        narrativeEnemyImageContainer.classList.add('hidden');
    }
}

function startCombat() {
    const phase = phases[state.currentPhaseIndex];
    state.currentQuestionIndex = 0;
    state.enemy = { hp: 5, maxHp: 5, name: phase.enemy };
    narrativeView.classList.add('hidden');
    combatView.classList.remove('hidden');
    enemyStatusContainer.classList.remove('hidden');
    enemyName.textContent = state.enemy.name;
    playerSpriteContainer.innerHTML = `<img src="${characterAssets.player}" alt="Princesa Sofia">`;
    enemySpriteContainer.innerHTML = `<img src="${phase.asset}" alt="${phase.enemy}">`;
    updateUI();
    nextQuestion();
}

function nextQuestion() {
    state.answered = false;
    state.hintUsed = false;
    useHintButton.disabled = false;
    useHintButton.classList.remove('opacity-50');
    feedbackText.textContent = '';
    feedbackText.classList.remove('pop-in');
    const phase = phases[state.currentPhaseIndex];
    const questionData = phase.questions[state.currentQuestionIndex];
    questionCategory.textContent = questionData.category;
    questionText.textContent = questionData.question;
    optionsContainer.innerHTML = '';
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.disabled = false;
        button.classList.add('btn-option', 'w-full', 'py-3', 'px-4', 'rounded-lg', 'text-lg');
        button.onclick = () => selectAnswer(button, option, questionData.correctAnswer);
        optionsContainer.appendChild(button);
    });
    startTimer(phase.timer);
}

function startTimer(duration) {
    clearTimeout(state.timer);
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    timerBar.offsetHeight; 
    timerBar.style.transition = `width ${duration}s linear`;
    timerBar.style.width = '0%';
    state.timer = setTimeout(() => {
        if (!state.answered) { handleAnswer(false); }
    }, duration * 1000);
}

function selectAnswer(button, selected, correct) {
    if (state.answered) return;
    state.answered = true;
    clearTimeout(state.timer);
    const computedWidth = window.getComputedStyle(timerBar).width;
    timerBar.style.transition = 'none';
    timerBar.style.width = computedWidth;
    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
    const isCorrect = selected === correct;
    button.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) {
        Array.from(optionsContainer.children).forEach(btn => {
            if (btn.textContent === correct) { btn.classList.add('correct'); }
        });
    }
    feedbackText.textContent = isCorrect ? "Correto!" : "Errado!";
    feedbackText.className = `font-cinzel mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`;
    feedbackText.classList.add('pop-in');
    handleAnswer(isCorrect);
}

function handleAnswer(isCorrect) {
    let damageToPlayer = isCorrect ? 0 : (state.hintUsed ? 0.5 : 1);
    if (isCorrect) {
        state.enemy.hp--;
        enemySpriteContainer.classList.add('hit-effect');
    } else {
        state.player.hp -= damageToPlayer;
        playerSpriteContainer.classList.add('hit-effect');
        gameContainer.classList.add('shake');
    }
    updateUI();

    setTimeout(() => {
        playerSpriteContainer.classList.remove('hit-effect');
        enemySpriteContainer.classList.remove('hit-effect');
        gameContainer.classList.remove('shake');

        if (state.enemy.hp <= 0) {
            state.pagesCollected++;
            if (state.currentPhaseIndex >= phases.length - 1) {
                startPlatformerStage();
            } else {
                startMemoryGame();
            }
            return;
        }
        
        if (state.player.hp <= 0) {
            endGame(false);
            return;
        }

        state.currentQuestionIndex++;
        if (state.currentQuestionIndex < phases[state.currentPhaseIndex].questions.length) {
            nextQuestion();
        } else {
            endGame(false, "Você usou todas as suas perguntas, mas o inimigo resistiu!");
        }
    }, 2000);
}

function useHint() {
    if (state.player.hints > 0 && !state.hintUsed) {
        state.hintUsed = true;
        state.player.hints--;
        useHintButton.disabled = true;
        useHintButton.classList.add('opacity-50');
        updateUI();
        const phase = phases[state.currentPhaseIndex];
        const questionData = phase.questions[state.currentQuestionIndex];
        const correctAnswer = questionData.correctAnswer;
        const wrongOptions = questionData.options.filter(opt => opt !== correctAnswer);
        if (wrongOptions.length > 0) {
            const optionToRemove = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
            Array.from(optionsContainer.children).forEach(btn => {
                if (btn.textContent === optionToRemove) {
                    btn.disabled = true;
                    btn.classList.add('opacity-25', 'pointer-events-none');
                }
            });
        }
    }
}

let memoryGame = { firstCard: null, secondCard: null, lockBoard: false, matchesFound: 0, totalPairs: 6 };
const bookCovers = [ 'https://s4.static.brasilescola.uol.com.br/be/2025/03/dom-quixote-sancho-panca.jpg', 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Machado_de_Assis_big_photo.jpg',
'https://cdn.pixabay.com/photo/2016/04/15/22/56/book-1332161_1280.jpg', 'https://thumbs.dreamstime.com/b/senhor-dos-an%C3%A9is-128960281.jpg', 
'https://upload.wikimedia.org/wikipedia/pt/1/1d/Harry_Potter_Pedra_Filosofal_2001.jpg', 'https://img.freepik.com/vetores-gratis/pilha-de-design-plano-desenhado-a-mao-de-ilustracao-de-livros_23-2149341898.jpg' ];

function startMemoryGame() {
    memoryGame.matchesFound = 0;
    memoryGameBoard.innerHTML = '';
    continueToNextPhaseButton.classList.add('hidden');
    let cards = [...bookCovers, ...bookCovers];
    cards.sort(() => 0.5 - Math.random());
    cards.forEach(cover => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.cover = cover;
        cardElement.innerHTML = `<div class="card-front"><img src="${cover}" alt="Capa de Livro"></div><div class="card-back">?</div>`;
        cardElement.addEventListener('click', flipCard);
        memoryGameBoard.appendChild(cardElement);
    });
    switchScreen(memoryGameScreen);
}

function flipCard() {
    if (memoryGame.lockBoard || this === memoryGame.firstCard) return;
    this.classList.add('flipped');
    if (!memoryGame.firstCard) {
        memoryGame.firstCard = this;
        return;
    }
    memoryGame.secondCard = this;
    memoryGame.lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = memoryGame.firstCard.dataset.cover === memoryGame.secondCard.dataset.cover;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    memoryGame.firstCard.removeEventListener('click', flipCard);
    memoryGame.secondCard.removeEventListener('click', flipCard);
    memoryGame.firstCard.classList.add('matched');
    memoryGame.secondCard.classList.add('matched');
    memoryGame.matchesFound++;
    if (memoryGame.matchesFound === memoryGame.totalPairs) {
        setTimeout(() => continueToNextPhaseButton.classList.remove('hidden'), 800);
    }
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        memoryGame.firstCard.classList.remove('flipped');
        memoryGame.secondCard.classList.remove('flipped');
        resetBoard();
    }, 1200);
}

function resetBoard() {
    [memoryGame.firstCard, memoryGame.secondCard] = [null, null];
    memoryGame.lockBoard = false;
}

function endGame(isVictory, customMessage = "") {
    switchScreen(endScreen);
    endTitle.textContent = isVictory ? "Vitória!" : "Fim de Jogo";
    endMessage.textContent = customMessage || (isVictory ? "Você venceu!" : "A escuridão prevaleceu. A princesa Sofia foi derrotada, mas a esperança ainda vive. Tente novamente!");
}

function updateUI() {
    playerHpText.textContent = Math.ceil(Math.max(0, state.player.hp));
    playerHpBar.style.width = `${(Math.max(0, state.player.hp) / state.player.maxHp) * 100}%`;
    pagesCollectedEl.textContent = state.pagesCollected;
    hintCountEl.textContent = state.player.hints;
    if(!combatView.classList.contains('hidden')) {
        enemyHpText.textContent = Math.max(0, state.enemy.hp);
        enemyHpBar.style.width = `${(Math.max(0, state.enemy.hp) / state.enemy.maxHp) * 100}%`;
    }
}

function startPlatformerStage() {
    switchScreen(platformerScreen);
    platformerCanvas.width = Math.min(700, window.innerWidth - 40);
    platformerCanvas.height = 400;
    const playerImg = new Image();
    playerImg.src = characterAssets.player;
    const stars = Array.from({ length: 100 }, () => ({ x: Math.random() * platformerCanvas.width, y: Math.random() * platformerCanvas.height, radius: Math.random() * 1.5, opacity: Math.random() }));
    platformerState = { player: { x: 50, y: 300, width: 40, height: 50, speed: 4, velocityX: 0, velocityY: 0, jumping: false, grounded: false }, gravity: 0.6, friction: 0.8, keys: {}, platforms: [ { x: 0, y: 380, width: 150, height: 20, type: 'static' }, { x: 200, y: 320, width: 100, height: 20, type: 'moving', speed: 0.8, direction: 1, range: 50, startX: 200 }, { x: 350, y: 250, width: 100, height: 20, type: 'static' }, { x: 500, y: 200, width: 100, height: 20, type: 'static' }, { x: 400, y: 120, width: 100, height: 20, type: 'static' } ], book: { x: 425, y: 70, width: 50, height: 50, glow: 10 }, assets: { player: playerImg }, stars: stars };
    document.addEventListener('keydown', platformerKeyDown);
    document.addEventListener('keyup', platformerKeyUp);
    cancelAnimationFrame(animationFrameId);
    platformerLoop();
}

function platformerKeyDown(e) { platformerState.keys[e.code] = true; }
function platformerKeyUp(e) { platformerState.keys[e.code] = false; }

function checkCollision(shapeA, shapeB) {
    const vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
    const vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
    const hWidths = (shapeA.width / 2) + (shapeB.width / 2);
    const hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    let colDir = null;
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        const oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) { colDir = "top"; shapeA.y += oY; } else { colDir = "bottom"; shapeA.y -= oY; }
        } else {
            if (vX > 0) { colDir = "left"; shapeA.x += oX; } else { colDir = "right"; shapeA.x -= oX; }
        }
    }
    return colDir;
}

function platformerLoop() {
    const player = platformerState.player;
    const keys = platformerState.keys;
    if (keys['ArrowRight'] || keys['KeyD']) { if (player.velocityX < player.speed) { player.velocityX++; } }
    if (keys['ArrowLeft'] || keys['KeyA']) { if (player.velocityX > -player.speed) { player.velocityX--; } }
    if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && !player.jumping && player.grounded) {
        player.jumping = true;
        player.grounded = false;
        player.velocityY = -player.speed * 2.5;
    }
    player.velocityX *= platformerState.friction;
    player.velocityY += platformerState.gravity;
    player.grounded = false;
    platformerState.platforms.forEach(platform => {
         if (platform.type === 'moving') {
             platform.x += platform.speed * platform.direction;
             if (platform.x > platform.startX + platform.range || platform.x < platform.startX) { platform.direction *= -1; }
         }
        const dir = checkCollision(player, platform);
        if (dir === "left" || dir === "right") { player.velocityX = 0; } 
        else if (dir === "bottom") { 
            player.grounded = true; 
            player.jumping = false;
            if (platform.type === 'moving') { player.x += platform.speed * platform.direction; }
        } 
        else if (dir === "top") { player.velocityY = 0; }
    });
    player.x += player.velocityX;
    player.y += player.velocityY;
    if(player.grounded){ player.velocityY = 0; }
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > platformerCanvas.width) player.x = platformerCanvas.width - player.width;
    if (player.y > platformerCanvas.height) { player.x = 50; player.y = 300; player.velocityX = 0; player.velocityY = 0; }
    ctx.clearRect(0, 0, platformerCanvas.width, platformerCanvas.height);
    ctx.fillStyle = "white";
    platformerState.stars.forEach(star => { ctx.globalAlpha = star.opacity; ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill(); });
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#a37b4c";
    platformerState.platforms.forEach(platform => { ctx.fillRect(platform.x, platform.y, platform.width, platform.height); });
    ctx.save();
    ctx.shadowColor = 'rgba(255, 255, 150, 0.8)';
    ctx.shadowBlur = platformerState.book.glow;
    ctx.font = "50px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const bookX = platformerState.book.x + platformerState.book.width / 2;
    const bookY = platformerState.book.y + platformerState.book.height / 2;
    ctx.fillText('📖', bookX, bookY);
    ctx.restore();
    platformerState.book.glow = 10 + Math.sin(Date.now() / 300) * 5;
    ctx.drawImage(platformerState.assets.player, player.x, player.y, player.width, player.height);
    if (checkCollision(player, platformerState.book)) {
        document.removeEventListener('keydown', platformerKeyDown);
        document.removeEventListener('keyup', platformerKeyUp);
        cancelAnimationFrame(animationFrameId);
        switchScreen(epilogueScreen);
        return;
    }
    animationFrameId = requestAnimationFrame(platformerLoop);
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    switchScreen(startScreen);
    populatePhaseMenu();
});
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
challengeButton.addEventListener('click', startCombat);
useHintButton.addEventListener('click', useHint);
backToStartButton.addEventListener('click', () => {
    populatePhaseMenu();
    switchScreen(startScreen);
});
continueToNextPhaseButton.addEventListener('click', () => {
    state.currentPhaseIndex++;
    loadPhase(state.currentPhaseIndex);
    switchScreen(gameScreen);
});
