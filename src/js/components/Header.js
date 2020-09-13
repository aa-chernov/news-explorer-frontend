import BaseComponent from '../components/BaseComponent';
import isLogged from '../utils/isLogged';

export default class Header extends BaseComponent {
  constructor(api, openButton, closeButton) {
    super();
    this.api = api;
    this.menu = document.querySelector('#menu');
    this.openButton = openButton;
    this.closeButton = closeButton;
    this._props = {
      isLoggedIn: false,
      username: '',
    };
  }

  render() {
    if (this.isLoggedIn()) {
      return this.getUserName();
    }
    this._renderLoggedOut();
  }
  
  isLoggedIn() {
    if (isLogged()) {
      this._props.isLoggedIn = true;
      return true;
    }
    this._props.isLoggedIn = false;
    this._props.username = '';
    return false;
  }

  getUserName() {
    if (this._props.username) {
      return this._props.username;
    }
    this.api.getUserData()
      .then((data) => {
        this._props.username = data.name;
        this._renderLoggedIn(data.name);
        return data.name;
      })
      .catch((err) => err);
  }
  
  _renderLoggedIn(userName) {
    const articlesLinks = document.querySelectorAll('#article-link');
    articlesLinks.forEach((link) => {
      link.hidden = false;
      link.classList.add('header__page_visible');
    });
    
    const buttonsText = document.querySelectorAll('#sign-text');
    buttonsText.forEach((text) => {
      const buttonText = text;
      buttonText.textContent = userName;
    });

    const signOutImages = document.querySelectorAll('#signout-img');
    signOutImages.forEach((image) => {
      image.hidden = false;
    });
    
    const textIndents = document.querySelectorAll('#text-indent');
    textIndents.forEach((indent) => {
      indent.hidden = false;
    });

    
    const buttonHeaderIn = document.querySelector('#button-signin');
    buttonHeaderIn.classList.add('button__sign_disable');
    const buttonMenuIn = document.querySelector('#menu-signin');
    buttonMenuIn.classList.add('button__sign_disable');

    const buttonHeaderOut = document.querySelector('#button-sign');
    buttonHeaderOut.classList.remove('button__sign_disable');
    const buttonMenuOut = document.querySelector('#menu-sign');
    buttonMenuOut.classList.remove('button__sign_disable');
  }


  _renderLoggedOut() {
    const articlesLinks = document.querySelectorAll('#article-link');
    articlesLinks.forEach((link) => {
      link.hidden = true;
      link.classList.remove('header__page_visible');
    });
    
    const buttonsText = document.querySelectorAll('#sign-text');
    buttonsText.forEach((text) => {
      const buttonText = text;
      buttonText.textContent = 'Авторизоваться';
    });

    const signOutImages = document.querySelectorAll('#signout-img');
    signOutImages.forEach((image) => {
      image.hidden = true;
    });

    const textIndents = document.querySelectorAll('#text-indent');
    textIndents.forEach((indent) => {
      indent.hidden = true;
    });

    const buttonHeaderOut = document.querySelector('#button-sign');
    buttonHeaderOut.classList.add('button__sign_disable');
    const buttonMenuOut = document.querySelector('#menu-sign');
    buttonMenuOut.classList.add('button__sign_disable');

    const buttonHeaderIn = document.querySelector('#button-signin');
    buttonHeaderIn.classList.remove('button__sign_disable');
    const buttonMenuIn = document.querySelector('#menu-signin');
    buttonMenuIn.classList.remove('button__sign_disable');
  }

  setEventListeners() {
    this._setListeners([
      {
        element: this.openButton,
        event: 'click',
        callback: () => {
          this.menu.classList.add('menu_active');
          this.menu.classList.remove('menu_disable');
        },
      },
      {
        element: this.closeButton,
        event: 'click',
        callback: () => {
          this.menu.classList.add('menu_disable');
          this.menu.classList.remove('menu_active');
        },
      },
      {
        element: document,
        event: 'keydown',
        callback: (event) => {
          if (event.keyCode === 27) {
            this.menu.classList.add('menu_disable');
            this.menu.classList.remove('menu_active');
          }
        },
      },
      {
        element: document,
        event: 'mousedown',
        callback: (event) => {
          event.stopPropagation();
          if (event.target.classList.contains('menu')) {
            this.menu.classList.add('menu_disable');
            this.menu.classList.remove('menu_active');
          }
        },
      }
    ]);
  }
}