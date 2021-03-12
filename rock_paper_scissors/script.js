const choice = ['paper', 'rock', 'scissors'];

function computerPlay(){
    return choice[Math.floor(Math.random() * 3)]
}

const outcomes = {
    'paper rock'    : 'paper',
    'paper scissors': 'scissors',
    'rock scissors' : 'rock'
}

function playRound(player, computer){
    let trial = [player, computer].sort().join(' '); 
    let result = outcomes[trial];
    
    if(result){
        if(player === result){
            // return `${player} beats ${computer}. You Win!!`;
            return 'You';
        }
        else{
            // return `${computer} beats ${player}. Computer Wins!!`;
            return 'Computer';
        }
    }
    else{
        return 'Draw'; 
    }
}

function game(n){
    
    let pointsTable = {'You': 0, 'Computer': 0, 'Draw': 0};
    
    while(n--){
        let computerSelection = computerPlay(); 

        let playerSelection = null;
        while(!choice.includes(playerSelection)){
            playerSelection = prompt(`You     - ${pointsTable.You} | Computer- ${pointsTable.Computer} | Draw    - ${pointsTable.Draw}\
        \nRock, Paper or Scissors?`).toLowerCase(); 
        }

        let winner = playRound ( playerSelection, computerSelection );
       
        pointsTable[winner]++;

        console.log(pointsTable);
    }
    alert(`You     : ${pointsTable.You} | Computer: ${pointsTable.Computer} | Draw    : ${pointsTable.Draw}`);
    // alert(JSON.stringify(pointsTable));
}


game(5); 
