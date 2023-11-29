let forumSectionHeader = document.getElementById('col2');
let forumSectionCard = document.getElementById('col5');
let eventsSectionHeader = document.getElementById('col3');
let eventsSectionCard = document.getElementById('col6');

if (!localStorage.getItem('token')) {
  forumSectionHeader.classList.add('hide-item');
  forumSectionCard.classList.add('hide-item');
  eventsSectionHeader.classList.add('hide-item');
  eventsSectionCard.classList.add('hide-item');
}
