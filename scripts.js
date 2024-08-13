
// Store game-board as an array inside Game-board object
// Players will be stored in objects
// Object to control flow of game
// Use factories
// Single instances wrap inside an I.I.F.E., to not be reused
function gameBoard(){
    const board = [];
    const row = 3;
    const col = 3;

    for(let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < col; j++){
            board[i].push(Cell());
        }
    }
    
    const getBoard = () => board;

    const playSpot = (rows,cols,player) => {
        /*
        const availableSpot = board.filter((row)=> row[col].getValue()===0).map(row=> row[col]);
        
        if (!availableSpot.length) return;
        */
        if(board[rows][cols].getValue()!==0) return false;
        board[rows][cols].addToken(player);
        return true;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getMark()));
        console.log(boardWithCellValues);
    };

   return { getBoard, playSpot, printBoard };
};

function Cell() {
    let value = 0;
    let mark = '';

    const addToken = (player) => {
        value = player.token;
        mark = player.mark;
    };

    const getValue = () => value;

    const getMark = () => mark;

    return {addToken,getValue,getMark};
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = gameBoard();

    const players = [
        {name: playerOneName,
         token: 3,
         mark: 'X'},
        {name: playerTwoName,
         token: 2,
         mark: 'O'}
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row,column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into row ${row}, column ${column}...`);
        if(board.playSpot(row,column, getActivePlayer())){
            switchPlayerTurn();
            printNewRound();
        };
    };

    printNewRound();

    return { playRound,getActivePlayer, getBoard: board.getBoard};
}

function displayController(){
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        // clear board
        boardDiv.textContent = "";
        // get newest version of board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        // display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        // render board
        board.forEach((row,rowIndex) =>{
            row.forEach((cell,index)=>{
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                // data attribute
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = index;
                cellButton.textContent = cell.getMark();
                boardDiv.appendChild(cellButton);
            })
        })
    }
    // event listener for board
    function clickHandlerBoard(e){
        const selectedRow = e.target.dataset.row;
        const selectedCol = e.target.dataset.column;
        if (!selectedCol || !selectedRow) return;
        game.playRound(selectedRow, selectedCol);
        updateScreen();
    }
    boardDiv.addEventListener("click",clickHandlerBoard);

    // initial render
    updateScreen();
}

displayController();
/*
function createPlayer (name){
    const playerName = name;
    const color = "red";
    return {playerName,color};
}

const player1 = createPlayer("player1");
console.log({
    playerName: player1.playerName,
    color: player1.color,
});

const player2 = createPlayer("player2");
player2.color="white";
gameBoard(2,1,player1.color);
gameBoard(1,1,player2.color);
*/