const createPostElement = (data) => {
  const post = document.createElement('div');
  post.classList.add('container');
  post.id = 'post';

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
      alert(respData.error);
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

  console.log(data['date']);

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
    alert(data.error);
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
      console.log(p);
      const elem = createPostElement(p);
      container.appendChild(elem);
    });
  } else {
    window.location.assign('./index.html');
  }
};

document.getElementById('logout').addEventListener('click', async () => {
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

  if (response.status === 200) {
    localStorage.removeItem('token');
    window.location.assign('./index.html');
  } else {
    alert(data.error);
  }
});

let modal = document.getElementById('modal');

document
  .getElementById('create-btn')
  .addEventListener('click', () => (modal.style.display = 'block'));

window.onclick = function (e) {
  if (e.target === modal) modal.style.display = 'none';
};

loadPosts();
