let forumSectionHeader = document.getElementById('col2');
let forumSectionCard = document.getElementById('col5');
let eventsSectionHeader = document.getElementById('col3');
let eventsSectionCard = document.getElementById('col6');

let links = document.getElementById('links');

if (!localStorage.getItem('token')) {
  for (let i = 0; i < links.children.length; i++) {
    links.children[i].style.display = 'block';
  }
  forumSectionHeader.classList.add('hide-item');
  forumSectionCard.classList.add('hide-item');
  eventsSectionHeader.classList.add('hide-item');
  eventsSectionCard.classList.add('hide-item');
} else {
  for (let i = 0; i < links.children.length; i++) {
    links.children[i].style.display = 'none';
  }
  const listElem = document.createElement('li');
  links.appendChild(listElem);
  const link = document.createElement('a');
  link.textContent = 'Logout';

  link.addEventListener('click', async () => {
    const options = {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    const response = await fetch(
      'https://reddy-2-2-be.onrender.com/users/logout',
      options
    );
    const data = await response.json();

    if (response.status == 200) {
      localStorage.removeItem('token');
      window.location.assign('./index.html');
    } else {
      alert(data.error);
    }
  });

  listElem.appendChild(link);
}
