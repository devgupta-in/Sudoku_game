const gameBoard = document.querySelector("#gameBoard");
const digits = document.querySelector("#digits");
const deleteNum = document.querySelector("#delete");
const mistake = document.querySelector("#mistake");

let lastSelected = null;
let error = 0;

// Sudoku Problem (0 = Empty Cell)
const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

window.onload = () => {

    for(let i = 0; i < 9; i++){

        for(let j = 0; j < 9; j++){

            const div = document.createElement("div");
            div.classList.add("tile");
            div.addEventListener("click", selectTile);

            div.setAttribute("row", i);
            div.setAttribute("col", j);

            if(puzzle[i][j] != 0){
                div.innerText = puzzle[i][j];
                div.classList.add("filled");
            }

            if(i == 2 || i == 5){
                div.classList.add("border-bottom");
            }

            if(j == 2 || j == 5){
                div.classList.add("border-right");
            }

            gameBoard.appendChild(div);
        }
    }

    for(let i = 0; i < 9; i++){

        const div = document.createElement("div");
        div.classList.add("tile");
        div.innerText = i + 1;
        div.style.height = gameBoard.querySelector(".tile").clientHeight + "px";

        div.addEventListener("click", addNumber);

        digits.appendChild(div);
    }

};

function selectTile(){

    if(this.classList.contains("filled")) return;

    if(lastSelected){
        lastSelected.classList.remove("selected");
    }

    lastSelected = this;
    lastSelected.classList.add("selected");
}

function addNumber(){

    if(!lastSelected) return;

    if(lastSelected.classList.contains("filled")) return;

    const row = Number(lastSelected.getAttribute("row"));
    const col = Number(lastSelected.getAttribute("col"));
    const value = Number(this.innerText);

    lastSelected.innerText = value;

    if(solution[row][col] === value){

        lastSelected.classList.remove("danger");

    }else{

        if(!lastSelected.classList.contains("danger")){
            lastSelected.classList.add("danger");
            addErrorAndDisplay();
        }

    }

    if(ifAllTilesFilled()){
        checkWinner();
    }
}

deleteNum.onclick = () => {

    if(!lastSelected) return;

    if(lastSelected.classList.contains("filled")) return;

    lastSelected.innerText = "";
    lastSelected.classList.remove("danger");
};

function addErrorAndDisplay(){

    error++;
    mistake.innerText = error;

    if(error >= 3){
        alert("Game Over!");
        location.reload();
    }
}

function ifAllTilesFilled(){

    const allTiles = gameBoard.querySelectorAll(".tile");

    return [...allTiles].every(tile => tile.innerText !== "");
}

function checkWinner(){

    const allTiles = gameBoard.querySelectorAll(".tile");

    let userAnswer = [...allTiles].map(tile => Number(tile.innerText));

    let num = 0;

    for(let i = 0; i < 9; i++){

        for(let j = 0; j < 9; j++){

            if(solution[i][j] !== userAnswer[num]){
                allTiles[num].classList.add("danger");
            }else{
                allTiles[num].classList.remove("danger");
            }

            num++;
        }
    }

    const hasWrongAnswer = [...allTiles].some(tile =>
        tile.classList.contains("danger")
    );

    if(!hasWrongAnswer){
        alert("Congratulations! You solved the puzzle!");
    }
}