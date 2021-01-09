let currPlayer = "X";
let state = ["", "", "", "", "", "", "", "", ""];
let gameRunning = true;
let x=0;
let o=0;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMsg = () => `Congratulations... !!!  <span class = "red1">Player  ${currPlayer}</span> is winner 🙌 `;
const tieMsg = () => `Game Tied!!`;
const turnMsg = () => `Player <span class = "red1">${currPlayer}</span>'s Turn ...`;

const statusDisplay = document.querySelector('.game--status');

statusDisplay.innerHTML = turnMsg();


function handleCellPlayed(clickedCell,clickedCellIndex){
    state[clickedCellIndex] = currPlayer;
    clickedCell.innerHTML = currPlayer;
}

function handleChangePlayer()
{
    currPlayer = currPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = turnMsg();
}

function handleValidation(){
    let done = false;
    for(let i=0;i<8;i++)
    {
        const condition = winConditions[i];
        let j = state[condition[0]];
        let k = state[condition[1]];
        let l = state[condition[2]];

        if(j=='' || k=='' || l=='')
            continue;
        if(j==k && k==l)
        {
            done = true;
            break
        }
    }
    if(done)
    {
        statusDisplay.innerHTML = winningMsg();
        if(currPlayer=="X")
            x++;
        else
            o++;

        document.getElementById("x").innerHTML = x;
        document.getElementById("o").innerHTML = o;
        gameRunning = false;
        return;
    }

    let tie = state.includes("");
    if(!tie)
    {
        statusDisplay.innerHTML = tieMsg();
        gameRunning = false;
        return;
    }
    handleChangePlayer();
}

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(state[clickedCellIndex] !== "" || !gameRunning)
        return;

    handleCellPlayed(clickedCell,clickedCellIndex);
    handleValidation();
}

function handleRestart(){
    currPlayer = "X";
    state = ["", "", "", "", "", "", "", "", ""];
    gameRunning = true;
    statusDisplay.innerHTML = turnMsg();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

function handleReset(){
    x=0;
    o=0;
    document.getElementById("x").innerHTML = x;
    document.getElementById("o").innerHTML = o;
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestart);
document.querySelector('.board--reset').addEventListener('click', handleReset);