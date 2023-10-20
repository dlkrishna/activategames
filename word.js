//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const difficultyContainer = document.getElementById("difficulty-container")
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

options = {
  fruits: {
    easy: ["Apple", "Pear", "Banana", "Cherry"],
    medium: ["Blueberry", "Mandarin", "Pineapple", "Pomegranate"],
    hard: ["Watermelon", "Raspberry", "Blackberry", "Cantaloupe"],
  },
  animals: {
    easy: ["Dog", "Cat", "Cow", "Pig"],
    medium: ["tiger", "Squirrel", "Panther", "cheetah"],
    hard: ["Rhinoceros", "Kangaroo", "Porcupine", "Platypus"],
  },
  countries: {
    easy: ["India", "Italy", "Spain", "Egypt"],
    medium: ["Australia", "Zimbabwe", "Africa", "Mauritius"],
    hard: ["Bhutan", "Denmark", "Madagascar", "Cambodia"],
  },
};

const hints = {
apple: "A popular fruit that's red or green.",
pear: "A sweet and juicy fruit with a green or yellow skin.",
banana: "A long, curved fruit with a yellow skin.",
cherry: "A small, round fruit that can be red or black.",
dog: "A loyal and friendly domestic pet.",
cat: "A furry and independent domestic pet.",
cow: "A large farm animal known for milk production.",
pig: "A pink farm animal often raised for meat.",
india: "A diverse country in South Asia.",
italy: "A European country famous for its cuisine and culture.",
spain: "A European country with a rich history and culture.",
egypt: "An African country known for its ancient history.",
blueberry: "A small, round, and often blue fruit.",
mandarin: "A small citrus fruit with loose skin.",
pineapple: "A tropical fruit with spiky skin.",
pomegranate: "A fruit with red seeds and tough skin.",
watermelon: "A large, juicy fruit with green skin.",
raspberry: "A small, red or black fruit with many tiny seeds.",
blackberry: "A dark-colored berry with a sweet and tart taste.",
cantaloupe: "A sweet and fragrant melon with orange flesh.",
tiger: "A large, striped and powerful big cat.",
squirrel: "A small, bushy-tailed rodent.",
panther: "A large, powerful wildcat.",
cheetah: "A fast and spotted big cat.",
rhinoceros: "A large, thick-skinned herbivore.",
kangaroo: "A hopping marsupial from Australia.",
porcupine: "A spiky and nocturnal rodent.",
platypus: "An egg-laying mammal from Australia.",
australia: "A continent and country known for unique wildlife.",
zimbabwe: "A country in southern Africa.",
africa: "A continent with diverse cultures and wildlife.",
mauritius: "A tropical island nation in the Indian Ocean.",
bhutan: "A Himalayan country known for its scenic beauty.",
denmark: "A European country with a rich history.",
madagascar: "A large island nation off the east coast of Africa.",
cambodia: "A Southeast Asian country with a rich history."
};

const levels = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
}

let selectedCategory = "";
let selectedLevel = "";

//count
let winCount = 0;
let count = 0;
let score = 0;
let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select A Category</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="selectCategory('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

const displayLevels = () => {
  difficultyContainer.innerHTML = `<h3>Please Select A Level</h3>`;
  for (let level in levels) {
    difficultyContainer.innerHTML += `<button class="levels" onclick="selectLevel('${level}')">${level}</button>`;
  }
  difficultyContainer.classList.remove("hide");
};

// Select a category and display levels
const selectCategory = (category) => {
  selectedCategory = category;
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === category) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  displayLevels();
};

// Select a level
const selectLevel = (level) => {
  selectedLevel = level;
  let levelButtons = document.querySelectorAll(".levels");
  levelButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === level) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  generateWord(selectedCategory, levels[level]);
};


//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//update score
function updateScore() {
  score+= 100;
  document.getElementById("score").innerText = `Score: ${score}`;
}

const generateWord = (category, level) => { 
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === category) {
      button.classList.add("active");
    }
    button.disabled = true;
  })

letterContainer.classList.remove("hide");
userInputSection.innerText = "";


console.log(options.hasOwnProperty(category));
console.log(options[category].hasOwnProperty(level))
  // Check if the category and level exist in options
  if (options.hasOwnProperty(category) && options[category].hasOwnProperty(level)) {
    let optionArray = options[category][level];

    if (optionArray.length > 0) {
      chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
      chosenWord = chosenWord.toUpperCase();

      let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

      userInputSection.innerHTML = displayItem;
    } else {
      console.error(`No words available for the category '${category}' and level '${level}'.`);
    }
  } else {
    console.error(`Category '${category}' or level '${level}' not found in options.`);
  }
}

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  difficultyContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
      if (winCount == charArray.length) {
        resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
        // Update the score
        updateScore();
        // Block all buttons
        blocker();
      }
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};



//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

document.getElementById("hints-button").addEventListener("click", requestHint);
document.getElementById("hints-close-button").addEventListener("click", closeHintPopup);


function requestHint() {
  // Display the hint popup
  document.getElementById("hints-popup").style.display = "block";

  // Get the selected word
  const selectedWord = chosenWord.toLowerCase(); // Ensure case-insensitivity
   console.log("heyyyy selected word is", selectedWord);
  // Check if a hint exists for the selected word
  if (hints[selectedWord]) {
    const selectedHint = hints[selectedWord];
    // Display the selected hint in the hint popup
    document.getElementById("hint-content").textContent = selectedHint;
  } else {
    // If there's no hint available, display a default message
    document.getElementById("hint-content").textContent = "No hint available for this word.";
  }
}

//Function to close the hint popup
function closeHintPopup() {
  // Close the hint popup
  document.getElementById("hints-popup").style.display = "none";
}

// Add event listeners for the "Rules" button and close button
document.getElementById("rules-button").addEventListener("click", openRulesPopup);
document.getElementById("close-button").addEventListener("click", closeRulesPopup);

// Function to open the rules popup
function openRulesPopup() {
  document.getElementById("rules-popup").style.display = "block";
}

// Function to close the rules popup
function closeRulesPopup() {
  document.getElementById("rules-popup").style.display = "none";
}


// Colors available for the Hangman game container
const colors = ["red", "blue", "green", "white", "orange"];
let currentColorIndex = 0; // Index to track the current color

document.getElementById("color-button").addEventListener("click", changeColor);
// Function to change the color of the Hangman game container
function changeColor() {
  // Get the current color class and remove it
  const currentColorClass = colors[currentColorIndex];
  document.querySelector(".container").classList.remove(currentColorClass);

  // Increment the index to change to the next color
  currentColorIndex = (currentColorIndex + 1) % colors.length;

  // Get the new color class and add it to the container
  const newColorClass = colors[currentColorIndex];
  document.querySelector(".container").classList.add(newColorClass);
}

// Add an event listener for the "Change Color" button



//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
