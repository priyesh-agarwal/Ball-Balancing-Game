const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let score = 0;
let highest_score = 0;
let SCORE = document.getElementById('score');
const player = {
    x: canvas.width/3,y: canvas.height-30,w: 200,h: 30,
    dx: 0,speed: 7,
    moveLeft: function(){
        this.dx = -this.speed;
    },
    moveRight: function(){
        this.dx = this.speed;
    },
    checkWall: function(){
        if(this.x < 0){
            this.x = 0;
            //dx = 0;
        }
        if(this.x + this.w > canvas.width){
            this.x = canvas.width - this.w;
            //dx = 0;
        }
    },
    newpos: function(){
        this.x += this.dx;
        this.checkWall();
    },
    draw: function(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.w,this.h);
    },
    
};

const ball = {
    x: canvas.width/2,y: canvas.height/2,r: 20,
    dx: 8,dy: 10,

    bounce: function(){
        // ball lands on bar
        if((this.y + this.r + player.h > canvas.height) && (this.x >= player.x && this.x <= player.x+player.w)){
            this.y = canvas.height - player.h - this.r;
            this.dy = -this.dy;
            score++;
            if(highest_score < score){
                highest_score = score;
            }
        }
        // left wall
        if(this.x < this.r){
            this.x = this.r;
            this.dx = -this.dx;
        }
        // right wall
        if(this.x + this.r > canvas.width){
            this.x = canvas.width - this.r;
            this.dx = -this.dx;
        }
        // top wall
        if(this.y < this.r){
            this.y = this.r;
            this.dy = -this.dy;
        }
        // ball falls down
        if(this.y + this.r > canvas.height){
            this.x = canvas.width/2;
            this.y = canvas.height/4;
            dx = 3,dy = 2;
            player.dx = 0;
            player.x = canvas.width/3;
            score = 0;
        }
    },

    newpos: function(){
        if(player.dx != 0){
            this.x += this.dx;
            this.y += this.dy;
            this.bounce();
            
        }
    },

    draw: function(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        ctx.fill();
    }
    
}

function keyDown(e){
    let s = e.key;
    if(s === 'ArrowLeft') player.moveLeft();
    if(s === 'ArrowRight') player.moveRight();   
}
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw();
    ball.draw();
    //drawBall();
    player.newpos();
    ball.newpos();
    SCORE.innerText = 'SCORE = ' + score + '     TOP SCORE = ' + highest_score;
    requestAnimationFrame(update);
    
}
update();
document.addEventListener('keydown',keyDown);
