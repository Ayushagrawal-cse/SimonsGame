let gameSeq=[];
let userSeq=[];




let btns=["yellow","purple","green","red"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
         started=true;
         levelUp();
    }
  
});

function playSound() {
    let audio = new Audio('buttonsound.mp3');
    audio.play();
}



function btnFlash(btn){
    btn.classList.add("flash");
    playSound();
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    //random btn choose

    let randIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randIdx];
    gameSeq.push(randomColor);
    let randBtn=document.querySelector(`.${randomColor}`);
    btnFlash(randBtn);
}

function userflash(btn){
    btn.classList.add("userflash");
    playSound();
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function playGameOverSound() {
    const sound = document.getElementById('gameOverSound');
    sound.play();
}



function checkAnswer(idx){
     if(userSeq[idx]==gameSeq[idx]){
         if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
         }
     }
     else{
        playGameOverSound();
        h2.innerHTML=`<pre>Game over ,your score was ${level}, 
Press any key to restart</pre>`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
           document.querySelector("body").style.backgroundColor="white";
        },250);
        reset();
     }
};

function btnPress(){
     let btn=this;
     userColor=btn.getAttribute("id");
     userSeq.push(userColor);
     userflash(btn);
     playSound();
     checkAnswer(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
};

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}


