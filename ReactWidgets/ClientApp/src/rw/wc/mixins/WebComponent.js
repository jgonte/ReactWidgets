// Base class for the web components
const WebComponent = Base => class extends Base {

    constructor() {

        super();

        console.log('Custom element constructed');

        this._shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        console.log('Custom element added to the DOM');
    }

    disconnectedCallback() {

        console.log('Custom element removed from the DOM');
    }
}

export default WebComponent;