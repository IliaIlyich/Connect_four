//frontend part

//introduction of out players abd their colors
var playerOne = prompt('Please, enter the name for Red player')
var playerOneColor = 'rgb(205,92,92)'
var playerTwo = prompt ('Please, enter the name for Blue player')
var playerTwoColor = 'RGB(0,115,207)'

//here we are going to use jquery function ($) to take all rows from the table to jquery object to be able execute jquery methods later
var board = $('tr') 

//function to specify the place where you won. Nothing crazy - we have to feed already prepared row, col to this function
function reportWin(rowNum, colNum){
    console.log('You win starts in this cell: ' + rowNum + ' ' + colNum)
}

// the function to change the button color. Since we have a button inside the table cell - we have to consistently get to that button. select row -> select all table cells in this row -> select cell -> find the button element within that cell -> set the background-color for this button
function changeColor(rowNum, colNum, color){
    return board.eq(rowNum).find('td').eq(colNum).find('button').css('background-color', color)
} 

//to return background-color for the current cell
function returnColor(rowNum, colNum){
    return board.eq(rowNum).find('td').eq(colNum).find('button').css('background-color')
}

//return bottom row we have to change color for. We have to use for loop to iterate from the last cell in column (index = 5) to the first one (index = 0). Iteration must be reversed
function returnRow(colNum){
    for (rowNum = 5; rowNum > -1; rowNum = rowNum - 1){
        if (returnColor(rowNum, colNum) === 'rgb(211, 211, 211)'){
            return rowNum
        }
        else{
        continue
        }
    }
}
// function to check color matches. Must return true if 4 chips are matched. In this particular function we are going to specify only color match and not cells. 
// I started to make IF statement but we can just return check - it will work as true/false
// also, it is important to have !== 'rgb(211, 211, 211)' coz otherwise we will get true with grey cells
function matchFour(cellOne, cellTwo, cellThree, cellFour){
    return cellOne === cellTwo && cellOne === cellThree && cellOne === cellFour && cellOne !== 'rgb(211, 211, 211)'
     //return cellOne === cellTwo === cellThree === cellFour !== 'rgb(211, 211, 211)'
}
//function to check 4 matched chips in horizontal line
function horizontalCheck(){
    for (row = 0; row < 6; row ++){
        for (col =0; col < 4; col ++){
            if (matchFour(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
                console.log("Horizontal win")
                reportWin(row, col)
                return true
            }
            else{
                continue
            }
        }
    }
}

//function to check 4 matched chips in vertical line

function verticalCheck(){
       for (col = 0; col < 7; col++){
            for (row = 0; row < 3; row++){
                if (matchFour(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))){
                    console.log("Vertical win")
                    reportWin(row, col)
                    return true
            }
            else{
                continue
            }
        }  
    }
}


// diagonal win check. We have to check diagonals in 2 difference slopes (positive slope, negative slope)
function diagonalCheck(){
    for (col = 0; col < 4; col++){
        for (row = 0; row < 4; row++){
            if (matchFour(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))){
                console.log("Diagonal win")
                    reportWin(row, col)
                    return true
            }
            else{
                continue
            }
        }
    }
    for (col = 6; col > 2; col --){
        for (row = 0; row < 4; row++){
            if (matchFour(returnColor(row, col), returnColor(row+1, col-1), returnColor(row+2, col-2), returnColor(row+3, col-3))){
                console.log("Diagonal win")
                    reportWin(row, col)
                    return true
            }
            else{
                continue
            }
        }
    }
}

function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 7; row++) {
        $('h3').fadeOut('slow');
        $('h2').fadeOut('slow');
        $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
      }
    }
  }
//BACKEND PART. Normally must be executed from the backend side. Here, we are just trying to use jQuery to implement game logic

// we need a flag for game round


var playerName = playerOne;
var playercolor = playerOneColor;
var anouncment = $("#textChanger");



anouncment.text(playerOne + ' it is your turn!');

//okay. Here is the tricky thing. 

$(".board button").on('click', function(){
        //find a col using the "closest" and "index"
        var col = $(this).closest('td').index();
        //find a row since we have a col
        var row = returnRow(col);
        //change color
        changeColor(row, col, playercolor);

        if (horizontalCheck() || verticalCheck() || diagonalCheck()){
           gameEnd(playerName)}

        if (playerName===playerOne){
            playerName = playerTwo
            playercolor = playerTwoColor;
            anouncment.text(playerName + " , it is your turn!");
        }
        else{
            playerName = playerOne;
            playercolor = playerOneColor;
            anouncment.text(playerName + " , it is your turn!");
        }
    }
)   
  

/*
var buttons = document.querySelectorAll('button')
for (item = 0; item < buttons.length; item++){
    buttons[item].addEventListener('click', function(){
        
    })
}
*/

