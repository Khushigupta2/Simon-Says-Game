let gameseq = [];
let userseq = [];

let btns = ["pink", "blue", "purple", "yellow"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Load stored high score

let h2 = document.querySelector("h2");

// Step 1: Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        level = 0;
        gameseq = [];
        userseq = [];
        levelup();
    }
});

// Step 2: Level up and button flash
function levelup() {
    userseq = []; // Reset user sequence
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    // Choose random button
    let randomIndx = Math.floor(Math.random() * 4);
    let randcolor = btns[randomIndx];
    let randombtn = document.querySelector(`.${randcolor}`);

    // Add random color to game sequence
    gameseq.push(randcolor);

    // Flash the button
    buttonflash(randombtn);
}

// Step 3: Flash button animation
function buttonflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Step 4: User button press
function btnpress() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    // Check if user's sequence is correct
    checkresult(userseq.length - 1);
}

// Attach event listeners to all buttons
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

// Step 5: User flash animation
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Step 6: Check user's input sequence
function checkresult(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Update high score if the current score is higher
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore); // Save high score
        }

        h2.innerHTML = `Game Over! Your Score: <b>${level}</b> | High Score: <b>${highScore}</b><br>Press Any Key to Restart`;
        
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Step 7: Reset game
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
