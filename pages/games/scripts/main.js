/////////////////сворачивание и розворачивание по нажатию кнопок
// breakout
// let  breakoutPageBtn = document.getElementById('breakout');
// let breakoutPageBlock = document.getElementById('breakout_block');

// breakoutPageBtn.addEventListener('click', function(e){
//     e.preventDefault();

//     // remove
//     if(snakePageBlock.classList.contains('active')) {
//         snakePageBlock.classList.remove('active');
//     };

//     // add
//     if(breakoutPageBlock.classList.contains('active')) {
//         breakoutPageBlock.classList.remove('active');
//       }else {
//         breakoutPageBlock.classList.add('active');
//     };
//   });

// snake
// let snakePageBtn = document.getElementById('snake');
// let snakePageBlock = document.getElementById('snake_block');

// snakePageBtn.addEventListener('click', function(e){
//     e.preventDefault();

//     // remove
//     if(breakoutPageBlock.classList.contains('active')) {
//         breakoutPageBlock.classList.remove('active');
//     };
//     // add
//     if(snakePageBlock.classList.contains('active')) {
//         snakePageBlock.classList.remove('active');
//       }else {
//         snakePageBlock.classList.add('active');
//     }
//   });
//////////////////////////////////////////////////////////////////////////////////
//breakout

let canvas = document.getElementById("breakout_canvas");//доступ к элементу
let ctx = canvas.getContext("2d");//задаем контекст канваса в 2 измерениях

let x = canvas.width/2;//начальное положение по Х
let y = canvas.height-30;//начальное положение по У

let dx = 2;//координата движения по Х
let dy = -2;//координата движения во У

let ballRadius = 10;//радиус мяча

let paddleHeight = 10;//высоста ракетки
let paddleWidth = 75;//ширина ракетки
let paddleX = (canvas.width-paddleWidth)/2;//начальное расположение по Х

let rightPressed = false;//правая кнопка нажатие
let leftPressed = false;//левая кнопка нажатие

let brickColumnCount = 5;//количество карипичей в колонке
let brickRowCount = 3;//количкство строк с кирпичами
let brickWidth = 75;//ширина кирпича
let brickHeight = 20;//высота кирпича
let brickPadding = 10;//отступ кирпичей друг от друга
let brickOffsetTop = 30;//оступ сверху
let brickOffsetLeft = 30;//отступ слева

let score = 0;//переменная для счета
let lives = 3;//переменная для хранения жизней

let bricks = [];//масив кирпичей
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    };
};//цикл создает кирпичи по столбцам и рядам

function drawBall() {
    ctx.beginPath();//начало
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);//рисует шар
    ctx.fillStyle = "greenyellow";//цвет для шара
    ctx.fill();//закрашивает шар полностью
    ctx.closePath();//конец
};//функция рисования мяча с настройками и координатами

function drawPaddle() {
    ctx.beginPath();//начало
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);//рисует прямоугольник
    ctx.fillStyle = "greenyellow";//цвет дл прямоугольника
    ctx.fill();//закрашивает прямоугольник полностью
    ctx.closePath();//конец
};//функция рисования ракетки с настройками и координатами

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;//розчитывает новые координаты для колонки
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;//розчитывает новые координаты для столбца
                bricks[c][r].x = brickX;//определяет координаты по Х
                bricks[c][r].y = brickY;//определяет координаты по У
                ctx.beginPath();//начало
                ctx.rect(brickX, brickY, brickWidth, brickHeight);//начальные координаты
                ctx.fillStyle = "#greenyellow";//цвет
                ctx.fill();//закрашивает прямоугольник полностью
                ctx.closePath();//конец
            };//проверка на попадание
        };//цикл строки
    };//цикл колонки
};//функция рисования кирпичей с настройками и координатами

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//стирает предидущую итерацию
    drawBricks();//вызов функуции отрисовки кирпичей
    drawBall();//вызов функуции отрисовки мяча
    drawPaddle();//вызов функции отрисовки ракетки
    drawScore();//вызов функции подсчета очков
    drawLives();//вызов функции подсчета жизней
    collisionDetection();//вызов функции столкновений с кирпичем

    x += dx;//направление движения по Х
    y += dy;//направление движения по У
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    };//отскоки по х(ширине)
    
    if(y + dy < ballRadius) {
        dy = -dy;//движение от стенок
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }//отскок от ракетки
        else {
            lives--;//декрементятся жизни
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }//конец
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            };//минус жизнь
        };//конец игры и минус жизнь
    };//остскоки по У (высоте), проигрых в случаи касания нижней грани

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    };//движение ракетки
};//функция прорисовки

document.addEventListener("keydown", keyDownHandler, false);//событие на нажатие кнопки
document.addEventListener("keyup", keyUpHandler, false);//событие на отпуск нажатой кнопки

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    };
}//функция на нажатие кнопок вправо и влево

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    };
};//функция на отпуск кнопок вправо и влево

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];//координата кирпича
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;//перенаправить мяч по У
                    b.status = 0;
                    score++;//инкрементится счет
                    if(score == brickRowCount*brickColumnCount) {
                        alert("Это победа, поздравляю");
                        document.location.reload();
                    };//проверка на случай победы
                };
            };//проверка на попадание
        };//цикл для колонки
    };//циклы для столбца
};//функция обнаружения столкновений с кирпичями

function drawScore() {
    ctx.font = "16px Roboto";//шрифт
    ctx.fillStyle = "greenyellow";//цвет
    ctx.fillText("Score: "+score, 8, 20);//фактический текст для отображения
};//функция подсчета очков

function drawLives() {
    ctx.font = "16px Roboto";//шрифт
    ctx.fillStyle = "greenyellow";//цвет
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);//фактический текст для отображения
};//функция подсчета жизней

let startBtn = document.querySelector(".breakout_start");

startBtn.addEventListener("click",() => {
    let interval = setInterval(draw, 12);//вызов функции с интервалом
});//запуск игры на кнопку
//////////////////////////////////////////////////////////////////////////////////////
