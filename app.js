let userScore = 0;
let boatScore = 0;
let targetScore = 10; // default match limit

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const boatScorePara = document.querySelector("#boat-score");

const targetSelect = document.querySelector("#target-select"); // dropdown
const resetBtn = document.querySelector("#reset-btn"); // reset button

// Update target score when user selects a value
targetSelect.addEventListener("change", () => {
    targetScore = Number(targetSelect.value);
    resetGame();
});

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was draw! Play again!";
    msg.style.backgroundColor = "#2E2E2E";
};

const endGame = (winner) => {
    msg.innerText = `🎉 Game Over! ${winner} Wins the Match!`;
    msg.style.backgroundColor = "#6A5ACD";

    // Disable clicking on choices after game ends
    choices.forEach((choice) => {
        choice.style.pointerEvents = "none";
    });
};

const showWinner = (userWin, userChoice, boatChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${boatChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        boatScore++;
        boatScorePara.innerText = boatScore;
        msg.innerText = `You Lose! ${boatChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

    // Stop when someone reaches target score
    if (userScore >= targetScore) {
        endGame("You");
    }
    if (boatScore >= targetScore) {
        endGame("Boat");
    }
};

const playGame = (userChoice) => {
    // Stop playing if game already ended
    if (userScore >= targetScore || boatScore >= targetScore) return;

    const boatChoice = genCompChoice();

    if (userChoice === boatChoice) {
        drawGame();
    } else {
        let userWin = true;

        if (userChoice === "rock") {
            userWin = boatChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = boatChoice === "scissor" ? false : true;
        } else {
            userWin = boatChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, boatChoice);
    }
};

// Add event listener to choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Reset button function
const resetGame = () => {
    userScore = 0;
    boatScore = 0;

    userScorePara.innerText = userScore;
    boatScorePara.innerText = boatScore;

    msg.innerText = "Game Started! Make your move!";
    msg.style.backgroundColor = "#444";

    // Re-enable choices
    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
    });
};

resetBtn.addEventListener("click", resetGame);