import BaseComponent from '../components/BaseComponent';

export default class Popup extends BaseComponent {
  constructor(popup, form) {
    super();
    this.popup = popup;
    this.form = form;
    this.button = document.querySelector('#open-menu');
    this.menu = document.querySelector('#menu');
  }

  open() {
    this.button.classList.add('header__menu_disable');
    this.popup.classList.add("popup_is-opened");
    this.menu.classList.add('menu_disable');
    this.menu.classList.remove('menu_active');
    this._setEventListeners();
  }

  close() {
    this.button.classList.remove('header__menu_disable');
    this.popup.classList.remove("popup_is-opened");
    this.form.clear();
    this.clearListeners();
  }

  _setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close");
    const root = document.querySelector('.root');
    this._setListeners([
      {
        element: closeButton,
        event: 'click',
        callback: () => this.close(),
      },
      {
        element: document,
        event: 'keydown',
        callback: (event) => {
          if (event.keyCode === 27) {
            this.close();
          }
        },
      },
      {
        element: document,
        event: 'mousedown',
        callback: (event) => {
          event.stopPropagation();
          if (event.target.classList.contains('popup')) {
            this.close();
          }
        },
      },
    ])
  }
}