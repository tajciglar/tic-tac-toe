// create first page where players can enter their names

const board = document.getElementById("gameboard");

const players = (name, marker) => {
    return {name, marker}
}

const player1 = players("Taj")
const player2 = players("")
