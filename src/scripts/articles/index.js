import '../../css/articles.css'

const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');

openMenu.addEventListener('click', () => {
  menu.classList.add('menu_active');
  menu.classList.remove('menu_disable');
});

closeMenu.addEventListener('click', () => {
  menu.classList.add('menu_disable');
  menu.classList.remove('menu_active');
});