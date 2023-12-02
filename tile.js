const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win'),
    powerUpButton: document.querySelector('.power-up'),
    shareButton: document.querySelector('.share'),
    
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    powerUpUsed: false
}

const rulesButton = document.getElementById('rulesButton');
const rulesPopup = document.getElementById('rulesPopup');
const closePopup = document.getElementById('closePopup');


const quizQuestions = [
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets"],
        correctAnswer: 0
    },
    {
        question: "Which programming language is known for its use in machine learning and AI?",
        options: ["Java", "Python"],
        correctAnswer: 1
    },
    {
        question: "What does IDE stand for?",
        options: ["Integrated Development Environment", "Interactive Design Element"],
        correctAnswer: 0
    },
    {
        question: "What year was JavaScript created?",
        options: ["1995", "2005"],
        correctAnswer: 0
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Mozilla", "Netscape"],
        correctAnswer: 1
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Java", "HTML"],
        correctAnswer: 1
    },
    {
        question: "Who is the founder of Apple Inc.?",
        options: ["Steve Jobs", "Bill Gates"],
        correctAnswer: 0
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: 0
    },
    {
        question: "Who is the CEO of Tesla?",
        options: ["Elon Musk", "Jeff Bezos"],
        correctAnswer: 0
    },
    {
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        options: ["Queue", "Stack"],
        correctAnswer: 1
    },
    // Add more questions here if needed
];



let quizScore = 0;

const resetGame = () => {
    state.gameStarted = false;
    state.flippedCards = 0;
    state.totalFlips = 0;
    state.totalTime = 0;
    state.powerUpUsed = false;
    clearInterval(state.loop);
    
    // Clear the board
    selectors.board.innerHTML = '';
    selectors.boardContainer.classList.remove('flipped');
    selectors.win.innerHTML = '';

    // Generate a new game
    generateGame();
}



// Function to display the popup
const displayRulesPopup = () => {
    rulesPopup.style.display = 'block';
}

// Function to close the popup
const closeRulesPopup = () => {
    rulesPopup.style.display = 'none';
}

// Event listener to display the popup when the rules button is clicked
rulesButton.addEventListener('click', displayRulesPopup);

// Event listener to close the popup when the close button is clicked
closePopup.addEventListener('click', closeRulesPopup);

const shareScore = () => {
    if (navigator.share) {
        navigator.share({
            title: 'Memory Game Score',
            text: `I completed the Memory Game in ${state.totalTime} seconds with ${state.totalFlips} moves!`,
            url: window.location.href
        })
            .then(() => console.log('Successfully shared'))
            .catch((error) => console.error('Error sharing:', error));
    } else {
        alert("Web Share API not supported on this browser.");
    }
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    //const dimensions = selectors.board.getAttribute('data-dimension')  
    let dimensions = parseInt(selectors.board.getAttribute('data-dimension'));
   // console.log("helloo",dimensions);
  //  console.log(isNaN(dimensions));
    let defaultDimension = 4; // Default dimension set to 4x4 if not specified

    if (isNaN(dimensions)) {
        dimensions = defaultDimension;
    }

    
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍','😊', '🌟', '🐶', '🍎', '🎉', '🚀','🎈', '🍕', '🌈', '🎸', '🌻']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

   // selectors.board.replaceWith(parser.querySelector('.board'))
   selectors.boardContainer.replaceChild(parser.querySelector('.board'), selectors.board);
    selectors.board = document.querySelector('.board');
}


const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `Time: ${state.totalTime} sec`

    }, 1000)

    selectors.powerUpButton.removeAttribute('disabled');
    
}

function changeDimension(dimension) {
    selectors.board.setAttribute('data-dimension', dimension);
    generateGame();
}

const powerUp = () => {
    if (!state.powerUpUsed) {
      //  console.log(state.powerUpUsed)
        state.powerUpUsed = true;

        // Disable the power-up button after it's used
        selectors.powerUpButton.setAttribute('disabled', 'true');

        // Reveal all cards for 2 seconds
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('flipped');
        });

        setTimeout(() => {
            // Hide the cards after 2 seconds
            flipBackCards();
        }, 2000);
    }
}

const displayScore = () => {
    selectors.win.insertAdjacentHTML(
        'beforeend',
        `<button class="play-again">Play Again</button>`
    );

    const playAgainButton = document.querySelector('.play-again');
    playAgainButton.addEventListener('click', () => {
        resetGame();
        playAgainButton.remove();
    });
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const displayQuizPopup = (question, option1, option2, correctAnswerIndex) => {
    console.log(question)
    console.log(option1)
    console.log(option2)
    console.log(correctAnswerIndex)
   
    document.getElementById('quizQuestion').textContent = question;
    document.getElementById('option1').textContent = option1;
    document.getElementById('option2').textContent = option2;

    // Show the pre-defined quiz popup
    document.getElementById('quizPopup').style.display = 'block';

    // const options = document.querySelectorAll('.option');
    // console.log(options);
    // options.forEach((option, index) => {
    //     option.addEventListener('click', () => {
    //         if (index === correctAnswerIndex) {
    //             quizScore++;
    //             document.getElementById('quizScore').innerText = `Quiz Score: ${quizScore}`; 
    //         }
    //         document.getElementById('quizPopup').style.display = 'none';
    //          // Re-enable card clicks after answering the quiz
         
        
    //         });
    // });


    const option1Element = document.getElementById('option1');
    const option2Element = document.getElementById('option2');

    option1Element.addEventListener('click', () => {
        handleAnswer(0);
    });

    option2Element.addEventListener('click', () => {
        handleAnswer(1);
    });

    const handleAnswer = (selectedOptionIndex) => {
        console.log(selectedOptionIndex)
        if (selectedOptionIndex === correctAnswerIndex) {
            quizScore++;
        }
        document.getElementById('quizScore').innerText = `Quiz Score: ${quizScore}`;
        document.getElementById('quizPopup').style.display = 'none';
    };

};


const displayQuizScore = () => {
    document.getElementById('quizScore').textContent = `Quiz Score: ${quizScore}`;
}

const disableCardClicks = () => {
    document.querySelectorAll('.card').forEach(card => {
        card.style.pointerEvents = 'none';
    });
};

const enableCardClicks = () => {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', flipCard);
    });
};

const flipCard = card => {

    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')

            const correctAnswerIndex = Math.floor(Math.random() * quizQuestions.length);

          //  console.log(correctAnswerIndex)
            displayQuizPopup(
                quizQuestions[correctAnswerIndex].question,
                quizQuestions[correctAnswerIndex].options[0],
                quizQuestions[correctAnswerIndex].options[1],
                quizQuestions[correctAnswerIndex].correctAnswer
            );
        } 
        setTimeout(() => {
            flipBackCards();
          
                 
        }, 1000);
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds <br/> 
                    Quiz Score :  ${quizScore}
                </span>
            `
            displayScore();
            clearInterval(state.loop)
        }, 1000)
    }
    //displayQuizScore();
}

const attachEventListeners = () => {

    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement
        // console.log("hey", eventParent)
       //  console.log("hey hey", eventTarget)
        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        } else if (eventTarget.className.includes('option')) {
          //  console.log("Deepika") // Re-enable card clicks after closing the quiz popup
        }
        selectors.powerUpButton.addEventListener('click', powerUp);
        
    })
}

generateGame()
attachEventListeners()
