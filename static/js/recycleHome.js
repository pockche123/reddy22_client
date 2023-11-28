fetchBins();

function fetchBins() {
  fetch('http://localhost:3000/bins')
    .then((resp) => resp.json())
    .then((data) => showBins(data))
    .catch((e) => console.log(e));
}

function showBins(bins) {
  bins.forEach((bin) => showBinInfo(bin));
}

function showBinInfo(bin) {
  const binCard = document.createElement('div');
  binCard.classList.add('bin-card');

  const title = document.createElement('h2');
  title.textContent = bin.bin_type;
  title.classList.add('title');

  const description = document.createElement('p');
  description.textConetnt = bin.info;
  description.classList.add('description');

  const binImage = document.createElement('img');
  binImage.src = bin.bin_image;
  binImage.alt = bin.bin_type;
  description.classList.add('bin-image');

  binCard.appendChild(title);
  binCard.appendChild(description);
  binCard.appendChild(binImage);

  const binsContainer = document.getElementsByClassName('bins-container');
  binsContainer.appendChild(binCard);
}
