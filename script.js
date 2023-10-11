
const gameModule = (function() {

    //set array
    let gameBoard = new Array(9);
    // set players

    let player1;
    let player2;

    // create first page where players can enter their names
    const namesForm = document.getElementById("namesForm");

    namesForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const firstNameInput = document.querySelector('input[name="firstName"]');
        const secondNameInput = document.querySelector('input[name="secondName"]');

        const firstNameValue = firstNameInput.value;
        const secondNameValue = secondNameInput.value;

        // create players
        player1 = createPlayer(firstNameValue, "X", true)
        player2 = createPlayer(secondNameValue, "O", false);
        const form = document.querySelector(".form");
        form.remove();
        showGameBoard();
    });

    //factory function to create a player
    function createPlayer (name, marker, turn) {
        return {name, marker, turn};
    }


    // function that shows game board
    function showGameBoard () {
        const container = document.getElementById("container");
        container.style.display = "flex";
        container.style.flexFlow = "column";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";

        const board = document.createElement("div");
        board.setAttribute("id", "gameBoard");
        container.appendChild(board); 

        // Set the board's width and height to make it a square
        board.style.width = "600px"; // Set the desired width (adjust as needed)
        board.style.height = "600px"; // Set the same height as the width
        board.style.display = "grid";
        board.style.gridTemplateColumns = "repeat(3, 1fr)";
        board.style.gridTemplateRows = "repeat(3, 1fr)";

        
        // Create the game board cells
        for (let row = 0, i = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++, i++) {
                const cell = document.createElement("div");
                cell.classList.add(`cell`);
                cell.setAttribute("data-id", i); 
                cell.style.border = "1px solid black";
                cell.style.fontSize = "150px";
                cell.style.textAlign = "center";
                cell.style.padding = "1px";
                cell.setAttribute("data-row", row);
                cell.setAttribute("data-col", col);
                
                board.appendChild(cell);
            }
        }
        displayController(board);
    }

    function displayController(board) {

        const container = document.getElementById("container");
        const instructionHolder = document.createElement("div");
        const instruction = document.createElement("p");
        instruction.style.fontSize = "25px";
        instruction.style.fontWeight = "bold";

        instruction.textContent = `It is ${player1.name}'s turn! (Marker: ${player1.marker})`;
        container.appendChild(instructionHolder);
        instructionHolder.appendChild(instruction);


        // Create a reset button 
        const resetHolder = document.createElement("div");
        container.appendChild(resetHolder);

        const reset = document.createElement("button");
        reset.setAttribute("type", "reset");
        reset.setAttribute("value", "reset");
        reset.style.textAlign = "center";
        reset.textContent = "Reset game board";
        resetHolder.appendChild(reset);

        // Select all cells within the board
        const cells = board.querySelectorAll(".cell");

        reset.addEventListener("click", () => {
            cells.forEach((cell) => {
                cell.textContent = "";
                gameBoard = new Array(9);
                instruction.textContent = `It is ${player1.name}'s turn! (Marker: ${player1.marker})`;
            });
        });

        
        
        // Add a click event listener to each cell
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                if (!gameBoard[cell.dataset.id]) { // Check if the cell is empty
                    if (player1.turn) {
                        gameBoard[cell.dataset.id] = player1.marker;
                        cell.textContent = player1.marker;
                        instruction.textContent = `It is ${player2.name}'s turn! (Marker: ${player2.marker})`;
                        player1.turn = false;
                        player2.turn = true;
                        if(checkForWin(gameBoard, player1.marker))
                        {
                            setTimeout(function () {
                                alert(`${player1.name} wins!`);
                            }, 100);
                            setTimeout(function () {
                                cells.forEach((cell) => {
                                    cell.textContent = "";
                                    gameBoard = new Array(9);
                                    instruction.textContent = `It is ${player1.name}'s turn! (Marker: ${player1.marker})`;
                                });
                            }, 200);
                            

                            
                        }                    
                    } else {
                        gameBoard[cell.dataset.id] = player2.marker;
                        cell.textContent = player2.marker;
                        instruction.textContent = `It is ${player1.name}'s turn! (Marker: ${player1.marker})`;
                        player1.turn = true;
                        player2.turn = false;
                        if(checkForWin(gameBoard, player2.marker))
                        {   
                            setTimeout(function () {
                                alert(`${player2.name} wins!`);
                            }, 100);
                            setTimeout(function () {
                                cells.forEach((cell) => {
                                    cell.textContent = "";
                                    gameBoard = new Array(9);
                                    instruction.textContent = `It is ${player1.name}'s turn! (Marker: ${player1.marker})`;
                                });
                            }, 200);
                        }                    
                    }
                } 
            });
        });
        
        function checkForWin(board, marker) {
            console.log(board, marker);
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];
            

            for (const combinations of winningCombinations) {
                const [a, b, c] = combinations;
                console.log(combinations)
                if (board[a] === marker && board[b] === marker && board[c] === marker)
                {
                    return true;
                }
            }
            return false;
        }

    }
})();






