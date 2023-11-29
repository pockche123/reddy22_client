
const questionContainerElement = document.getElementById('question-container');

const ItemName = document.getElementById('itemName');



const nextQuestionBtnC = document.getElementById('create-score');
const nextQuestionBtnI = document.getElementById('next-btn-incorrect');
const nextButton = document.getElementById('next-btn')

nextButton.addEventListener('click', () => {
  console.log("nextButton clicked")
  getRandQuestion()
});


const recycleImg = document.getElementById('image');
const body = document.getElementById('body');

const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const button3 = document.getElementById('btn3');
const button4 = document.getElementById('btn4');

const buttons = document.querySelectorAll('.answer');
const score = document.getElementById('score')


let count = parseInt(localStorage.getItem("count")) || 0;
let points = parseInt(localStorage.getItem("points")) || 0;
score.textContent = points



document.addEventListener('DOMContentLoaded', () => {
  getRandQuestion()
})



document.getElementById('replay').addEventListener('click', restartGame);

function restartGame() {
  localStorage.removeItem("points")
  localStorage.removeItem("count")
  location.reload()
  // Your restartGame logic here
  console.log('restartGame function triggered');
  document.getElementById('end').style.display = "none";
  document.getElementById('game').style.display = "block";

  count = 0;
  points = 0;
}

function getRandQuestion() {
  const buttons = [button1, button2, button3, button4];

  buttons.forEach(button => {
    button.classList.remove('correct', 'wrong');
    button.disabled = false;
  });

  nextButton.disabled = true;
  const randNum = Math.floor(Math.random() * 25) + 1;
  fetch(`https://reddy-2-2-be.onrender.com/materials/${randNum}`)
    .then((res) => res.json())
    .then((data) => fetchInfo(data));
}

async function fetchBins() {

  const response = await fetch('https://reddy-2-2-be.onrender.com/bins')
  const bins = await response.json()
  addImageToButton(bins)

}

const backButton = document.querySelectorAll('.back-btn.btn');

backButton.forEach(button => {
  button.addEventListener('click', () => {
    localStorage.clear();
    location.href = 'recycleHome.html';
  });
});


function addImageToButton(bins) {

  const buttons = [button1, button2, button3, button4];
  buttons.forEach(button => button.innerHTML = "")


  shuffled = bins.sort(() => Math.random() - 0.5);
  const binImage1 = document.createElement('img');
  const binImage2 = document.createElement('img');
  const binImage3 = document.createElement('img');
  const binImage4 = document.createElement('img');

  binImage1.src = shuffled[0].bin_image;
  binImage2.src = shuffled[1].bin_image;
  binImage3.src = shuffled[2].bin_image;
  binImage4.src = shuffled[3].bin_image;

  button1.appendChild(binImage1)
  button2.appendChild(binImage2)
  button3.appendChild(binImage3)
  button4.appendChild(binImage4)

  button1.bin = shuffled[0].bin_id;
  button2.bin = shuffled[1].bin_id;
  button3.bin = shuffled[2].bin_id;
  button4.bin = shuffled[3].bin_id;
}

function fetchInfo(data) {
  recycleImg.src = data.material_image;
  bin_id = data.bin_id;
  const name = data.name;
  ItemName.textContent = name;

  fetchBins()

  buttons.forEach((button) => {
    button.addEventListener('click', checkAnswer);
  });

  if (count >= 5) {
    endGame()
  }

}



function checkAnswer() {
  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;

  nextButton.disabled = false;


  console.log("bin: ", this.bin, ": ", "bin_id: ", bin_id)
  if (this.bin === bin_id) {
    this.classList.add('correct');
    points++;
    localStorage.setItem("points", points)

    score.textContent = localStorage.getItem('points')
    question.textContent = 'Congratulations, You guessed right!';
  } else {
    this.classList.add('wrong');
    question.textContent = 'Unlucky, thats incorrect!';
    const buttons = [button1, button2, button3, button4];
    const correctButton = buttons.find(button => button.bin === bin_id);
    if (correctButton) {
      correctButton.classList.add('correct');

    }
  }

  count++;
  localStorage.setItem("count", count);




}


function endGame() {
  document.getElementById('end').style.display = "block";
  document.getElementById('game').style.display = "none";
  const totalScore = document.getElementById('totalScore');
  const message = document.getElementById('message');

  let percent = parseInt(Math.round(points / count * 100))
  totalScore.textContent = percent

  if (percent > 80) {
    message.textContent = "You're a recycling rockstar! Planet-saving mode activated.";
  } else if (percent > 50) {
    message.textContent = "Nice work! You're making a positive impact.";
  } else {
    message.textContent = "Keep at it! Every effort counts toward a greener world.";
  }
  localStorage.removeItem("points")
  localStorage.removeItem("count")
  points = 0;
  count = 0;
}