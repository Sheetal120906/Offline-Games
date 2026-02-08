// 1. key press--> game start
// 2. btn flash --> level 1
//game sequence[     ]
//user sequence[     ]
// 3. btn press -> check -> user = = game
// 4. check same--> level up / not same--> game over

let gameSeq=[];
let userSeq=[];

let btns=["red","orange","green","blue"];

let started=false;// game abhi start nhi hua h
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started== false){
    console.log("game is started");  //game start ho jaega koi bhi key press krne ke baad
     started=true;

     levelUp();
    }
});

function levelUp(){
    userSeq=[]; //jaise level up hoga userSeq reset ho jaega
    // level badhana h, btn flash krna h, h2 value should be updated
    level++;
    h2.innerText=`Level ${level}`;

    //random button choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    // game seq me random color push ho jaega
    gameSeq.push(randColor); 
    console.log(gameSeq);
    gameFlash(randbtn);
}

function gameFlash(btn){
   btn.classList.add("flash");
   setTimeout(function(){
    btn.classList.remove("flash");    //game ka flash
   },250);
}
//--------------------------------------
function userFlash(btn){
   btn.classList.add("userflash");
   setTimeout(function(){             // user ka flash
   btn.classList.remove("userflash");
   },250);
}

function checkAns(idx){                          //checking the ans if same or not and level up
    // console.log("curr level:",level);

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length== gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h2.innerHTML=`Game Over! Your score was <b>${level} </b> <br> Press any key to start.`;
       document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
       document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");   //user click
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}