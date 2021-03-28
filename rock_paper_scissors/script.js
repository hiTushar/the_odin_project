const choice = ['paper', 'rock', 'scissors'];

const outcomes = { // minimal possible outcomes
    'paper rock'    : 'paper',
    'paper scissors': 'scissors',
    'rock scissors' : 'rock'
}

let pointsTable = {'you': 0, 'computer': 0, 'draw': 0};


function select(event){
    game(event.target.id); 
}

function game(playerSelection){
    let computerSelection = computerPlay(); 
    console.log(playerSelection, computerSelection);
    let winner = playRound ( playerSelection, computerSelection );
    
    updateTable(winner);
    displayResults(pointsTable); 
    checkWin(); 
   
    // console.log(pointsTable);
}


function computerPlay(){
    return choice[Math.floor(Math.random() * 3)]
}


function playRound(player, computer){
    let trial = [player, computer].sort().join(' '); // sorting reduces possible permutations
    let result = outcomes[trial];
    
    if(result){
        if(player === result){ // if it was the player who chose the winning result
            return 'you';
        }
        else{
            return 'computer';
        }
    }
    else{ // undefined is returned in case of a draw
        return 'draw'; 
    }
}

function updateTable(winner){
    pointsTable[winner]++;
}


function displayResults(points){
    document.getElementById("results").innerHTML = `<p>You: ${points.you} | Computer: ${points.computer} | Draw: ${points.draw}</p>`;
}

function checkWin(){
    for(let winner in pointsTable){
        if(pointsTable[winner] === 5){
            if(winner !== 'draw'){
                displayWinner(winner); 
                resetOption();
            }
        }
    }
}


function displayWinner(winner){
    console.log('winner: '+ winner);
    document.getElementById("arena").innerHTML = `<span>${winner.charAt(0).toUpperCase() + winner.slice(1)} won!!</span>`;
}

function resetOption(){
    document.getElementById('results').innerHTML += '<button onclick="location.reload()">Reset</button>';
}