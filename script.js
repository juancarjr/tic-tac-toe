function toggleDivs() {
    inputDiv = document.querySelector('.names')
    displayDiv = document.querySelector('.display')
    document.querySelector('.player1').textContent = document.querySelector('#player1-name').value
    document.querySelector('.player2').textContent = document.querySelector('#player2-name').value
    inputDiv.classList.toggle('hide')
    displayDiv.classList.toggle('hide')
    onOffSwitch()

}

function onOffSwitch() {
    if (gameBoard.boardState == 'off') gameBoard.boardState = 'on'
    else gameBoard.boardState = 'off'
}

async function check(game) {
    const {p1, p2, p3, p4, p5, p6, p7, p8, p9} = game
    let arr = [[p1, p2, p3], [p4, p5, p6], [p7, p8, p9], [p1, p4, p7],
            [p2, p5, p8], [p3, p6, p9],[p1, p5, p9], [p3, p5, p7]]
    
    for (i in arr) {
        if (arr[i].every((e) => e == 'X')) {
            console.log(arr[i], "'X' wins")
            await new Promise(r => setTimeout(r, 1500));
            boardReset()
            ++document.querySelector(`#score1`).textContent
            return 
        }
    }

    for (i in arr) {
        if (arr[i].every((e) => e == 'O')) {
            console.log(arr[i], "'O' wins")
            await new Promise(r => setTimeout(r, 1500));
            boardReset()
            ++document.querySelector(`#score2`).textContent
            return
        }
    }

    console.log('No winner yet')
}

function updateTile(position) {
    if (!document.querySelector(`[data-position=${position}]`).textContent) {
    gameBoard[position] = gameBoard.currentMarker
    document.querySelector(`[data-position=${position}]`).textContent = gameBoard[position]
    check(gameBoard)
    changePlayer()
    }
}

function changePlayer() {
    if (gameBoard.currentMarker == 'X') {
        gameBoard.currentMarker = 'O'
    } else gameBoard.currentMarker = 'X'
}

function reset() {
    document.querySelector('#player1-name').value = ''
    document.querySelector('#player2-name').value = ''
    document.querySelector(`#score2`).textContent = 0
    document.querySelector(`#score1`).textContent = 0
    boardReset()
}

function boardReset() {
    onOffSwitch()
    document.querySelectorAll(`.tiles`).forEach((e) => { e.textContent = ''})
    Object.assign(gameBoard, {p1: '', p2: '', p3: '', 
                    p4: '', p5: '', p6: '', p7: '', p8: '', p9: '',})
    onOffSwitch()
}

gameBoard = (function() {
    let p1 = '';
    let p2 = '';
    let p3 = '';
    let p4 = '';
    let p5 = '';
    let p6 = '';
    let p7 = '';
    let p8 = '';
    let p9 = '';
    let currentMarker = 'X'
    let boardState = 'off'
    return {p1, p2, p3, p4, p5, p6, p7, p8, p9, currentMarker, boardState}
})();

window.addEventListener("click", function(e) {
    if(e.target.classList.contains('start')) {
        toggleDivs()        
    } else if (e.target.classList.contains('reset')) {
        reset()
        toggleDivs()        
    } else if (e.target.classList.contains('tiles')) {
        if (gameBoard.boardState == 'on') updateTile(e.target.dataset.position)
    }
});

