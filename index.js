const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

// Let's create a function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //ui pe empty karana parega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
// initalize boxes with css properyty again
box.classList=`box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko"
        swapTurn();
        checkGameOver();
    }
}
function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[2]] === gameGrid[position[1]])) {
            if (gameGrid[position[0]] === "X") answer = "x";

            else {
                answer = "O";

            }
            // disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            // now we know x/o winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });
    //it means we hava winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // when there is no winner
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });
    if(fillCount==9){
        gameInfo.innerText="Game Tied!"
        newGameBtn.classList.add("active");
    }
}

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // UI Upadate;
    gameInfo.innerText = `Current Player ${currentPlayer}`;
}
newGameBtn.addEventListener("click", initGame);
