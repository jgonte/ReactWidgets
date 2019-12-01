const Clickable = Base => class extends Base {

    connectedCallback() {

        super.connectedCallback();

        this.addEventListener('click', e => {
            e.preventDefault();

            this.onClick();
        });
    }

    onClick() {

        alert('Click event not bound to any action');
    }
}

export default Clickable;