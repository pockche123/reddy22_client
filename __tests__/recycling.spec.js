/***
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(
    path.resolve(__dirname, '../recycleHome.html'),
    'utf8'
)
const recycle = require('../static/js/recycling')

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200
    })
)

describe('recycling page', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
        global.fetch.mockClear()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('test getRandom Question', async () => {
        await recycle.getRandQuestion()
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('test fetchBins', async () => {
        await recycle.fetchBins()
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('clicking on replay calls restartGame and performs expected actions', () => {
        document.documentElement.innerHTML = `<ul id="game"></ul><ul id="end"></ul>`

        recycle.restartGame()
        const game = document.getElementById('game')
        const end = document.getElementById('end')
        expect(game.style.display).toBe('block')
        expect(end.style.display).toBe('none')
    })

    test('adds images to buttons based on bins', () => {
        // Mock data for bins
        const bins = [
            { bin_id: 1, bin_image: 'image1.jpg' },
            { bin_id: 2, bin_image: 'image2.jpg' },
            { bin_id: 3, bin_image: 'image3.jpg' },
            { bin_id: 4, bin_image: 'image4.jpg' }
        ]

        // Mock HTML structure with buttons
        document.body.innerHTML = `
      <button id="button1"></button>
      <button id="button2"></button>
      <button id="button3"></button>
      <button id="button4"></button>
    `

        // Call the function
        recycle.addImageToButton(bins)

        // Check if images are added to buttons correctly
        const button1 = document.getElementById('button1')
        const button2 = document.getElementById('button2')
        const button3 = document.getElementById('button3')
        const button4 = document.getElementById('button4')

        expect(button1.innerHTML).toContain('')
        expect(button2.innerHTML).toContain('')
        expect(button3.innerHTML).toContain('')
        expect(button4.innerHTML).toContain('')
    })

    test('fetch Data', () => {
        // Mock data for testing
        const mockData = {
            material_image: 'mock_image.jpg',
            bin_id: 1,
            name: 'Mock Material'
        }

        // Set up the HTML structure
        document.body.innerHTML = `
    <img id="image"></img>
    <label id="itemName"></label>
  `

        // Call the function with mock data
        recycle.fetchInfo(mockData)

        // Get references to the updated elements
        const recycleImg = document.getElementById('image')
        const ItemName = document.getElementById('itemName')

        expect(recycleImg.src).toBe('http://localhost/mock_image.jpg')
        expect(ItemName.textContent).toBe('Mock Material')
        expect(fetch).toHaveBeenCalledWith('https://reddy-2-2-be.onrender.com/bins')
    })

    describe('end game', () => {
        test('end game with high score', () => {
            document.body.innerHTML = `
    <div id="end"></div>
    <div id="game"></div>
    <div id="totalScore"></div>
    <div id="message"></div>'
  `

            jest.spyOn(global, 'parseInt').mockReturnValue(85)

            recycle.endGame()

            const end = document.getElementById('end')
            const game = document.getElementById('game')
            const totalScore = document.getElementById('totalScore')
            const mockPercent = 85

            expect(end.style.display).toBe('block')
            expect(game.style.display).toBe('none')
            expect(totalScore.textContent).toBe(mockPercent.toString())
            expect(message.textContent).toBe(
                "You're a recycling rockstar! Planet-saving mode activated."
            )
        })

        test('end game with mid score', () => {
            document.body.innerHTML = `<div id="message"></div>`
            jest.spyOn(global, 'parseInt').mockReturnValue(60)
            const message = document.getElementById('message')

            recycle.endGame()
            expect(message.textContent).toBe(
                "Nice work! You're making a positive impact."
            )
        })

        test('end game with low score', () => {
            document.body.innerHTML = `<div id="message"></div>`
            jest.spyOn(global, 'parseInt').mockReturnValue(40)
            const message = document.getElementById('message')

            recycle.endGame()
            expect(message.textContent).toBe(
                'Keep at it! Every effort counts toward a greener world.'
            )
        })
    })

    test('checkAnswer', () => {
        document.body.innerHTML = `
    <button id="btn1"></button>
     <button id="btn2"></button>   
    <button id="btn3"></button>
    <button id="btn4"></button>
    <button id="next-btn"></button>
    <div id="question></div>
  `
        const button1 = document.getElementById('btn1')
        const button2 = document.getElementById('btn2')
        const button3 = document.getElementById('btn3')
        const button4 = document.getElementById('btn4')
        const question = document.getElementById('question')
        const nextButton = document.getElementById('next-btn')

        recycle.checkAnswer()

        expect(nextButton.disabled).toBe(false)
    })
})
