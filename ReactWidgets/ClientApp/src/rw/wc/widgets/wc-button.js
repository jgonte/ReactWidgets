import WebComponent from '../mixins/WebComponent';
import Clickable from '../mixins/Clickable';

const template = document.createElement('template');

template.innerHTML = `
  <span>My button</span>
`;

class Button extends Clickable(WebComponent(HTMLElement)) {

    constructor() {

        super();

        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._label = this._shadowRoot.querySelector('span');
    }

    static get observedAttributes() {

        return ['text'];
    }

    attributeChangedCallback(name, oldVal, newVal) {

        this[name] = newVal;

        this.render();
    }

    render() {

        this._label.innerHTML = this.text;
    }
}

customElements.define('wc-button', Button);