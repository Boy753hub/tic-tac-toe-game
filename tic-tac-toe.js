const getElement = document.getElementById("background");
const cubes = document.getElementsByClassName("cube");
const endgame = document.getElementById('endgame_background')
const NewGameButton = document.getElementById('new-game')
const playerElement = document.getElementById('player');
const playerId = document.getElementById('player1_score')
const computerId = document.getElementById('Computer_score')
let Xscore = 0
let Oscore = 0
let currentPlayer = "x";
let cube = [];
let computerCube = []
let compArray = ['0','1','2','3','4','5','6','7','8']
const winningPositions = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function game(){
    getElement.addEventListener('click', (e)=>{
        let id = e.target.id;
        if(isNaN(id)) return;
        if(id === "") return
        if(cube.includes(id)) return;
        if(computerCube.includes(id)) return;
        insertXamdY(id);
        if(currentPlayer === "x"){
            cube.push(id);
            currentPlayer = "o";
        } 
        CheckEmptyCube()
        gameOver();
        console.log(cube)
        console.log(computerCube)
        console.log(compArray)
        console.log(boolea)
    });
}

function insertXamdY(id) {
    if(isNaN(id))return
    const getCube = document.getElementById(`${id}`);
    if (getCube) {
      let markup = `<img src="/ICONS/${currentPlayer}.png" alt="${currentPlayer}" class="${currentPlayer}">`;
      getCube.insertAdjacentHTML('afterbegin', markup);
    } else {
      console.log(`Element with id '${id}' not found.`);
    }
  }
  

function CheckEmptyCube(){
    //maping what cubes are left 
    let index = compArray.indexOf(cube[cube.length - 1])
    let index2 = compArray.indexOf(computerCube[computerCube.length - 1])
    if(index > -1){compArray.splice(index, 1)}
    if(index2 > -1){compArray.splice(index2, 1)}
    // console.log(compArray)
}
function putoOnRandom(){
    let item = compArray[Math.floor(Math.random()*compArray.length)];
    while(computerCube.includes(item)){
        item = compArray[Math.floor(Math.random()*compArray.length)];
    }
    insertXamdY(String(item));
    computerCube.push(String(item))
    currentPlayer = 'x'
}
function checkIfIsEpmtyOrNot(){
    //checking where computer should put o
    
        for (let i = 0; i < winningPositions.length; i++) {
            let [a, b, c] = winningPositions[i];
          if (cube.includes(String(a)) && cube.includes(String(b)) && !cube.includes(String(c))) {
                 putonId(c)
              return; // Exit the function after making a move
            } else if (cube.includes(String(a)) && cube.includes(String(c)) && !cube.includes(String(b))) {
                putonId(b)
                return; // Exit the function after making a move
            } else if (cube.includes(String(b)) && cube.includes(String(c)) && !cube.includes(String(a))) {
                putonId(a)
                return; // Exit the function after making a move
            }
        }
        // If no empty position is found in winning combinations, put o on a random free cube
        putoOnRandom();
    }
let boolea = true
function checkIfComputerCanWin(){
    for (let i = 0; i < winningPositions.length; i++) {
        let [a, b, c] = winningPositions[i];
      if (computerCube.includes(String(a)) && computerCube.includes(String(b)) && !computerCube.includes(String(c))) {
            putonId2(c)
            boolea = true
          return; // Exit the function after making a move
        } else if (computerCube.includes(String(a)) && computerCube.includes(String(c)) && !computerCube.includes(String(b))) {
            putonId2(b)
            boolea = true
            return; // Exit the function after making a move
        } else if (computerCube.includes(String(b)) && computerCube.includes(String(c)) && !computerCube.includes(String(a))) {
            putonId2(a)
            boolea = true
            return; // Exit the function after making a move
        }
    }
    //if not just return false
    return boolea = false
}
    
    
    function putonId(id){
        if(!compArray.includes(String(id))){
            putoOnRandom()
        }else{
            insertXamdY(String(id));
            computerCube.push(String(id));
            currentPlayer = 'x';
        }
        
    }
    
    function putonId2(id){
        if(!compArray.includes(String(id))){
            checkIfIsEpmtyOrNot()
        }else{
        insertXamdY(String(id));
        computerCube.push(String(id));
        currentPlayer = 'x';        
        }
    }
    
    function checkIfGameIsFinished(){
        let winner = null;
        //player winning is here
        for(let i=0; i<winningPositions.length; i++){
            const [a, b, c] = winningPositions[i];
            if(cube.includes(String(a)) && cube.includes(String(b)) && cube.includes(String(c))){
                winner = 'x';
                break
                //checking if computer won
            }else if(computerCube.includes(String(a)) && computerCube.includes(String(b)) && computerCube.includes(String(c))){
                winner = 'o';
                break;
            }
        }
        
        //game ending logic
        if(winner){
            endgame.style.display = "flex"
            playerElement.innerHTML = `${winner.toUpperCase()} wins!`;
                if(winner === 'x'){
                    Xscore+= 0.5
                }else{
                    Oscore++
                }
            playerId.innerHTML = Math.floor(Xscore)
            computerId.innerHTML = Math.floor(Oscore)
            NewGameButton.addEventListener('click', ()=>{
                endgame.style.display = "none"
                return resetGame()
            })
        }else if(cube.length + computerCube.length === 9){
            endgame.style.display = "flex"
            playerElement.innerHTML = "It's a draw!";
            NewGameButton.addEventListener('click', ()=>{
                endgame.style.display = "none"
                resetGame()
            })
        }
    }
    function gameOver(){
        
        checkIfGameIsFinished()
        
        // actions of computer
        if(currentPlayer === "o"){
            if(cube.length === 0){
                checkIfGameIsFinished()
            }
            if(cube.length === 1){
                // putting o on random free cube
                putoOnRandom()
                CheckEmptyCube()
                checkIfGameIsFinished()
            }
            if(cube.length > 1 && cube.length < 6){
                CheckEmptyCube()
                checkIfComputerCanWin()
                checkIfGameIsFinished()
                if(!boolea){
                    checkIfIsEpmtyOrNot()
                } 
            }
            if(cube.length >= 8){
                CheckEmptyCube()
                checkIfComputerCanWin()
                checkIfGameIsFinished()
                if(!boolea){
                    putoOnRandom()
                } 
            }
        }
    }
    
    function resetGame(){
        compArray = ['0','1','2','3','4','5','6','7','8']
        currentPlayer = 'x'
        winner = null;
        computerCube = []
        cube = [];
        for(let i=0; i<cubes.length + computerCube.length; i++){
            cubes[i].innerHTML = "";
        }
    }
    game();
    
    //errors to fix: 
    //if x won and then 0 won too winner is overwritten and o won is displayed 
