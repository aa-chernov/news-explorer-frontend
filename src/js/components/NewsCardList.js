import BaseComponent from '../components/BaseComponent';

import { cardLimit } from '../constants/constants';

export default class NewsCardList extends BaseComponent {
  constructor(articlesList, moreButton, articleClass, api) {
    super();
    this.articlesList = articlesList;
    this.moreButton = moreButton;
    this.articleClass = articleClass;
    this.api = api;
    this._news = [];
    this.keyword = '';
  }

  _renderResults(array) {
    for (const elem of array) {
      this._addArticle(elem);
    }
  }

  _addArticle(data) {
    const article = this.articleClass(this.api);
    this.articlesList.appendChild(article.create(data, this.keyword || data.keyword));
  }

  showMore() {
    if (this._news.length > 0) {
      this.moreButton.classList.add('button__more_active');
    } else if (this._news.length < cardLimit) {
      this.moreButton.classList.remove('button__more_active');
    }
  }

  getArticles(news, keyword) {
    this._news = [];
    this._news = news;
    this.keyword = keyword;
    this._showArticles();
  }

  _showArticles() {
    if (this._news.length > 0) {
      this.articlesList.closest('.articles').classList.add('articles_active');
    }
    this._renderResults(this._news.slice(0, cardLimit));
    this._news.splice(0, cardLimit);
    this.showMore();
    return this._news.slice(0);
  }

  clear() {
    const content = this.articlesList.children;
    this._news = [];
    if (content) {
      content.forEach(element => {
        element.remove();
      })
    }
    this.articlesList.parentNode.classList.remove('articles_active');
  }
 
  setEventListeners() {
    this._setListeners([
      {
        element: this.moreButton,
        event: 'click',
        callback: this._showArticles.bind(this),
      }
    ])
  }
}
