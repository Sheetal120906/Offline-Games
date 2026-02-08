let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newgameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".message");
let msg = document.querySelector("#msg");

let turnO = true;   // Player = O, Computer = X
let gameOver = false;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable and clear all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show result
const showWinner = (winner) => {
    if (winner === "O") {
        msg.innerText = "Congrtaulations! You Won.";
    } else {
        msg.innerText = "You Lose! Try Again";
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
};

// Check winner or draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner(posVal1);
                return;
            }
        }
    }

    // Draw check
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled && !gameOver) {
        msg.innerText = "🤝 It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        gameOver = true;
    }
};

// Computer move (X)
const computerMove = () => {
    if (gameOver) return;

    let emptyBoxes = [];
    boxes.forEach((box) => {
        if (box.innerText === "") {
            emptyBoxes.push(box);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turnO = true;

    checkWinner();
};

// Player move (O)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO && !gameOver && box.innerText === "") {
            box.innerText = "O";
            box.disabled = true;
            turnO = false;
            checkWinner();

            // Computer plays after short delay
            setTimeout(() => {
                computerMove();
            }, 500);
        }
    });
});

// Reset game
const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newgameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
