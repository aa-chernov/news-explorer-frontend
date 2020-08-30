import '../css/style.css';

const signUpAdvice = document.querySelector('#advice-signup');
const signInAdvice = document.querySelector('#advice-signin');
const signAdvice = document.querySelector('#advice-signin');
const signInButton = document.querySelector('#button-signin');
const signInMenu = document.querySelector('#menu-signin');

const signUpPopup = document.querySelector('#signup-popup');
const signInPopup = document.querySelector('#signin-popup');
const signPopup = document.querySelector('#sign-popup');

const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');

const closeSignUp = document.querySelector('#close-signup');
const closeSignIn = document.querySelector('#close-signin');
const closeSign = document.querySelector('#close-sign');

openMenu.addEventListener('click', () => {
  menu.classList.add('menu_active');
  menu.classList.remove('menu_disable');
});

closeMenu.addEventListener('click', () => {
  menu.classList.add('menu_disable');
  menu.classList.remove('menu_active');
});

closeSignUp.addEventListener('click', () => {
  signUpPopup.classList.remove('popup_is-opened');
});

closeSignIn.addEventListener('click', () => {
  signInPopup.classList.remove('popup_is-opened');
});

closeSign.addEventListener('click', () => {
  signPopup.classList.remove('popup_is-opened');
});

signUpAdvice.addEventListener('click', () => {
  signInPopup.classList.remove('popup_is-opened');
  signPopup.classList.remove('popup_is-opened');
  signUpPopup.classList.add('popup_is-opened');
});

signInAdvice.addEventListener('click', () => {
  signInPopup.classList.add('popup_is-opened');
  signPopup.classList.remove('popup_is-opened');
  signUpPopup.classList.remove('popup_is-opened');
});

signInButton.addEventListener('click', () => {
  signInPopup.classList.add('popup_is-opened');
});

signInMenu.addEventListener('click', () => {
  signInPopup.classList.add('popup_is-opened');
  menu.classList.add('menu_disable');
  menu.classList.remove('menu_active');
});


signAdvice.addEventListener('click', () => {
  signInPopup.classList.add('popup_is-opened');
});



