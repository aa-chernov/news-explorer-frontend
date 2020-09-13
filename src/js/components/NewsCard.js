import { dateConstructor } from '../utils/dateConstructor';
import BaseComponent from '../components/BaseComponent';
import isLogged from '../utils/isLogged';

export default class NewsCard extends BaseComponent {
  constructor(api) {
    super();
    this.api = api;
    this.data = {};
    this.keyword = '';
    this.article = document.createElement('div');
  }

  create(data, keyword) {
    this.article.classList.add('article-card');
    this.data = data;
    this.keyword = keyword;
    this.article.insertAdjacentHTML(
      "beforeend",
      `
      <a id="card-link" target="_blank" href="${data.url}">
      <img class="article-card__image" src="${data.urlToImage}" alt="${data.title}">
      </a>
      <button id="card-bookmark" class="article-card__bookmark">
        <span id="card-tooltip" class="article-card__tooltip"></span>
      </button>
      <p class="article-card__keyword article-card__keyword_disable">${this.keyword}</p>
      </img>
      <div class="article-card__description">
        <p class="article-card__date">${dateConstructor(data.publishedAt)}</p>
        <a id="card-link" class="article-card__name" target="_blank" href="${data.url}">${data.title}</a>
        <p class="article-card__paragraph">${data.description}</p>
        <p class="article-card__source">${data.source.name}</p>
      </div>
    `
    );
    this._setContent(this.article, data);

    return this.article;
  }

  createSaved(data, keyword) {
    this.article.classList.add('article-card');
    this.data = data;
    this.keyword = keyword;
    this.article.insertAdjacentHTML(
      "beforeend",
      `
      <a id="card-link" target="_blank" href="${data.link}">
      <img class="article-card__image" src="${data.image}" alt="${data.title}">
      </a>
      <button id="card-delete" class="article-card__delete">
        <span id="card-tooltip" class="article-card__tooltip">Убрать из сохранённых</span>
      </button>
      <p class="article-card__keyword">${data.keyword}</p>
      </img>
      <div class="article-card__description">
        <p class="article-card__date">${dateConstructor(data.date)}</p>
        <a id="card-link" class="article-card__name" target="_blank" href="${data.link}">${data.title}</a>
        <p class="article-card__paragraph">${data.text}</p>
        <p class="article-card__source">${data.source}</p>
      </div>
    `
    );
    this.id = data._id;
    this._setSavedContent(this.article, data);

    return this.article;
  }

  _setContent(article, data) {
    const bookmark = article.querySelector('#card-bookmark');
    const tooltip = article.querySelector('#card-tooltip');
    if (isLogged()) {
      tooltip.classList.add('article-card__tooltip_disable');
      this._setListeners([
        {  
          element: bookmark,
          event: 'click',
          callback: (event) => {
            this._saveArticle(event);
          }
        },
        {  
          element: bookmark,
          event: 'click',
          callback: (event) => {
            this._deleteArticle(event);
          }
        }
      ]);
    } else {
      tooltip.classList.remove('article-card__tooltip_disable');
      tooltip.textContent = 'Войдите, чтобы сохранять статьи';
    }
  }

  _setSavedContent(article, data) {
    const trashmark = article.querySelector('#card-delete');
    this._addListener(
      {  
        element: trashmark,
        event: 'click',
        callback: (event) => {
          this._removeSaved(event);
        }
      }
    );
  }

  _saveArticle(event) {
    if (isLogged() && !event.target.classList.contains('article-card__bookmark_saved')) {
      this.api.createArticle
        (
          this.keyword,
          this.data.urlToImage,
          this.data.publishedAt,
          this.data.title,
          this.data.description,
          this.data.source.name,
          this.data.url
        )
        .then((res) => {
          event.target.classList.add("article-card__bookmark_saved");
          this.id = res._id
        })
        .catch((err) => err)
    }
  }

  _deleteArticle(event) { 
    if (isLogged() && event.target.classList.contains('article-card__bookmark_saved')) {
      if (this.id) {
        this.api.removeArticle(this.id)
          .then(() => {
            event.target.classList.remove("article-card__bookmark_saved");
          })
          .catch((err) => console.error(err))
      }
    }
  }

  _removeSaved(event) {
    if (isLogged() && event.target.classList.contains('article-card__delete')) {
      this.api.removeArticle(this.id)
        .then((res) => {
          console.log(res)
          event.target.closest('.article-card').remove();
          this.removeListeners();
        })
        .catch((err) => console.error(err))
    }
  }

  removeListeners() {
    this.clearListeners()
  }
}
