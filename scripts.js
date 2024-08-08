
// Store game-board as an array inside Game-board object
// Players will be stored in objects
// Object to control flow of game
// Use factories
// Single instances wrap inside an I.I.F.E., to not be reused

const  gameBoard = (function(){
    const board = [];
    const row = 3;
    const col = 3;

    for(let i = 0; i < row; i++){
        board[i] = [];
        for(let j = 0; j < col; j++){
            board[i][j] = null;
        }
    }
    console.log(board);

    return function play(row,col,color){
        board[row][col] = color;
        console.log(board);
    }
})();

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
gameBoard(2,1,player1.color);