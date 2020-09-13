import BaseComponent from '../components/BaseComponent';
import { DATE_FROM, DATE_TO, PAGE_SIZE } from '../constants/constants';

export default class Search extends BaseComponent {
  constructor(cardList, notFound, preloader, form, api) {
    super();
    this.form = form;
    this.cardList = cardList;
    this.notFound = notFound;
    this.preloader = preloader;
    this.api = api;
  }

  renderLoader() {
      this.preloader.classList.toggle('preloader_disable');
  }

  _renderError(error) {
    const title = this.notFound.querySelector('.notfound__title')
    const text = this.notFound.querySelector('.notfound__subtitle')
    this.notFound.classList.remove('notfound_disable');
    title.textContent = error.message;
    if (error.message === 'Ничего не найдено') {
      text.textContent = 'К сожалению по вашему запросу ничего не найдено.'
    } else {
      text.textContent = 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    }
  }

  getNews(event) {
    event.preventDefault();
    this.cardList.clear();
    this.notFound.classList.add('notfound_disable');
    this.renderLoader();
    const input = this.form.querySelector('input').value;
    this.api.getNews(input, DATE_FROM, DATE_TO, PAGE_SIZE)
      .then((res) => {
        this.renderLoader();
        if (res.length === 0) {
          return this._renderError(new Error('Ничего не найдено'));
        } else if (res.error === "error") {
          return this._renderError(new Error('Во время запроса произошла ошибка'));
        } else {
          return this.cardList.getArticles(res, input);
        };
      })
  }
  
  setEventListeners() {
    this._setListeners([
      {
        element: this.form,
        event: 'submit',
        callback: (e) => this.getNews(e)
      },
    ])
  }
}
