// ANIMATING THE ADD THINGS BOX
const addPopup = document.querySelector('.add-popup');
const addThings = document.querySelector('.add-things');
const content = document.querySelector('.content');
const rememberBtn = document.getElementById('rememberBtn');
const addForm = document.querySelector('.add-form');

addThings.addEventListener('click', animateAddBox);

function animateAddBox() {
  addPopup.classList.add('expanded');
  addThings.classList.add('hidden');
  content.classList.add('background');
  rememberBtn.classList.remove('hidden');
  addForm.classList.toggle('hidden');
}



// FIXED/STICKY HEADER

window.onscroll = function (e) {
  // UI SELECTORS
  const nav = document.querySelector('nav');
  const searchField = document.querySelector('.search-field');
  const mouseWrap = document.querySelector('.mouse-wrap');
  const tableSection = document.getElementById('table-section');
  const tableRows = document.querySelectorAll('.table-row');
  const logo = document.querySelector('.letter');
  const mainNav = document.querySelector('.main-nav');

  // VALUE OF SCROLLED Y-AXIS IN PIXELS
  let current = window.scrollY;

  if(current > 0) {
    nav.classList.add('fixed');
    searchField.classList.remove('hidden');
    searchField.classList.add('shown');
    mouseWrap.style.display = 'none';      
    tableSection.classList.remove('hidden');
    tableSection.classList.add('shown');
    tableRows.forEach(function(row) {
      row.classList.add('rolldown-anim');
    })
  } else {
    nav.classList.remove('fixed');
    searchField.classList.remove('shown');
    searchField.classList.add('hidden');
    if(getWidth() > 768) {
      mouseWrap.style.display = 'block';
    }
  }
}



// GETS WIDTH OF THE BROWSER
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

// GETS HEIGHT OF THE BROWSER
function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}