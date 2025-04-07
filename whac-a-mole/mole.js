let currentMole;
let currnetPlant;
let score = 0;
let gameOver = false;
let moleInterval, plantInterval;

window.onload = function(){
    setGame();
}

function setGame(){
    

    for(let i =0 ;i< 9 ; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click" , selectTile);
        document.getElementById("board").appendChild(tile);
    }

    moleInterval = setInterval(setMole ,  2000);
    plantInterval = setInterval(setPlant , 3000);

}
function getRanomTile(){
    // Math.random give number from 0-9
    let num = Math.floor(Math.random() * 9);

    return num.toString();
}
function setMole(){
    
    if(gameOver){
        console.log("calling after game ovear");
        return;
    }

    if(currentMole){
        currentMole.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRanomTile();
    if(currnetPlant && currnetPlant.id == num){
        return;
    }
    currentMole = document.getElementById(num);
    currentMole.appendChild(mole);
}

function setPlant(){
    if(gameOver){
        console.log("calling after game ovear");
        return;
    }

    if(currnetPlant){
        currnetPlant.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRanomTile();
    if(currentMole && currentMole.id == num){
        return;
    }
    currnetPlant = document.getElementById(num);
    currnetPlant.appendChild(plant);
}

function selectTile (){

    if(gameOver){
        return;
    }
    if (this == currentMole){
        score += 10;
        document.getElementById("score").innerText = "Score " + score.toString();
        currentMole.innerHTML = "";
        currentMole = null;
        
    }
    else if(this == currnetPlant){
        document.getElementById("score").innerText = "Game over, final score : " + score.toString();
        gameOver = true;

        clearInterval(moleInterval);
        clearInterval(plantInterval);

    }
}

function resetGame(){
    score = 0;
    gameOver = false;

    document.getElementById("score").innerText = "Score " + score.toString();


    if(currentMole) currentMole.innerHTML = "";
    if(currnetPlant) currnetPlant.innerHTML = "";


    clearInterval(moleInterval);
    clearInterval(plantInterval);

    moleInterval = setInterval(setMole, 2000);
    plantInterval = setInterval(setPlant, 3000);


}