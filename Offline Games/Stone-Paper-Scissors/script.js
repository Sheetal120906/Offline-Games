let userScore = 0;
compScore = 0;

const options = document.querySelectorAll(".option");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const getCompOption = ()=>{
    //rock,paper, scissors
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
};
const drawGame = () =>{
    console.log("game was draw.");
    msg.innerText="Game was draw. Play again.";
     msg.style.backgroundColor = "#081b31";
}

const showWinner =(userWin,userOption,compOption)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        // console.log("You Win!");
        msg.innerText = `You Win! Your${userOption} beats ${compOption}`;
        msg.style.backgroundColor = "green";
    } else{
        compScore++;
        compScorePara.innerText = compScore;
        // console.log("You lose!");
        msg.innerText = `You lose.${compOption} beats your${userOption}`;
         msg.style.backgroundColor = "red";
    }
}
const playGame=(userOption)=>{
    // console.log("user option = ", userOption);
    
    //generate comp option
    const compOption = getCompOption();
    // console.log("comp option = ",compOption);

   //who will win

   if(userOption === compOption){
    //Draw Game
    drawGame();
   } else{
    let userWin = true ; // we assume user won
    if(userOption === "rock"){
        //scissors , paper
        userWin = compOption === "paper" ? false : true ; //ternary operator
    } else if(userOption ==="paper"){
        //rock, scissors
        userWin = compOption === "scissors" ? false : true ;
    } else {
        //rock , paper
        userWin = compOption === "rock" ? false : true ;
    }
    showWinner(userWin,userOption,compOption);
   }
};

options.forEach((option)=>{
    // console.log(option);
    option.addEventListener("click",()=>{
      const userOption =option.getAttribute("id");
      playGame(userOption);
    });
});