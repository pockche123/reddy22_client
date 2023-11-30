





const nextButton = document.getElementById('next-btn')
if (nextButton) {
  nextButton.addEventListener('click', () => {
    console.log('nextButton clicked')
    getRandQuestion()
  })
}



const button1 = document.getElementById('btn1')
const button2 = document.getElementById('btn2')
const button3 = document.getElementById('btn3')
const button4 = document.getElementById('btn4')

const score = document.getElementById('score')

let count = parseInt(localStorage.getItem('count')) || 0
let points = parseInt(localStorage.getItem('points')) || 0
if (score) {
  score.textContent = points
}

document.addEventListener('DOMContentLoaded', () => {
  getRandQuestion()
})

const replay = document.getElementById('replay')

if (replay) {
  replay.addEventListener('click', restartGame)
}

function restartGame() {
  localStorage.removeItem('points')
  localStorage.removeItem('count')
  window.location.reload()
  // Your restartGame logic here
  console.log('restartGame function triggered')
  const end = document.getElementById('end')
  if (end) {
    end.style.display = 'none'
  }
  const game = document.getElementById('game')
  if (game) {
    game.style.display = 'block'
  }

  count = 0
  points = 0
}

async function getRandQuestion() {
  const buttons = [button1, button2, button3, button4]

  buttons.forEach(button => {
    if (button) {
      button.classList.remove('correct', 'wrong')
      button.disabled = false
    }
  })

  if (nextButton) {
    nextButton.disabled = true
  }
  const randNum = Math.floor(Math.random() * 25) + 1
  await fetch(`https://reddy-2-2-be.onrender.com/materials/${randNum}`)
    .then(resp => resp.json())
    .then(data => fetchInfo(data))
    .catch(e => console.log(e))
}

async function fetchBins() {
  try {
    const response = await fetch('https://reddy-2-2-be.onrender.com/bins')
    const bins = await response.json()
    addImageToButton(bins)
  } catch (e) {
    console.log(e)
  }
}

const backButton = document.querySelectorAll('.back-btn.btn')

backButton.forEach(button => {
  button.addEventListener('click', () => {
    localStorage.clear()
    location.href = 'recycleHome.html'
  })
})



function addImageToButton(bins) {
  const buttons = [button1, button2, button3, button4]

  const shuffledBins = bins.sort(() => Math.random() - 0.5)

  buttons.forEach((button, index) => {
    if (button) {
      button.innerHTML = ''
      const binImage = document.createElement('img')
      binImage.src = shuffledBins[index].bin_image
      button.appendChild(binImage)
      button.bin = shuffledBins[index].bin_id
    }
  })
}


function fetchInfo(data) {
  const recycleImg = document.getElementById('image')
  if (recycleImg) {
    recycleImg.src = data.material_image
  }

  bin_id = data.bin_id
  const name = data.name
  const ItemName = document.getElementById('itemName')

  if (ItemName) {
    ItemName.textContent = name
  }

  fetchBins()
  const buttons = document.querySelectorAll('.answer')

  buttons.forEach(button => {
    button.addEventListener('click',  checkAnswer)
  })

  if (count >= 5) {
    endGame()
  }
}

function checkAnswer() {

  const button1 = document.getElementById('btn1')
  const button2 = document.getElementById('btn2')
  const button3 = document.getElementById('btn3')
  const button4 = document.getElementById('btn4')
  const nextButton = document.getElementById('next-btn')
  const question = document.getElementById('question')

  if (button1 && button2 && button3 && button4 && question) {
    button1.disabled = true
    button2.disabled = true
    button3.disabled = true
    button4.disabled = true

    nextButton.disabled = false


    console.log('bin: ', this.bin, ': ', 'bin_id: ', bin_id)
    if (this.bin === bin_id) {
      this.classList.add('correct')
      points++
      localStorage.setItem('points', points)

      score.textContent = localStorage.getItem('points')
      question.textContent = 'Congratulations, You guessed right!'
    } else {
      this.classList.add('wrong')
      question.textContent = 'Unlucky, thats incorrect!'
      const buttons = [button1, button2, button3, button4]
      const correctButton = buttons.find(button => button.bin === bin_id)
      if (correctButton) {
        correctButton.classList.add('correct')
      }
    }

    count++
    localStorage.setItem('count', count)
  }
}


function endGame() {
  const end = document.getElementById('end')
  const game = document.getElementById('game')


  if (end) {
    end.style.display = 'block'
  }
  if (game) {
    game.style.display = 'none'
  }
  const totalScore = document.getElementById('totalScore')
  const message = document.getElementById('message')

  let percent = parseInt(Math.round((points / count) * 100))
  if (totalScore) {
    totalScore.textContent = percent
  }
  if (message) {
    if (percent > 80) {
      message.textContent =
        "You're a recycling rockstar! Planet-saving mode activated."
    } else if (percent > 50) {
      message.textContent = "Nice work! You're making a positive impact."
    } else {
      message.textContent =
        'Keep at it! Every effort counts toward a greener world.'
    }
  }
  localStorage.removeItem('points')
  localStorage.removeItem('count')
  points = 0
  count = 0
}

module.exports = {
  getRandQuestion,
  fetchBins,
  restartGame,
  addImageToButton,
  fetchInfo,
  endGame,
  checkAnswer
}
