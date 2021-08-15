const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");



let PlayerY = 370;
let BallX = 400;
let BallY = 400;
let EnemyY = 370; 
let xpress = false; 
let zpress = false;
let mpress = false;
let npress= false;
let xmov = Math.floor(Math.random()*2) - 2;
let ymove = Math.floor(Math.random()*2) - 1;


let difficulty = 1;
let speedmult = 1.5;
let wh = 800;

let width = wh;
let height = wh;
let fsize = width / 10;
let padsizex = (width/800)*10;
let padsizey = (width/800)*60;
let ballsize = (width/800)*8;
if (xmov == 0){
  xmov += 1
}
if (ymove == 0){
  ymove += 1
}

let mult = 2;
let xmult = 2;
let delay;
let enspeed = Math.floor((Math.random()*9)+(difficulty * 15 * difficulty)) / 4; 
let bscore = 0;
let rscore = 0;
let countdown = 0;
let p = false;
let mobile = false;
delay = Math.random(90, 200);
document.addEventListener('keydown', logKey);
function switc(){
  bscore = 0;
  rscore = 0;
  if (p){
    p = false;
  }
  else{
    p = true;
  }
}
function logKey(e) {
  if (e.code[3] == "X"){
    xpress = true;
  }
  if (e.code[3] == "Z"){
    zpress = true;
  }
  if (e.code[3] == "N" && p){
    npress = true;
  }
  if (e.code[3] == "M" && p){
    mpress = true;
  }
}
document.addEventListener('keyup', logKey2);

function logKey2(e) {
  if (e.code[3] == "X"){
    xpress = false;
    if(PlayerY > 0){
      PlayerY = PlayerY - Math.random(0, 4)
    }
  }
  if (e.code[3] == "Z"){
    zpress = false;
    if(PlayerY > 0){
      PlayerY = PlayerY - Math.random(0, 4)
    }
  }
  if (e.code[3] == "M" && p){
    mpress = false;
    if (EnemyY > 0){
      EnemyY = EnemyY - Math.random(0, 4)
    }
  }
  if (e.code[3] == "N" && p){
    npress = false;
    if (EnemyY > 0){
      EnemyY = EnemyY - Math.random(0, 4)
    }
  }
}

function update(){
  delay -= 1
  drawboard();
  requestAnimationFrame(update);
  if (xpress &&  PlayerY < 800 - padsizey){
    PlayerY = PlayerY + 6;
  }
  if (zpress && PlayerY > 0){
    PlayerY = PlayerY - 6;
  }
  if (npress && EnemyY > 0){
    EnemyY = EnemyY - 6
  }
  if (mpress && EnemyY < height - padsizey){
    EnemyY = EnemyY + 6
  }
  if(BallX < 792 && BallX > 0){
    BallX = BallX + xmov*xmult*difficulty*speedmult;
    BallY = BallY + ymove*mult*difficulty*speedmult;
  }
  if (BallY < 5 || BallY > 787){
    ymove = ymove * -1
  }
  if (BallY < PlayerY + 63 && BallY > PlayerY - 3){
    if (BallX < 12){
      xmov = xmov * -1
      mult = Math.abs((PlayerY + 30)-(BallY + 4)) / 7
      if (mult > 3.5){
        mult = 3.5;
      }
      console.log(mult)
      xmult = 6 - mult
      console.log(xmult)
      BallX = 13;
    }
  }
  if (BallY < EnemyY + 63 && BallY > EnemyY - 3){
    if (BallX > 780){
      xmov = xmov * -1
      mult = Math.abs((EnemyY + 30)-(BallY + 4)) / 7
      if (mult > 3.5){
        mult = 3.5;
      }
      console.log(mult)
      xmult = 6 - mult
      console.log(xmult)
      BallX = 779;
    }
  }
  if (BallY > EnemyY + 50 && p == false){
    EnemyY += enspeed
  }
  if (BallY < EnemyY + 10 && p == false){
    EnemyY -= enspeed
  }
  if (delay < 0){
    delay = Math.floor((Math.random() * 200) + 180);
    enspeed = Math.floor((Math.random()*9)+(difficulty * 17 * difficulty)) / 4
  }
  if (BallX < 1){
    countdown = 200;
    rscore += 1;
    BallX = 400;
    BallY = 400;
    mult = 0;
    xmult = 0;
  }
  if (BallX > 791){
    countdown = 200;
    bscore += 1;
    BallX = 400;
    BallY = 400;
    mult = 0;
    xmult = 0;
  }
  if (countdown > 0){
    countdown -= 1
  }
  if (countdown == 1){
    PlayerY = 370;
    EnemyY = 370; 
    enspeed = 2
    if (p == false){
      xmov = Math.floor(Math.random()*2) - 2;
    }
    else{
      xmov = Math.floor(Math.random()*4) - 2;
    }
    ymove = Math.floor(Math.random()*2) - 1;
    mult = 2;
    xmult = 2;
    if (xmov == 0){
      xmov += 1
    }
    if (ymove == 0){
      ymove += 1
    }
  } 
}

function Mobile(){
  mobile = true;
  width = Math.round(window.innerWidth * 0.57);
  height = Math.round(window.innerWidth * 0.57);
  ctx.canvas.width = Math.round(window.innerWidth * 0.57);
  ctx.canvas.height = Math.round(window.innerWidth * 0.57);
  fsize = width / 10;
  padsizex = (width/800)*10;
  padsizey = (width/800)*60;
  ballsize = (width/800)*8;
}

function drawboard(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "blue"
  ctx.fillRect(0, Math.round(PlayerY * (height / 800)), padsizex, padsizey)
  ctx.fillStyle = "black"
  ctx.fillRect(Math.round(BallX * (width / 800)), Math.round(BallY * (height / 800)), ballsize, ballsize)
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect((width/2)-2, 0, 5, height)
  ctx.font = "bold " + String(fsize) + "px Arial"
  ctx.fillText(String(bscore), Math.round((width) * 0.375), Math.round(height * 0.75))
  ctx.fillText(String(rscore), Math.round((width) * 0.575), Math.round(height * 0.75))
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillStyle = "Red"
  ctx.fillRect(width - padsizex, Math.round(EnemyY * (height / 800)), padsizex, padsizey)
}
update();