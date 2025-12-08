// board
let board;
let boardWidth = 288;
let boardHeight = 512;
let context;

// game state: 0=GetReady, 1=Game, 2=Falling, 3=GameOver
let gameState = 0;

// bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

// bird animation
let birdImgArray = [];
let birdImgIndex = 0;
let lastFrameTime = 0;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
    rotation: 0
}

// pipes
let pipeArray = [];
let pipeWidth = 52;
let pipeHeight = 320;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let baseImg;
let baseHeight = 112; // Wysokość ziemi (standard w Flappy Bird to ok. 112px)

// physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.25;
let jumpStrength = -4.5;

// score & UI
let score = 0;
let highScores = [];
let scoreimgs = [];
let messageImg;
let gameOverImg;

//AUDIO
let hitSound = new Audio();
let dieSound = new Audio();
let wingSound = new Audio();
let pointSound = new Audio();
let swooshSound = new Audio();
let musicSound = new Audio();


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // 1. Ładowanie obrazków
    let animPaths = [
        "assets/Flappy Bird/yellowbird-downflap.png",
        "assets/Flappy Bird/yellowbird-midflap.png",
        "assets/Flappy Bird/yellowbird-upflap.png"
    ];
    animPaths.forEach(path => {
        let img = new Image();
        img.src = path;
        birdImgArray.push(img);
    });

    topPipeImg = new Image();
    topPipeImg.src = "assets/Flappy Bird/pipe-green.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "assets/Flappy Bird/pipe-green.png";

    baseImg = new Image();
    baseImg.src = "assets/Flappy Bird/base.png";

    messageImg = new Image();
    messageImg.src = "assets/UI/message.png";

    gameOverImg = new Image();
    gameOverImg.src = "assets/UI/gameover.png";

    for(let i=0; i<10; i++){
        let img = new Image();
        img.src = "assets/UI/Numbers/" + i + ".png";
        scoreimgs.push(img);
    }

    // 2.Dźwięki
    hitSound.src = 'assets/Sound Efects/hit.wav';
    dieSound.src = 'assets/Sound Efects/die.wav';
    wingSound.src = 'assets/Sound Efects/wing.wav';
    pointSound.src = 'assets/Sound Efects/point.wav';
    swooshSound.src = 'assets/Sound Efects/swoosh.wav';
    musicSound.src = 'assets/Sound Efects/background.mp4';
    musicSound.loop = true;

    loadHighScores();

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird);
    document.addEventListener("mousedown", moveBird);
}

function playSound(sound) {
    try {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play error: ", e));
    } catch (e) {
        console.log("Audio not found: ", e);
    }
}

function update(time) {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    // STATE 0: GET READY
    if (gameState === 0) {
        bird.y = boardHeight / 2;
        animateBird(time);
        drawBird();

        context.drawImage(baseImg, 0, boardHeight - baseHeight, boardWidth, baseHeight);

        let msgX = (boardWidth - 184)/2;
        context.drawImage(messageImg, msgX, 100);
        return;
    }

    // STATE 1: GAME
    if (gameState === 1) {
        velocityY += gravity;
        bird.y = Math.max(bird.y + velocityY, 0);

        if (velocityY < 0) bird.rotation = -0.4;
        else {
            bird.rotation += 0.1;
            if (bird.rotation > 1.5) bird.rotation = 1.5;
        }

        if (velocityY < 2) animateBird(time);
        else birdImgIndex = 1;

        // Rysujemy rury
        for (let i = 0; i < pipeArray.length; i++) {
            let pipe = pipeArray[i];
            pipe.x += velocityX;

            if (pipe.img === topPipeImg) { //odwrócenie rury, zeby była górna
                context.save();
                context.translate(0, pipe.y + pipe.height);
                context.scale(1, -1);
                context.drawImage(pipe.img, pipe.x, 0, pipe.width, pipe.height);
                context.restore();
            } else {
                context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
            }

            if (!pipe.passed && bird.x > pipe.x + pipe.width) {
                score += 0.5;
                pipe.passed = true;
                if (score % 1 === 0) {
                    playSound(pointSound);
                }
            }

            if (detectCollision(bird, pipe)) {
                playSound(hitSound);
                gameState = 2;
            }
        }

        //ziemia
        context.drawImage(baseImg, 0, boardHeight - baseHeight, boardWidth, baseHeight);

        drawBird();

        //Kolizja z ziemią
        if (bird.y + bird.height >= boardHeight - baseHeight) {
            playSound(hitSound);
            gameState = 3;
            saveScore(score);
        }

        while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
            pipeArray.shift();
        }

        drawScore();
    }

    //FALLING
    if (gameState === 2) {
        velocityY += gravity;
        bird.y += velocityY;
        bird.rotation = 1.5;

        //rury
        drawPipesStatic();

        context.drawImage(baseImg, 0, boardHeight - baseHeight, boardWidth, baseHeight);

        // Potem ptak
        drawBird();

        //Spadanie na ziemie
        let floorY = boardHeight - baseHeight;

        if (bird.y + bird.height >= floorY) {
            bird.y = floorY - bird.height;
            playSound(dieSound);
            gameState = 3;
            saveScore(score);
        }
    }

    if (gameState === 3) {
        drawPipesStatic();
        context.drawImage(baseImg, 0, boardHeight - baseHeight, boardWidth, baseHeight);
        drawBird();
        drawGameOverUI();
    }
}


