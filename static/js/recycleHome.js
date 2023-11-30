async function fetchBins() {
  const response = await fetch('https://reddy-2-2-be.onrender.com/bins');
  const bins = await response.json();
  showBins(bins);
}
document.addEventListener('DOMContentLoaded', fetchBins);
//  fetchBins()

function showBins(bins) {
  bins.forEach((bin) => showBinInfo(bin));
}

function showBinInfo(bin) {
  const binCard = document.createElement('button');
  binCard.classList.add('bin-card');

  const title = document.createElement('h2');
  title.textContent = bin.bin_type;
  title.classList.add('title');

  const description = document.createElement('p');
  description.textContent = bin.info;
  description.classList.add('description');

  const binImage = document.createElement('img');
  binImage.src = bin.bin_image;
  binImage.alt = bin.bin_type;
  description.classList.add('bin-image');

  binCard.appendChild(title);
  // binCard.appendChild(description);
  binCard.appendChild(binImage);

  binCard.addEventListener('click', () => goToBinPage(bin.bin_id));
  const binsContainer = document.querySelector('.bins-container');
  binsContainer.appendChild(binCard);
}

function goToBinPage(id) {
  window.location.href = `bin.html?id=${id}`;
}

module.exports = { fetchBins };
