// Provides functionality for components that are submitted to manipulate local data
const LocalSubmittable = (Base) => class extends Base {

    constructor(props) {

        super(props);

        if (props.onSubmit) {

            this.onSubmit = props.onSubmit.bind(this);
        }
    }

    submit() {

        if (this.onBeforeSubmit &&
            !this.onBeforeSubmit()) {

            return false; // Submit cancelled
        }

        if (this.onSubmit) {

            this.onSubmit();
        }

        return true; // In this case for example you can dismiss a dialog, etcetera
    }
};

export default LocalSubmittable;