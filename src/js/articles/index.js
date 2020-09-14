import '../../css/articles.css';
import MainApi from '../../js/api/MainApi';
import Header from '../../js/components/Header';
import NewsCard from '../../js/components/NewsCard';
import SavedCards from '../../js/components/SavedCards';

import { serverUrl, newsApiUrl, newsApiKey } from '../constants/apiData';
import isLogged from '../utils/isLogged';

const logoutButton = document.querySelector('#button-signout');
const mobilelogoutButton = document.querySelector('#menu-signout');
const openButton = document.querySelector('#open-menu');
const closeButton = document.querySelector('#close-menu');

const articlesList = document.querySelector('#articles-list');
const showMoreButton = document.querySelector('#button-more');

const savedTitle = document.querySelector('#saved-title');

export const mainApi = new MainApi(serverUrl);
const newArticle = (mainApi) => new NewsCard(mainApi);
const header = new Header(mainApi, openButton, closeButton);

const savedCards = new SavedCards(articlesList, showMoreButton, mainApi, newArticle, savedTitle);

const getArticles = () => {
  mainApi.getUserData()
    .then((res) => {
      const username = res.name;
      mainApi.getArticles()
        .then((res) => {
          savedCards.getSortKeywords(res);
          savedCards.setTitle(res, username);
          savedCards.setSubtitle(res);
            return savedCards.getArticles(res);
        })
    })
    .catch((err) => {
      console.log(err.message);
    });
};

logoutButton.addEventListener('click', () => {
  localStorage.clear();
  window.location.replace('./index.html')
});
mobilelogoutButton.addEventListener('click', () => {
  localStorage.clear();
  window.location.replace('./index.html')
});
document.addEventListener('DOMContentLoaded', () => {
  if (isLogged()) {
    header.render();
    header.setEventListeners();
    getArticles();
  } 
  else {
    window.location.replace('./index.html');
  }
});

