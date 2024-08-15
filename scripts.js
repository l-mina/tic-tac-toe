
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
        //console.log(`${getActivePlayer().name}'s turn.`);
    };

    const resetGame = () => {
        const b = board.getBoard();
        for(let i = 0; i < 3; i++){
            b[i] = [];
            for(let j = 0; j < 3; j++){
                b[i].push(Cell());
            }
        }
       
    };

    const gameFull = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if((board.getBoard())[i][j].getMark()=="") return false;
            }
        }
        return true;
    };

    const checkWin = (row,column) => {

        const checkRow = () => {
            if(
                (
                    (board.getBoard())[row][0].getMark()===
                    (board.getBoard())[row][1].getMark()
                ) &&
                (
                    (board.getBoard())[row][1].getMark()===
                    (board.getBoard())[row][2].getMark()
                ) &&
                (
                    (board.getBoard())[row][0].getMark()===
                    (board.getBoard())[row][2].getMark()
                ) &&
                (
                    (board.getBoard())[row][0].getMark()!=
                    " "
                ) &&
                (
                    (board.getBoard())[row][1].getMark()!=
                    " "
                ) &&
                (
                    (board.getBoard())[row][2].getMark()!=
                    " "
                )
            ) {console.log("row1");return true;}
            return false;
        };
        const checkCol = () => {
            if(
                (
                    (board.getBoard())[0][column].getMark()===
                    (board.getBoard())[1][column].getMark()
                ) &&
                (
                    (board.getBoard())[1][column].getMark()===
                    (board.getBoard())[2][column].getMark()
                ) &&
                (
                    (board.getBoard())[0][column].getMark()===
                    (board.getBoard())[2][column].getMark()
                ) &&
                (
                    (board.getBoard())[0][column].getMark()!=
                    " "
                ) &&
                (
                    (board.getBoard())[1][column].getMark()!=
                    " "
                ) &&
                (
                    (board.getBoard())[2][column].getMark()!=
                    " "
                ) 
            ) {console.log("col1");return true;}
            return false;
        };
        const checkDiag1 = () => {
            if(
                (
                    (board.getBoard())[0][0].getMark()===
                    (board.getBoard())[1][1].getMark()
                ) &&
                (
                    (board.getBoard())[1][1].getMark()===
                    (board.getBoard())[2][2].getMark()
                ) &&
                (
                    (board.getBoard())[0][0].getMark()===
                    (board.getBoard())[2][2].getMark()
                ) &&
                (
                    (board.getBoard())[0][0].getMark() !=
                    ""
                ) &&
                (
                    (board.getBoard())[1][1].getMark() !=
                    ""
                ) &&
                (
                    (board.getBoard())[2][2].getMark() !=
                    ""
                ) 
            ) {console.log("dia1");return true;}
            return false;
        };
        const checkDiag2 = () => {
            if(
                (
                    (board.getBoard())[0][2].getMark()===
                    (board.getBoard())[1][1].getMark()
                ) &&
                (
                    (board.getBoard())[1][1].getMark()===
                    (board.getBoard())[2][0].getMark()
                ) &&
                (
                    (board.getBoard())[0][2].getMark()===
                    (board.getBoard())[2][0].getMark()
                ) &&
                (
                    (board.getBoard())[0][2].getMark() !=
                    "" 
                ) &&
                (
                    (board.getBoard())[1][1].getMark() !=
                    ""
                ) &&
                (
                    (board.getBoard())[2][0].getMark() !=
                    ""
                ) 
            ) {console.log("dia2");return true;}
            return false;
        };
        return (checkRow()||checkCol()||checkDiag1()||checkDiag2());
        
    };

    const playRound = (row,column) => {
        //console.log(`Dropping ${getActivePlayer().name}'s token into row ${row}, column ${column}...`);
        if(board.playSpot(row,column, getActivePlayer())){

            if(checkWin(row,column)){
                alert(`${getActivePlayer().name} has won!`);
                resetGame();
            } else if(gameFull()){
                alert(`It's a draw.`);
                resetGame();
            };
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
