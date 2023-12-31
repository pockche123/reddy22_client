const createPostElement = (data) => {
  const post = document.createElement('div');
  post.classList.add('container');
  post.id = 'post';

  const userContainer = document.createElement('div');
  userContainer.style.display = 'flex';
  userContainer.style.gap = '12px';
  userContainer.className = 'user';
  post.appendChild(userContainer);

  const userIcon = document.createElement('div');
  userIcon.id = 'icon';
  userIcon.innerHTML =
    '<svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground);width:24px;height:24px"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  userContainer.appendChild(userIcon);

  const userName = document.createElement('p');
  userName.id = 'name';
  userName.style.fontWeight = 'bold';
  userName.style.fontFamily = 'Inter Tight';
  fetchUsername(data['user_id']).then((name) => (userName.textContent = name));
  userContainer.appendChild(userName);

  const headerContainer = document.createElement('div');
  headerContainer.style.display = 'flex';
  headerContainer.style.justifyContent = 'space-between';
  headerContainer.style.alignItems = 'center';
  headerContainer.className = 'header';
  post.appendChild(headerContainer);

  const header = document.createElement('h2');
  header.textContent = data['title'];
  headerContainer.appendChild(header);

  const deleteBtn = document.createElement('button');
  deleteBtn.id = 'delete';
  deleteBtn.classList.add('btn-danger');
  deleteBtn.innerHTML =
    '<svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground);width:24px;height:24px"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';

  deleteBtn.addEventListener('click', async () => {
    const options = {
      headers: {
        Authorization: localStorage.getItem('token')
      },
      method: 'DELETE'
    };

    const response = await fetch(
      `https://reddy-2-2-be.onrender.com/posts/${data['id']}`,
      options
    );

    if (response.status === 204) {
      window.location.reload();
    } else {
      const respData = await response.json();
      Swal.fire({
        icon: 'error',
        text: respData.error
      });
    }
  });

  headerContainer.appendChild(deleteBtn);

  const content = document.createElement('p');
  content.id = 'content';
  content.textContent = data['content'];
  post.appendChild(content);

  const date = document.createElement('p');
  date.id = 'date';
  date.textContent = moment(data['date']).fromNow();
  date.style.fontWeight = 'bold';
  post.appendChild(date);

  return post;
};

document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: form.get('title'),
      content: form.get('content')
    })
  };

  const response = await fetch(
    'https://reddy-2-2-be.onrender.com/posts',
    options
  );
  const data = await response.json();

  if (response.status === 201) {
    window.location.reload();
  } else {
    Swal.fire({
      icon: 'error',
      text: data.error
    });
  }
});

const loadPosts = async () => {
  const options = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };
  const response = await fetch(
    'https://reddy-2-2-be.onrender.com/posts',
    options
  );

  if (response.status === 200) {
    const posts = await response.json();

    const container = document.getElementById('posts');

    posts.forEach((p) => {
      const elem = createPostElement(p);
      container.appendChild(elem);
    });
  } else {
    window.location.assign('./index.html');
  }
};

async function fetchUsername(user_id) {
  const response = await fetch(
    `https://reddy-2-2-be.onrender.com/users/${user_id}`
  );

  const data = await response.json();

  if (response.status === 200) {
    return data['username'];
  } else {
    Swal.fire({
      icon: 'error',
      text: data.error
    });
  }
}

let modal = document.getElementById('modal');

document
  .getElementById('create-btn')
  .addEventListener('click', () => (modal.style.display = 'block'));

window.onclick = function (e) {
  if (e.target === modal) modal.style.display = 'none';
};

let links = document.getElementById('links');

if (localStorage.getItem('token')) {
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
      Swal.fire({
        icon: 'error',
        text: data.error
      });
    }
  });

  listElem.appendChild(link);
}

loadPosts();
