

const GameBoard = (() => {
    let gameboard = ["" , "" ,"" , "" ,"" , "" ,"" , "" ,""] ;

    const render = () => {
        let boardHTML = "" ;
        gameboard.forEach((square , index) => {
            boardHTML+= `<div class="square" id="square-${index}">${square}</div>`
        }
        )
        document.querySelector(".board").innerHTML = boardHTML

        const squares = document.querySelectorAll('.square')

        squares.forEach((square) => {
            square.addEventListener("click" , Game.handleClick)
        })

    }

    const update = (index , value) => {
        gameboard[index] = value
        render()
    }

    const getGameBoard = () => gameboard 


    return {
        render, update , getGameBoard
    }
}
)();

const createPlayer = (name , mark) => {
    return {
        name ,
        mark
    }
}

const Game = (() => {
    let players = [] 
    let currentPlayerIndex ;
    let gameOver = false ;

    const start = () => {
        players = [
        createPlayer(document.querySelector("#player1").value , "X"),
        createPlayer(document.querySelector("#player2").value , "O")
        ]
        currentPlayerIndex = 0 ;
        gameOver = false ;
        GameBoard.render()


    }

    const handleClick = (event) => {
        if(gameOver) {
            return;
        }

        let index = parseInt(event.target.id.split("-") [1]);
        if(GameBoard.getGameBoard() [index] !=="")
            return;

        GameBoard.update(index , players[currentPlayerIndex].mark)

        if(checkForWin(GameBoard.getGameBoard() , players[currentPlayerIndex].mark)) {
            gameOver = true
            alert(`Player ${players[currentPlayerIndex].name} Won !`)
        } else if (checkForTie(GameBoard.getGameBoard())) {
            gameOver = true 
            alert("it's a tie")
        }

        

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0 ;
        
    }

    const restart = () => {
        for(let i = 0 ; i <= 8 ; i ++) {
            GameBoard.update(i , "")
        }
        gameOver = false
        GameBoard.render()
    }

    return{
        start , handleClick , restart ,
    }
}
)() ;


function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0 ; i < winningCombinations.length ; i++ ) {
        const [a , b , c] = winningCombinations[i]
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true
        }
        
    }

    return false
}

function checkForTie(board) {
    return board.every(cell => cell !== "")
}


const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click" , () => {
    Game.start();
}
)



const RestartBtn = document.querySelector("#restartBtn");
RestartBtn.addEventListener("click" , () => {
    Game.restart();

    
})