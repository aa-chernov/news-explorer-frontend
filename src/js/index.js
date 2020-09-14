import '../css/style.css';
import MainApi from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';
import Form from '../js/components/Form.js';
import Popup from "../js/components/Popup.js";
import Header from '../js/components/Header.js';
import NewsCard from '../js/components/NewsCard.js';
import NewsCardList from '../js/components/NewsCardList.js';
import Search from '../js/components/Search';

import { serverUrl, newsApiUrl, newsApiKey } from '../js/constants/apiData';

export const searchResults = document.querySelector('.search-results');

export const mainApi = new MainApi(serverUrl);
export const newsApi = new NewsApi(newsApiUrl, newsApiKey);

export const signinForm = document.querySelector("#signin-form");
export const signupForm = document.querySelector("#signup-form");
export const searchForm = document.querySelector("#search-form");

export const signinSubmit = document.querySelector('#signin-submit');
export const signupSubmit = document.querySelector('#signup-submit');

export const searchSubmit = document.querySelector('#search-submit');

export const signinFormSample = new Form(signinForm, signinSubmit);
export const signupFormSample = new Form(signupForm, signupSubmit);

export const signinButton = document.querySelector("#button-signin");
export const mobileSigninButton = document.querySelector("#menu-signin");

export const signinPopup = document.querySelector('#signin-popup');
export const signupPopup = document.querySelector('#signup-popup');
export const successPopup = document.querySelector('#sign-popup');

export const signinPopupSample = new Popup(signinPopup, signinFormSample);
export const signupPopupSample = new Popup(signupPopup, signupFormSample);
export const successPopupSample = new Popup(successPopup, signupFormSample);

export const logoutButton = document.querySelector('#button-sign');
export const mobileLogoutButton = document.querySelector('#menu-sign');

export const openButton = document.querySelector('#open-menu');
export const closeButton = document.querySelector('#close-menu');

export const signinTransitButton = document.querySelector('#advice-signin');
export const signupTransitButton = document.querySelector('#advice-signup');
export const successTransitButton = document.querySelector('#advice-sign');

export const header = new Header(mainApi, openButton, closeButton);

const newArticle = (mainApi) => new NewsCard(mainApi);
export const newsCardSample = new NewsCard(mainApi);
export const articlesList = document.querySelector('#articles-list');
export const showMoreButton = document.querySelector('#button-more');
export const newsCardList = new NewsCardList(articlesList, showMoreButton, newArticle, mainApi)

export const notFoundSection = document.querySelector("#articles-not-found");
export const preloader = document.querySelector("#preloader");
const search = new Search(newsCardList, notFoundSection, preloader, searchForm, newsApi);

signinButton.addEventListener("click", () => signinPopupSample.open());
mobileSigninButton.addEventListener("click", () => signinPopupSample.open());

signupTransitButton.addEventListener('click', () => { 
  signinPopupSample.close();
  signupPopupSample.open();
});

signinTransitButton.addEventListener('click', () => {  
  signupPopupSample.close();
  signinPopupSample.open();
});

successTransitButton.addEventListener('click', () => {  
  successPopupSample.close();
  signinPopupSample.open();
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi.signup(
    signupForm.email.value,
    signupForm.password.value,
    signupForm.name.value,
  )
    .then((res) => {
      if (res.message) {
        return signupFormSample.setServerError(res.message)
      }
      signupPopupSample.close();
      successPopupSample.open();
    })
});

signinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi.signin(signinForm.email.value, signinForm.password.value)
    .then((res) => {
      if (res.message) {
        signinFormSample.setServerError(res.message)
      } else {
        localStorage.setItem('token', res.jwt);
        signinPopupSample.close();
        header.render();
      }
    })
})

logoutButton.addEventListener('click', () => {
  localStorage.clear();
  header.isLoggedIn();
  header.render();
});

mobileLogoutButton.addEventListener('click', () => {
  localStorage.clear();
  header.isLoggedIn();
  header.render();
});

header.setEventListeners();
search.setEventListeners();
signinFormSample.setEventListeners();
signupFormSample.setEventListeners();
window.onload = header.render();
newsCardList.setEventListeners();