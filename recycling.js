const next = document.querySelector('#create-score');
next.addEventListener('click', createNewScore);

async function createNewScore(e) {
  e.preventDefault();

  const score = {
    id: e.length + 1,
    score: e.length + 1
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(score)
  };

  const response = await fetch('http://localhost:3000/total', options);

  if (response.ok) {
    // alert("Score added.");
  }
}

////////////////////////////////////////////////////////////////////////

const questionContainerElement = document.getElementById('question-container');
const backButton = document.getElementById('back-btn');

//////////////////////////////////////////////////////////////////////////

const nextQuestionBtnC = document.getElementById('create-score');
const nextQuestionBtnI = document.getElementById('next-btn-incorrect');

//////////////////////////////////////////////////////////////////////////

const outlineImg = document.getElementById('image');
const body = document.getElementById('body');

const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const button3 = document.getElementById('btn3');
const button4 = document.getElementById('btn4');

const buttons = document.querySelectorAll('.answer');

let score = [0];

getRandQuestion();

function getRandQuestion() {
  fetch('https://reddy22-server.onrender.com/')
    .then((res) => res.json())
    .then((data) => fetchInfo(data));
}

function fetchInfo(data) {
  outlineImg.src = data.question;
  answers = data.answers;
  shuffledAnswers = answers.sort(() => Math.random() - 0.5);

  button1.textContent = shuffledAnswers[0].text;
  button2.textContent = shuffledAnswers[1].text;
  button3.textContent = shuffledAnswers[2].text;
  button4.textContent = shuffledAnswers[3].text;

  button1.bool = shuffledAnswers[0].correct;
  button2.bool = shuffledAnswers[1].correct;
  button3.bool = shuffledAnswers[2].correct;
  button4.bool = shuffledAnswers[3].correct;

  buttons.forEach((button) => {
    button.addEventListener('click', checkAnswer);
  });

  backButton.addEventListener('click', () => {
    location.href = 'index.html';
  });
  ///////////////////////////////////////////////////////////////////////////////
  nextQuestionBtnC.addEventListener('click', () => {
    location.reload(); // should load up a ranomdly selected question and pass current score onto it
  });

  nextQuestionBtnI.addEventListener('click', () => {
    location.reload();
  });

  ///////////////////////////////////////////////////////////////////////////////
}
fetchInfo();

function checkAnswer() {
  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;
  if (this.bool === true) {
    this.classList.add('correct');
    question.textContent = 'Congratulations, You guessed right!';
    nextQuestionBtnC.style.display = 'block';

    const next = document.querySelector('#create-score');
    next.addEventListener('click', createNewScore);
  } else {
    this.classList.add('wrong');
    question.textContent = 'Unlucky, thats incorrect!';
    nextQuestionBtnI.style.display = 'block';
  }
}
