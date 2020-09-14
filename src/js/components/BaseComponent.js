export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }
  _addListener({ element, event, callback }) {
    element.addEventListener(event, callback);
  }
  
  _setListeners(listeners) {
    listeners.forEach(listener => {
      this._addListener(listener);
      this._listeners.push(listener);
    });
  }

  clearListeners() {
    this._listeners.forEach(listener => {
      const { element, event, callback } = listener;
      element.removeEventListener(event, callback);
    })
  }
}