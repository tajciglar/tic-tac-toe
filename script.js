
const gameModule = (function() {

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
        player1 = createPlayer(firstNameValue, "x")
        player2 = createPlayer(secondNameValue, "O");

        console.log(player1.name);
        console.log(player1.marker);
        
        showGameBoard();
    });

    //factory function to create a player
    function createPlayer (name, marker) {
        return {name, marker};
    }

    function showGameBoard () {
        const container = document.getElementById("container");
        const form = document.querySelector(".form");
        form.remove();
        const board = document.createElement("div");
        board.setAttribute("id", "gameBoard");
        container.appendChild(board); 
    }



})();






