        
let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let boardBound = board.getBoundingClientRect();
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let x = true;
let y = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;
let speed = 4;

function setColor(idx) {
    let icon = document.querySelectorAll(".fas.fa-circle");
    icon[idx].style.color = "#686de0";
}

function movePaddle(cPaddle, change){
    let cPaddleBounds = cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change >= boardBound.top && cPaddleBounds.bottom+change <= boardBound.bottom){cPaddle.style.top = cPaddleBounds.top+change+"px";}
}

document.addEventListener("keydown", function(e){
    
    if(e.key == "w"){movePaddle(leftPaddle, -window.innerHeight*0.1);}
    else if(e.key == "s"){movePaddle(leftPaddle, window.innerHeight*0.1);}
    else if(e.key == "ArrowUp"){movePaddle(rightPaddle, -window.innerHeight*0.1);}
    else if(e.key = "ArrowDown"){movePaddle(rightPaddle, window.innerHeight*0.1);}
})

function moveBall(){
    let ballCordinate = ball.getBoundingClientRect();
    let ballTop = ballCordinate.top;
    let ballLeft = ballCordinate.left;
    let ballBottom = ballCordinate.bottom;
    let ballRight = ballCordinate.right;

    let hasTouchedLeft = ballLeft < boardBound.left;
    let hasTouchedRight = ballRight > boardBound.right;
    if (hasTouchedLeft) {
        leftPlayerLives--;
        setColor(leftPlayerLives);
        if (leftPlayerLives == 0) {
            alert("Game over!! , Player B won");
            document.location.reload();
        } else return resetGame();
    }
    if (hasTouchedRight) {
        rightPlayerLives--;
        setColor(3+rightPlayerLives);
        if (rightPlayerLives == 0) {
            alert("Game over!! , Player A won");
            document.location.reload();
        } else return resetGame();
    }

    function resetGame() {
        ball.style.top = window.innerHeight * 0.45 + "px";
        ball.style.left = window.innerWidth * 0.45 + "px";
        requestAnimationFrame(moveBall);
    }

    if(ballTop<=boardBound.top || ballBottom>=boardBound.bottom){
        y = !y;
    }

    //-------------- collision----------------------------

    let leftPaddleBound = leftPaddle.getBoundingClientRect();
    let rightPaddleBound = rightPaddle.getBoundingClientRect();
    if (ballLeft <= leftPaddleBound.right && ballRight >= leftPaddleBound.left &&
        ballTop + 30 >= leftPaddleBound.top && ballBottom - 30 <= leftPaddleBound.bottom) {
        x = !x;
        speed += 0.5;
    }

    if (
      ballLeft <= rightPaddleBound.right &&
      ballRight >= rightPaddleBound.left &&
      ballTop + 30 >= rightPaddleBound.top &&
      ballBottom - 30 <= rightPaddleBound.bottom
    ) {
        x = !x;
        speed += 0.5;
    }
    //*************************************************************    
        
    // if(ballLeft<=boardBound.left || ballRight>=boardBound.right){
    //     x = !x;   
    // }
    ball.style.top = (y==true)?ballTop+speed+"px":ballTop-speed+"px";
    ball.style.left =  (x==true)?ballLeft+speed+"px":ballLeft-speed+"px";
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);
