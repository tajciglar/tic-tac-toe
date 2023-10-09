
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
        player1 = createPlayer(firstNameValue, "x", true)
        player2 = createPlayer(secondNameValue, "O", false);
        console.log(player1.turn);
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
        container.style.justifyContent = "center";
        container.style.alignItems = "center";

        const form = document.querySelector(".form");
        form.remove();

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

        instruction.textContent = `It is ${player1.name}'s turn`;

        container.appendChild(instructionHolder);
        instructionHolder.appendChild(instruction);
        // Select all cells within the board
        const cells = board.querySelectorAll(".cell");
    
        // Add a click event listener to each cell
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                let clickCounter = 0;
                if (player1.turn){
                    cell.textContent = player1.marker;
                    instruction.textContent = `It is ${player2.name}'s turn`;
                    player1.turn = false;
                    player2.turn = true;
                } else {
                    cell.textContent = player2.marker;
                    instruction.textContent = `It is ${player1.name}'s turn`;
                    player1.turn = true;
                    player2.turn = false;
                }
            });
        });

    }

})();






