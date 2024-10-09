const state = {
    view:{
        squares: document.querySelectorAll(".squares"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        countDownTimerId: setInterval(countDown, 1000),
        currentTime: 60,
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        alert("Game Over! O seu resultado foi:" + state.values.result);
        state.values.currentTime = 60
    }
}

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNum = Math.floor(Math.random() * 9);
    let boxRandomSquare = state.view.squares[randomNum];
    
    boxRandomSquare.classList.add("enemy");
    state.values.hitPosition = boxRandomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        });
    });
}

function init(){
    moveEnemy();
    addListenerHitBox();
}

init();