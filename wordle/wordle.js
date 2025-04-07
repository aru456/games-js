var height = 6;
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;
var words = ["SQUID", "PLANT", "BRICK", "LIGHT", "CRISP", "STORM", "GHOST"]; 
var word = "";


window.onload = (()=>{

    word = words[ Math.floor(Math.random() * words.length )];

    for(let r=0; r< height;r++){
        for(let c =0;c < width ; c++){
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" +c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);

        }
    }
    document.addEventListener("keyup" , (e) =>{
        if(gameOver) return;

        if(e.key.match(/^[a-zA-Z]$/)){
            if(col < width && row < height){
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if(currTile.innerText === ""){
                    currTile.innerText = e.code[3];
                    col+=1;

                }
            }
        }
        else if (e.key === "Backspace"){
            if(0 < col && col <= width){
                col --;
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                currTile.innerText = "";
            }
        }
        else if (e.key === "Enter"){
            if(col < 5){
                return;
            }

            update();
            row+=1;
            col=0;
        }

        if(!gameOver && row == height){
            gameOver = true;

            document.getElementById("answer").innerText = "Game Over, word is : " + word;
        }
        
    });


});



function update(){

    let correct = 0;

    for(let c = 0;c < width; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        if(word[c] == letter){
            currTile.classList.add("correct");
            correct+=1;
        }

        else if(word.includes(letter)){
            currTile.classList.add("present");
        }

        else {
            currTile.classList.add("absent");
        }

        if(correct == width){
            gameOver = true;
            document.getElementById("answer").innerText = "You are correct : " + word;
        }
         
    }


}
