import WebComponent from '../mixins/WebComponent';

const template = document.createElement('template');

template.innerHTML = `
  <span></span>
`;

class Label extends WebComponent(HTMLElement) {

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

customElements.define('wc-label', Label);