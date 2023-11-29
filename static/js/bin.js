const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')



async function fetchBin() {


    const binTitle = document.getElementById('bin-title')
    const binInfo = document.getElementById('bin-info')
    const binColor = document.getElementsByClassName('bin-color')
    const binImage = document.getElementById('bin-image')
    await fetch(`https://reddy-2-2-be.onrender.com/bins/${id}`)
        .then(resp => resp.json())
        .then(data => {
            binTitle.textContent = data.bin_type
            binInfo.textContent = data.info
            binInfo.innerHTML = data.info.replace(/\\n/g, '<br><br>')
            binImage.src = data.bin_image
            for (let i = 0; i < binColor.length; i++) {
                binColor[i].textContent = data.color
            }
        })
        .catch(e => console.log(e))
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBin()
    fetchToPutInBin()
    fetchNotToPutInBin()
})
// fetchBin()
// fetchToPutInBin()

async function fetchToPutInBin() {
    await fetch(`https://reddy-2-2-be.onrender.com/materials/byBin/${id}`)
        .then(resp => resp.json())
        .then(data => {
            showAll(data)
        })
        .catch(e => console.log(e))
}

function showAll(item) {
    item.forEach(i => showItem(i.name))
}

function showItem(name) {
    const ul = document.getElementById('to-put-list')
    const li = document.createElement('li')

    const checkIcon = document.createElement('i')
    checkIcon.className = 'fa-solid fa-check'

    li.appendChild(checkIcon)
    li.innerHTML += '&nbsp;&nbsp;&nbsp;' + name.toLowerCase()

    ul.appendChild(li)
}

// fetchNotToPutInBin()
async function fetchNotToPutInBin() {
    await fetch(`https://reddy-2-2-be.onrender.com/materials/notInBin/${id}`)
        .then(resp => resp.json())
        .then(data => {
            showItems(data)
        })
        .catch(e => console.log(e))
}

function showItems(item) {
    item.forEach(i => showNotItem(i.name))
}

function showNotItem(name) {
    const ul = document.getElementById('to-not-put-list')
    const li = document.createElement('li')

    const xIcon = document.createElement('i')
    xIcon.className = 'fa-solid fa-x'

    li.appendChild(xIcon)
    li.innerHTML += '&nbsp;&nbsp;&nbsp;' + name.toLowerCase()
    ul.appendChild(li)
}

module.exports = { fetchBin, fetchToPutInBin, fetchNotToPutInBin }
