var board;
var playerO = "O";
var playerX = "X"
var currPlayer;
var gameOver;
var count;

window.onload = function(){
    setGame();
}

function setGame() {
    count = 0;
    currPlayer = playerO;
    gameOver = false;
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    document.querySelector('.result').innerText = '';

    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            // <div id></div>
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add('tile');
            if(r == 0 || r == 1){
                tile.classList.add('horizontal-line');
            }
            if(c == 0 || c == 1){
                tile.classList.add('vertical-line');
            }

            tile.addEventListener("click",setTile);
            boardDiv.append(tile);

        }
    }
}
function setTile(){
    if(gameOver){
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(board[r][c] != ' '){
        return;
    }
    board[r][c] = currPlayer;
    this.innerText = currPlayer;
    count++;
    // console.log(count);
    checkWinner();

    if(currPlayer === playerO){
        currPlayer =  playerX;
    }
    else {
        currPlayer =  playerO; 
    }

}

function checkWinner(){
    // horizontal 

    for(let r=0;r<3;r++){
        if(board[r][0] !== ' ' && board[r][0] === board[r][1] && board[r][1] === board[r][2]){
            for(let i=0;i<3;i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add('winner');
                
            }
            gameOverfunc();
            return;
        }
    }


    //vetically
    for(let c=0;c<3;c++){
        if(board[0][c] !== ' ' && board[0][c] === board[1][c] && board[1][c] === board[2][c]){
            for(let i=0;i<3;i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add('winner');
                
            }
            gameOverfunc();
            return;
        }
    }

    //diagnals

    if(board[0][0] !== ' ' && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
        for(let i=0;i<3;i++){
            let tile = document.getElementById(i.toString()+'-'+i.toString());
            tile.classList.add('winner');
        }
        gameOverfunc();
        return;
    }
    if(board[2][0] !== ' ' && board[2][0] == board[1][1] && board[1][1] == board[0][2]){
        for(let i=0;i<3;i++){
            let tile = document.getElementById((2-i).toString()+'-'+i.toString());
            tile.classList.add('winner');
        }
        gameOverfunc();
        return;
    }

    if(count === 9){
        gameOver = true;
        document.querySelector('.result').innerText = `Game Over !! No one Won`;

    }
    
}

function gameOverfunc() {
    gameOver = true;
    document.querySelector('.result').innerText = `${currPlayer} Wins`;
}
function restart(){
    setGame();
}