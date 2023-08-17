const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status-text");
const restartBtn = document.getElementById("restart");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isRunning = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    isRunning = true;
};

function cellClicked() {
    // Getting the cellIndex attributes from the HTML
    const cellIndex = this.getAttribute("cellIndex");
    
    // Checking if the cellIndex is empty
    if(options[cellIndex] != "" || !isRunning) {
        return; 
    }
    // If cellIndex is empty trigger the updateCell
    else {
        updateCell(this, cellIndex);
        checkWinner();
        console.log(this);
    }
};

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
};

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner() {
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        // This will get the 2nd array values
        const cellA = options[condition[0]]; //[i][0]
        console.log("This is cellA : " + cellA);
        const cellB = options[condition[1]]; //[i][1]
        console.log("This is cellB : " + cellB);
        const cellC = options[condition[2]]; //[i][2]
        console.log("This is cellC : " + cellC);

        if(cellA == "" || cellB == "" || cellC == "") {
            // console.log("options (with blanks) : " + options);
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            // console.log("options (wining) : " + options);
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        isRunning = false;
    }
    else if(!options.includes("")) {
        statusText.textContent = `Draw!`;
        isRunning = false;
    }
    else {
        changePlayer();
    }
};  

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    isRunning = true;
};