function drawBird() {
    context.save();
    context.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    context.rotate(bird.rotation);
    let img = birdImgArray[birdImgIndex];
    if (img) context.drawImage(img, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
    context.restore();
}

function animateBird(time) {
    if (time - lastFrameTime > 100) {
        birdImgIndex++;
        if (birdImgIndex >= birdImgArray.length) birdImgIndex = 0;
        lastFrameTime = time;
    }
}

function drawPipesStatic() {
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        if (pipe.img === topPipeImg) {
            context.save();
            context.translate(0, pipe.y + pipe.height);
            context.scale(1, -1);
            context.drawImage(pipe.img, pipe.x, 0, pipe.width, pipe.height);
            context.restore();
        } else {
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        }
    }
}

function drawScore() {
    let scoreStr = score.toString();
    if(scoreStr.includes('.')) scoreStr = scoreStr.split('.')[0];

    let totalWidth = scoreStr.length * 24;
    let startX = (boardWidth - totalWidth) / 2;

    for (let i = 0; i < scoreStr.length; i++) {
        let digit = parseInt(scoreStr[i]);
        let img = scoreimgs[digit];
        if(img) context.drawImage(img, startX + (i * 24), 50, 24, 36);
    }
}

function drawGameOverUI() {
    let goX = (boardWidth - 192)/2;
    context.drawImage(gameOverImg, goX, 80);

    context.fillStyle = "#ded895";
    context.fillRect(40, 150, 208, 170);
    context.strokeStyle = "#543847";
    context.strokeRect(40, 150, 208, 170);

    context.fillStyle = "#e86101";
    context.font = "16px 'Courier New'";
    context.fillText("Score: " + Math.floor(score), 60, 180);
    context.fillText("Best:", 60, 200);

    context.fillStyle = "#543847";
    for(let i=0; i<highScores.length; i++){
        context.fillText((i+1) + ". " + highScores[i], 80, 225 + (i*20));
    }

    context.fillStyle = "#83bd09";
    context.fillRect(80, 340, 128, 40);
    context.fillStyle = "white";
    context.font = "bold 16px sans-serif";
    context.fillText("PLAY AGAIN", 95, 365);
}

function placePipes() {
    if (gameState !== 1) return;

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    let action = (e.type === 'keydown' && (e.code === "Space" || e.code === "ArrowUp")) || e.type === 'mousedown';

    if (action) {
        if (gameState === 0) {
            gameState = 1;
            velocityY = jumpStrength;
            playSound(wingSound);
            musicSound.play();
            return;
        }
        if (gameState === 1) {
            velocityY = jumpStrength;
            playSound(wingSound);
        }
        if (gameState === 3) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            bird.rotation = 0;
            velocityY = 0;
            gameState = 0;
            playSound(swooshSound);
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function loadHighScores() {
    let saved = localStorage.getItem('flappyHighScores');
    highScores = saved ? JSON.parse(saved) : [];
}

function saveScore(s) {
    s = Math.floor(s);
    highScores.push(s);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    localStorage.setItem('flappyHighScores', JSON.stringify(highScores));
}