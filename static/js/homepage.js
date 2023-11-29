
let toggleUpdate = true

let token = localStorage.getItem('token')

if (!token && window.location.pathname === '/homepage.html') {
  window.location.assign('login.html')
}

let fetching = true
function fetchOrClearCats(e) {
  const catsList = document.getElementById('all-cats')
  if (fetching) {
    fetchCats(e)
  } else {
    catsList.textContent = ''
  }
  fetching = !fetching
}

async function fetchCats() {
  try {
    const response = await fetch('http://localhost:3000/cats');
    const cats = await response.json();
    cats.map(cat => showAllCats(cat));
  } catch (e) {
    console.error(e);
  }
}

function showAllCats(cat) {
  const catsList = document.getElementById('all-cats')

  const li = document.createElement('li')
  li.textContent = cat.name
  catsList.appendChild(li)

  const updateButton = document.createElement('button')
  li.appendChild(updateButton)
  updateButton.textContent = 'Update'
  const input = document.createElement('input')

  updateButton.addEventListener('click', e => {
    toggleUpdateCat(cat.id, e, li, input)
  })

  const deletebutton = document.createElement('button')
  li.appendChild(deletebutton)
  deletebutton.textContent = 'Delete'
  deletebutton.addEventListener('click', e => deleteCat(e, cat.id, cat.name))
}

const deleteCat = async (e, id, name) => {
  e.stopPropagation()

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(`http://localhost:3000/cats/${id}`, options)

  if (response.ok) {
    alert(`${name} has been deleted successfully`)
  }
}

const toggleUpdateCat = (id, e, li, input) => {
  if (li.contains(input)) {
    li.removeChild(input)
  } else {
    updateCat(id, e, li, input)
  }
  toggleUpdate = !toggleUpdate
}

const updateCat = async (id, event, li, input) => {
  event.stopPropagation()
  event.preventDefault()
  li.appendChild(input)
  input.addEventListener('keyup', event => updateInput(event, id))
}

const updateInput = async (e, id) => {
  let value = e.target.value
  if (e.key === 'Enter') {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: value
      })
    }

    const response = await fetch(`http://localhost:3000/cats/${id}`, options)

    if (response.status == 200) {
      alert('Cat has been updated')
    }
  }
}

async function createCat (e) {
  e.preventDefault()

  const form = new FormData(e.currentTarget)
  let name = form.get('name')
  let type = form.get('type')
  let description = form.get('description')
  let habitat = form.get('habitat')

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      type: type,
      description: description,
      habitat: habitat
    })
  }

  const response = await fetch('http://localhost:3000/cats', options)

  if (response.status == 201) {
    alert('New cat has been created')
  } else {
    alert('ERROR CREATING CAT')
  }
}

module.exports = { fetchOrClearCats, createCat, fetchCats, showAllCats, deleteCat, updateInput, toggleUpdateCat, updateCat }
