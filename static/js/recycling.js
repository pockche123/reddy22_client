// const next = document.querySelector("#create-score");
// next.addEventListener('click', createNewScore);

// async function createNewScore(e) {
//     e.preventDefault()

//     const score = {
//         id: e.length + 1,
//         score: e.length + 1
//     }

//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(score)
//     }

//     const response = await fetch("http://localhost:3000/total", options);

//     if (response.ok) {
//         // alert("Score added.");
//     }
// }

////////////////////////////////////////////////////////////////////////

const questionContainerElement = document.getElementById('question-container');
const backButton = document.getElementById('back-btn');
const ItemName = document.getElementById('name');

//////////////////////////////////////////////////////////////////////////

const nextQuestionBtnC = document.getElementById('create-score');
const nextQuestionBtnI = document.getElementById('next-btn-incorrect');

//////////////////////////////////////////////////////////////////////////

const recycleImg = document.getElementById('image');
const body = document.getElementById('body');

const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const button3 = document.getElementById('btn3');
const button4 = document.getElementById('btn4');

const buttons = document.querySelectorAll('.answer');

let score = [0];

getRandQuestion();

function getRandQuestion() {
  const randNum = Math.floor(Math.random() * 25) + 1;
  fetch(`https://reddy-2-2-be.onrender.com/materials/${randNum}`)
    .then((res) => res.json())
    .then((data) => fetchInfo(data));
}

function fetchInfo(data) {
  recycleImg.src = data.material_image;
  bin_id = data.bin_id;
  const name = data.name;

  const lables = [
    { name: 'Blue', id: 1 },
    { name: 'Grey', id: 2 },
    { name: 'Green', id: 2 },
    { name: 'Brown', id: 2 }
  ];
  shuffledLables = lables.sort(() => Math.random() - 0.5);

  button1.textContent = shuffledLables[0].name;
  button2.textContent = shuffledLables[1].name;
  button3.textContent = shuffledLables[2].name;
  button4.textContent = shuffledLables[3].name;

  button1.bin = shuffledLables[0].id;
  button2.bin = shuffledLables[1].id;
  button3.bin = shuffledLables[2].id;
  button4.bin = shuffledLables[3].id;

  backButton.addEventListener('click', () => {
    location.href = 'recycleHome.html';
  });

  ///////////////////////////////////////////////////////////////////////////////
  nextQuestionBtnC.addEventListener('click', () => {
    location.reload(); // should load up a ranomdly selected question and pass current score onto it
  });

  buttons.forEach((button) => {
    button.addEventListener('click', checkAnswer);
  });

  backButton.addEventListener('click', () => {
    location.href = 'recycleHome.html';
  });
  //////////////////////////////////////////////////////////////////////////////

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
  if (this.bin === bin_id) {
    this.classList.add('correct');
    question.textContent = 'Congratulations, You guessed right!';
    nextQuestionBtnC.style.display = 'block';

    const next = document.querySelector('#create-score');
    // next.addEventListener('click', createNewScore);
    next.addEventListener('click');
  } else {
    this.classList.add('wrong');
    question.textContent = 'Unlucky, thats incorrect!';
    nextQuestionBtnI.style.display = 'block';
  }
}

// //////////////////////////
