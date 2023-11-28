const createPostElement = (data) => {
  const post = document.createElement('div');
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
  deleteBtn.textContent = 'Delete';

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
  content.textContent = data['content'];
  post.appendChild(content);

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

loadPosts();
