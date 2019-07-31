var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1;
var dy = -1.5;
var ball_size = 8;
var start=true;
var baseX = 0;
const baseY = canvas.height-10;
var base_speed = 2;
var moveRight = 0;
var score = 0;
document.getElementById("text").innerText = "Use left and right buttons to move the balance. ";
function startGame(){
    start = false;
    document.getElementById("text").innerText = "";
    document.getElementById("myscore").innerText = "";
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 1;
    dy = -1.5;
    ball_size = 8;
    baseX = 0;
    baseY = canvas.height-10;
    base_speed = 2;
    moveRight = 0;
    score = 0;
}
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ball_size,0,Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    
    if(x+ball_size>=canvas.width || x<=ball_size){
        dx = -dx;
    }
    
    if(y+ball_size>=canvas.height){
        gameOver();
    }
    if(y<=ball_size){
        dy = -dy;
    }
    if(baseY-y==ball_size && (x>=baseX && x<=(baseX+100))){
        if(dy>0)
            dy = -dy;
        score += 1;
    }
    if(start === false){
    x += dx;
    y += dy;
    }
}

function gameOver(){
    start = true;
    document.getElementById("text").innerText = "You Lose!!";
    document.getElementById("myscore").innerText = "Your score is "+score;
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawBase();
    
}
function moveleft(){
    if(start==false)
        moveRight = -1;
}
function moveright(){
    if(start==false)
        moveRight = 1;
}
function stop(){
    if(start==false)
        moveRight = 0;
}
function drawBase(){
    ctx.beginPath();
    ctx.rect(baseX,baseY,100,10);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    if(baseX<=0){
        if(moveRight!=1)
            moveRight=0;
    }
    if(baseX+100>=canvas.width){
        if(moveRight!=-1)
            moveRight = 0;
    }
    if(start==false){
    if(moveRight===1){
        baseX += base_speed;
    }
    if(moveRight===-1){
        baseX -= base_speed;
    }
    
    }
}
setInterval(draw,10);