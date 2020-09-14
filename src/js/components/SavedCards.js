import BaseComponent from '../components/BaseComponent';

export default class SavedCards extends BaseComponent {
  constructor(articlesList, moreButton, api, articleClass, title) {
    super();
    this.api = api;
    this.articlesList = articlesList;
    this.moreButton = moreButton;  
    this.articleClass = articleClass;
    this._news = [];
    this.title = title;
  }

  getSortKeywords(array) {
    const sortArray = [];
    array.forEach((item) => {
      if (!sortArray.includes(item.keyword)) {
        sortArray.push(item.keyword);
      }
    });
    return sortArray
  }

  renderResults(array) {
    for (const elem of array) {
      this._addArticle(elem);
    }
  }

  _addArticle(data) {
    const article = this.articleClass(this.api);
    this.articlesList.appendChild(article.createSaved(data, data.keyword));
  }

  getArticles(news) {
    this._news = news;
    this._showArticles();
  }

  _showArticles() {
    if (this._news.length > 0) {
      this.articlesList.closest('.articles').classList.add('articles_active');
    }
    this.renderResults(this._news);
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

  setTitle(array, userName) {
    const keyNumber = array.length;
    if (keyNumber === 1) {
      this.title.textContent = `${userName}, у вас ${keyNumber} сохраненная статья`;
    } else if (keyNumber > 1 && keyNumber < 5) {
      this.title.textContent = `${userName}, у вас ${keyNumber} сохраненные статьи`;
    } else if (keyNumber > 4) {
      this.title.textContent = `${userName}, у вас ${keyNumber} сохраненных статей`;
    } else {
      this.title.textContent = 'У вас нет сохранённых статей';
      this.title.nextElementSibling.classList.add('saved__subtitle_disable');
    }
  }

  setSubtitle(array) {
    const keyItems = this.getSortKeywords(array);
    const otherKeys = this.getSortKeywords(array).length - 2;
    const firstKey = document.querySelector('#first-key');
    firstKey.textContent = `${keyItems[0]}`;
    const secondKey = document.querySelector('#second-key')
    secondKey.textContent = `${keyItems[1]}`;
    if (keyItems.length === 1) {
      firstKey.textContent = `${keyItems[0]}`;
      secondKey.textContent = '';
      otherKey.textContent = `всё`;
    }
    if (keyItems.length === 2) {
      firstKey.textContent = `${keyItems[0]}`;
      secondKey.textContent = '';
      otherKey.textContent = `${keyItems[1]}`;
    }
    if (otherKeys === 1) {
      const otherKey = document.querySelector('#other-keys');
      otherKey.textContent = `${keyItems[2]}`;
    } else {
      const manyKeys = document.querySelector('#other-keys')
      manyKeys.textContent = `${otherKeys} другим`;
    }
  }
}