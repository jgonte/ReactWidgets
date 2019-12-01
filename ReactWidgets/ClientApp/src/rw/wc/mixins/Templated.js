// Mixins to create web components that use dynamic templates
const Templated = Base => class extends Base {

    connectedCallback() {

        super.connectedCallback();

        const template = this.getAttribute("template"); // Attributes accept only strings

        if (!template) {

            throw new Error("Template is required");
        }

        this._shadowRoot.innerHTML = template;
    }
}

export default Templated;