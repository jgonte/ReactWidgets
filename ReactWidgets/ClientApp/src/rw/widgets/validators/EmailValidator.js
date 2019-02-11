export default class EmailValidator {

    validate(value) {
        const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;

        if (value && !regEx.test(value)) {

            return this.message || 'Value must be a valid email';
        }
    }
}